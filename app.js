/* LEAPS IQ — static research site (Nov 15 slice).
 *
 * Single-page, vanilla JS, no build step, no framework, no server.
 * Fetches "candidates.json" from the same directory (relative path, so
 * it works when the files are uploaded to the GitHub Pages site root
 * as leaps-iq.html + candidates.json).
 *
 * FAIL-CLOSED RULES (from Q8 items 3-7 as shifted to the site by Q9):
 *  - The feed must carry dataset / generated_at / as_of_date / sources
 *    (with an options_chains entry) and per-candidate shape, or it is
 *    refused: a clear on-screen error, no invented data.
 *  - data_sanitized must be exactly true, or the file is refused.
 *  - NO per-contract price, IV, or Greek fields may appear anywhere in
 *    the feed. If any appear, the whole file is refused.
 *  - generated_at / as_of_date are displayed from the FEED, never the
 *    local clock, for remote data. The local clock is used only to
 *    compute feed age for the 7-day staleness rule, and to timestamp
 *    the fetch itself in Diagnostics.
 *  - A stale feed (generated_at > 7 days old) shows a
 *    "data stale — research disabled" notice.
 *  - Statuses and blocking reasons are displayed VERBATIM from the
 *    feed. The client never upgrades (or downgrades) a status.
 *  - The Trade Plan preview is derived from the descriptor and score
 *    only. No prices are ever invented: the public feed carries no
 *    prices, so price-dependent plan fields are shown as "not
 *    published in the public feed".
 *
 * Pure functions (validateFeed, isStaleFeed, renderTop10, renderDetail,
 * tradePlanPreview) are exported for Node so the smoke check can run
 * the exact same code paths the browser runs.
 */
'use strict';

var FEED_URL = 'candidates.json';
var STALE_DAYS = 7;
var DATASET_PREFIX = 'leaps-iq-';

var KNOWN_STATUSES = ['BUY SETUP', 'WAIT', 'HOLD', 'TAKE PROFIT', 'EXIT / RISK ALERT', 'WATCH', 'BLOCKED'];
var KNOWN_ELIGIBILITY = ['actionable', 'not_actionable', 'data_missing', 'modeled', 'blocked_by_risk_limit'];

var ROOT_KEYS = ['dataset', 'generated_at', 'as_of_date', 'sources', 'candidates'];
var CANDIDATE_KEYS = ['symbol', 'as_of_date', 'generated_at', 'canonical_score',
  'display_total', 'status', 'score_breakdown', 'selected_contract_descriptor',
  'liquidity_flags', 'provenance', 'entry_eligibility', 'blocking_reasons',
  'data_sanitized'];
var BREAKDOWN_KEYS = ['name', 'weight', 'score'];
var DESCRIPTOR_KEYS = ['strike', 'expiry', 'delta_band'];
var LIQUIDITY_KEYS = ['ask_size_ok', 'open_interest_ok', 'recent_volume_ok'];

/* Exact key names that must never appear anywhere in the feed.
 * Compared by exact key (case-insensitive), never by substring, so
 * "delta_band" (allowed) does not trip on "delta" (forbidden), and a
 * score component NAME such as "Options pricing & liquidity" (a string
 * value, not a key) does not trip either. */
var FORBIDDEN_KEYS = ['bid', 'ask', 'mid', 'mark', 'last_price', 'price',
  'iv', 'implied_volatility', 'delta', 'gamma', 'theta', 'vega', 'rho',
  'greeks', 'options_chain', 'option_chain', 'contracts', 'chain',
  'weekly_candles', 'daily_candles', 'open_interest', 'volume',
  'bid_size', 'ask_size', 'bidsize', 'asksize', 'spread', 'spread_pct',
  'cost', 'debit', 'contract_value', 'entry_price', 'limit_price'];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function isFiniteNumber(v) {
  return typeof v === 'number' && isFinite(v);
}

function isValidDateString(s) {
  if (typeof s !== 'string') return false;
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return false;
  var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 &&
    d.getUTCDate() === +m[3];
}

function isParseableTimestamp(s) {
  return typeof s === 'string' && s.length > 0 && !isNaN(Date.parse(s));
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function addDaysISO(dateStr, days) {
  var d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function daysBetween(aStr, bStr) {
  var a = new Date(aStr + 'T00:00:00Z').getTime();
  var b = new Date(bStr + 'T00:00:00Z').getTime();
  return Math.round((b - a) / 86400000);
}

function fmtScore(n) {
  return isFiniteNumber(n) ? n.toFixed(1) : '—';
}

/* ------------------------------------------------------------------ */
/* Validation (fail-closed)                                            */
/* ------------------------------------------------------------------ */

/* Recursively scan an object/array for forbidden exact keys. */
function findForbiddenKeys(value, path, found) {
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      findForbiddenKeys(value[i], path + '[' + i + ']', found);
    }
    return;
  }
  if (isPlainObject(value)) {
    for (var k in value) {
      if (!Object.prototype.hasOwnProperty.call(value, k)) continue;
      if (FORBIDDEN_KEYS.indexOf(k.toLowerCase()) !== -1) {
        found.push(path + '.' + k);
      }
      findForbiddenKeys(value[k], path + '.' + k, found);
    }
  }
}

function checkKeys(obj, allowed, label, errors) {
  for (var k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    if (allowed.indexOf(k) === -1) {
      errors.push(label + ': unexpected field "' + k + '" — file refused.');
    }
  }
}

/* Validate one candidate. Returns { errors, warnings } (arrays of strings). */
function validateCandidate(c, index) {
  var errors = [];
  var warnings = [];
  var label = 'candidates[' + index + ']' +
    (typeof c.symbol === 'string' ? ' (' + c.symbol + ')' : '');

  if (!isPlainObject(c)) {
    return { errors: ['candidates[' + index + ']: not an object — file refused.'],
      warnings: warnings };
  }
  checkKeys(c, CANDIDATE_KEYS, label, errors);

  if (typeof c.symbol !== 'string' || !/^[A-Z0-9.\-]{1,12}$/.test(c.symbol)) {
    errors.push(label + ': symbol missing or not a valid ticker — file refused.');
  }
  if (!isValidDateString(c.as_of_date)) {
    errors.push(label + ': as_of_date missing or not YYYY-MM-DD — file refused.');
  }
  if (!isParseableTimestamp(c.generated_at)) {
    errors.push(label + ': generated_at missing or not parseable — file refused.');
  }
  if (!isFiniteNumber(c.canonical_score) || c.canonical_score < 0 || c.canonical_score > 100) {
    errors.push(label + ': canonical_score missing or outside 0–100 — file refused.');
  }
  if (!isFiniteNumber(c.display_total) || c.display_total < 0 || c.display_total > 100) {
    errors.push(label + ': display_total missing or outside 0–100 — file refused.');
  }
  if (KNOWN_STATUSES.indexOf(c.status) === -1) {
    errors.push(label + ': status "' + c.status + '" is not a known status — file refused.');
  }
  if (c.provenance !== 'delayed') {
    errors.push(label + ': provenance must be "delayed", got "' + c.provenance + '" — file refused.');
  }
  if (KNOWN_ELIGIBILITY.indexOf(c.entry_eligibility) === -1) {
    errors.push(label + ': entry_eligibility "' + c.entry_eligibility + '" is not known — file refused.');
  }
  if (c.data_sanitized !== true) {
    errors.push(label + ': data_sanitized is not true — file refused.');
  }
  if (!Array.isArray(c.blocking_reasons) ||
      c.blocking_reasons.some(function (r) { return typeof r !== 'string'; })) {
    errors.push(label + ': blocking_reasons must be an array of strings — file refused.');
  }

  /* Score breakdown. */
  if (!Array.isArray(c.score_breakdown) || c.score_breakdown.length === 0) {
    errors.push(label + ': score_breakdown missing or empty — file refused.');
  } else {
    var weightSum = 0;
    var recomputed = 0;
    c.score_breakdown.forEach(function (b, j) {
      var bl = label + '.score_breakdown[' + j + ']';
      if (!isPlainObject(b)) {
        errors.push(bl + ': not an object — file refused.');
        return;
      }
      checkKeys(b, BREAKDOWN_KEYS, bl, errors);
      if (typeof b.name !== 'string' || b.name.length === 0) {
        errors.push(bl + ': name missing — file refused.');
      }
      if (!isFiniteNumber(b.weight) || b.weight < 0 || b.weight > 100) {
        errors.push(bl + ': weight missing or outside 0–100 — file refused.');
      } else {
        weightSum += b.weight;
      }
      if (!(b.score === null || (isFiniteNumber(b.score) && b.score >= 0 && b.score <= 100))) {
        errors.push(bl + ': score must be a number 0–100 or null — file refused.');
      } else {
        recomputed += (b.score === null ? 0 : b.score) * (isFiniteNumber(b.weight) ? b.weight : 0);
      }
    });
    if (Math.abs(weightSum - 100) > 0.01) {
      warnings.push(label + ': score_breakdown weights sum to ' + weightSum + ', not 100.');
    }
    if (isFiniteNumber(c.canonical_score) &&
        Math.abs(recomputed / 100 - c.canonical_score) > 0.51) {
      warnings.push(label + ': canonical_score (' + c.canonical_score +
        ') does not match the score_breakdown recomputation (' +
        (recomputed / 100).toFixed(2) + ').');
    }
  }

  /* Selected contract descriptor: strike, expiry, delta band — NOT prices.
   * Null is allowed: a candidate with no usable data (or no LEAPS chain)
   * has no selected contract. It is shown as BLOCKED with its reasons,
   * never given an invented descriptor. */
  var d = c.selected_contract_descriptor;
  if (d === null) {
    /* No contract selected — allowed; renderDetail states this plainly. */
  } else if (!isPlainObject(d)) {
    errors.push(label + ': selected_contract_descriptor missing — file refused.');
  } else {
    checkKeys(d, DESCRIPTOR_KEYS, label + '.selected_contract_descriptor', errors);
    if (!isFiniteNumber(d.strike) || d.strike <= 0) {
      errors.push(label + ': descriptor strike missing or not a positive number — file refused.');
    }
    if (!isValidDateString(d.expiry)) {
      errors.push(label + ': descriptor expiry missing or not YYYY-MM-DD — file refused.');
    } else if (isValidDateString(c.as_of_date) && daysBetween(c.as_of_date, d.expiry) <= 0) {
      errors.push(label + ': descriptor expiry is not after as_of_date — file refused.');
    }
    if (!(typeof d.delta_band === 'string' || d.delta_band === null)) {
      errors.push(label + ': descriptor delta_band must be a string or null — file refused.');
    }
  }

  /* Liquidity flags (pass/fail booleans only). */
  var lf = c.liquidity_flags;
  if (!isPlainObject(lf)) {
    errors.push(label + ': liquidity_flags missing — file refused.');
  } else {
    checkKeys(lf, LIQUIDITY_KEYS, label + '.liquidity_flags', errors);
    LIQUIDITY_KEYS.forEach(function (k) {
      if (typeof lf[k] !== 'boolean') {
        errors.push(label + ': liquidity_flags.' + k + ' must be true/false — file refused.');
      }
    });
  }

  return { errors: errors, warnings: warnings };
}

/* Validate the whole feed document.
 * Returns { ok, errors, warnings, feed } — ok is false on any error. */
function validateFeed(data) {
  var errors = [];
  var warnings = [];
  if (!isPlainObject(data)) {
    return { ok: false, errors: ['Feed is not a JSON object — file refused.'],
      warnings: warnings, feed: null };
  }
  checkKeys(data, ROOT_KEYS, 'feed root', errors);

  if (typeof data.dataset !== 'string' || data.dataset.indexOf(DATASET_PREFIX) !== 0) {
    errors.push('dataset marker missing or does not start with "' + DATASET_PREFIX + '" — file refused.');
  }
  if (!isParseableTimestamp(data.generated_at)) {
    errors.push('generated_at missing or not parseable — file refused.');
  }
  if (!isValidDateString(data.as_of_date)) {
    errors.push('as_of_date missing or not YYYY-MM-DD — file refused.');
  }
  if (!isPlainObject(data.sources)) {
    errors.push('sources block missing — file refused.');
  } else {
    if (typeof data.sources.options_chains !== 'string' ||
        data.sources.options_chains.trim().length === 0) {
      errors.push('sources.options_chains entry missing — file refused.');
    }
    for (var sk in data.sources) {
      if (Object.prototype.hasOwnProperty.call(data.sources, sk) &&
          typeof data.sources[sk] !== 'string') {
        errors.push('sources.' + sk + ' must be a string — file refused.');
      }
    }
  }
  if (!Array.isArray(data.candidates)) {
    errors.push('candidates missing or not an array — file refused.');
  } else {
    data.candidates.forEach(function (c, i) {
      var r = validateCandidate(c, i);
      errors = errors.concat(r.errors);
      warnings = warnings.concat(r.warnings);
    });
  }

  /* No per-contract price / IV / Greek fields anywhere in the file. */
  var forbidden = [];
  findForbiddenKeys(data, 'feed', forbidden);
  if (forbidden.length > 0) {
    errors.push('Forbidden per-contract price/IV/Greek field(s) present: ' +
      forbidden.join(', ') + ' — file refused.');
  }

  return { ok: errors.length === 0, errors: errors, warnings: warnings,
    feed: errors.length === 0 ? data : null };
}

/* Stale if generated_at is more than STALE_DAYS old (local clock used
 * ONLY for this age comparison, never displayed as data). */
function isStaleFeed(feed, nowMs) {
  if (!feed || !isParseableTimestamp(feed.generated_at)) return true;
  var ageMs = (typeof nowMs === 'number' ? nowMs : Date.now()) - Date.parse(feed.generated_at);
  return ageMs > STALE_DAYS * 86400000;
}

function feedAgeDays(feed, nowMs) {
  if (!feed || !isParseableTimestamp(feed.generated_at)) return null;
  var ageMs = (typeof nowMs === 'number' ? nowMs : Date.now()) - Date.parse(feed.generated_at);
  return Math.floor(ageMs / 86400000);
}

/* ------------------------------------------------------------------ */
/* Rendering (pure functions returning HTML strings)                   */
/* ------------------------------------------------------------------ */

function statusClass(status) {
  return {
    'BUY SETUP': 'badge-buy',
    'WAIT': 'badge-wait',
    'HOLD': 'badge-hold',
    'TAKE PROFIT': 'badge-profit',
    'EXIT / RISK ALERT': 'badge-exit'
  }[status] || 'badge-wait';
}

function isBlocked(c) {
  return Array.isArray(c.blocking_reasons) && c.blocking_reasons.length > 0;
}

function candidateRowHtml(c) {
  var blocked = isBlocked(c);
  var reasons = blocked
    ? '<div class="reasons">Blocked: ' +
      c.blocking_reasons.map(function (r) { return esc(r); }).join(' · ') + '</div>'
    : '';
  var elig = c.entry_eligibility === 'actionable'
    ? ''
    : '<span class="elig">eligibility: ' + esc(c.entry_eligibility) + '</span>';
  return '<li class="cand" data-symbol="' + esc(c.symbol) + '">' +
    '<button type="button" class="cand-btn" data-symbol="' + esc(c.symbol) + '">' +
    '<span class="sym">' + esc(c.symbol) + '</span>' +
    '<span class="score">' + fmtScore(c.canonical_score) + '</span>' +
    '<span class="badge ' + statusClass(c.status) + '">' + esc(c.status) + '</span>' +
    (blocked ? '<span class="badge badge-blocked">BLOCKED</span>' : '') +
    '</button>' + elig + reasons + '</li>';
}

/* Daily Top 10: BUY SETUPs first, ranked by canonical_score.
 * Everyone else is listed below with their reasons — never hidden. */
function renderTop10(candidates) {
  var sorted = candidates.slice().sort(function (a, b) {
    return b.canonical_score - a.canonical_score;
  });
  var setups = sorted.filter(function (c) { return c.status === 'BUY SETUP'; });
  var top10 = setups.slice(0, 10);
  var rest = sorted.filter(function (c) { return top10.indexOf(c) === -1; });

  var topHtml = top10.length === 0
    ? '<p class="empty">No BUY SETUPs today — every selected LEAPS contract exceeds the approved $50 risk-per-trade cap. This is intentional under the approved rules (SIGNAL_RULES §5, $5,000 profile); no setups are invented. Check back after the next daily publish.</p>'
    : '<ol class="top10">' + top10.map(candidateRowHtml).join('') + '</ol>';
  var restHtml = rest.length === 0
    ? '<p class="empty">No other candidates in this feed.</p>'
    : '<ul class="others">' + rest.map(candidateRowHtml).join('') + '</ul>';

  return {
    top10: top10,
    topHtml: topHtml,
    othersHtml: restHtml,
    setupCount: setups.length,
    totalCount: candidates.length
  };
}

/* Read-only Trade Plan preview, derived from the descriptor and score
 * only. The public feed carries NO prices, so every price-dependent
 * field states that plainly instead of inventing a number.
 *
 * Planned exit: expiry − 90 days (conservative). The 120-day variant
 * (SIGNAL_RULES §2.8) needs entry IV ≤ 25% AND DTE ≥ 540 AND delta
 * 0.60–0.70; IV is not in the public feed, so the 120-day rule can
 * never be confirmed here — the site always uses 90 days and says so.
 * Reassessment: as_of_date + 30 days. Profit target: +50% of debit.
 * Invalidation: underlying close below support − 3% (level not
 * published) or option value −50% of debit. Max risk: the debit paid,
 * profile cap $50/trade. */
function tradePlanPreview(c) {
  var d = c.selected_contract_descriptor || {};
  var asOf = c.as_of_date;
  var expiry = d.expiry;
  var plannedExit = (isValidDateString(expiry)) ? addDaysISO(expiry, -90) : '—';
  var reassessment = (isValidDateString(asOf)) ? addDaysISO(asOf, 30) : '—';
  var dte = (isValidDateString(asOf) && isValidDateString(expiry))
    ? daysBetween(asOf, expiry) : null;
  var deltaBand = (typeof d.delta_band === 'string' && d.delta_band.length > 0)
    ? d.delta_band : 'not stated';
  var strike = isFiniteNumber(d.strike) ? d.strike : '—';

  return '<div class="plan">' +
    '<h3>Trade Plan preview — read-only</h3>' +
    '<p class="plan-note">Derived from the selected contract descriptor only. ' +
    'No per-contract prices, IV, or Greeks are published on this public page. ' +
    'Planned exit date shown; price and position sizing are not computed publicly ' +
    'because per-contract prices are redacted. This is research-only; ' +
    'no orders can be placed from this page. Verify every price on your broker ' +
    'before any paper trade.</p>' +
    '<dl>' +
    '<dt>Selected contract</dt><dd>Strike ' + esc(strike) + ' · expiry ' + esc(expiry) +
    (dte !== null ? ' · ' + dte + ' DTE (from as_of_date)' : '') +
    ' · delta band ' + esc(deltaBand) + '</dd>' +
    '<dt>Entry zone</dt><dd>Not published in the public feed — no underlying ' +
    'price is included. Use the underlying&rsquo;s 8-week support level on ' +
    'your own chart; do not chase above the zone.</dd>' +
    '<dt>Planned exit</dt><dd>' + esc(plannedExit) + ' (expiry − 90 days, conservative). ' +
    'The 120-day variant needs entry IV ≤ 25% plus DTE ≥ 540 plus delta 0.60–0.70; ' +
    'IV is not in the public feed, so it cannot be confirmed here. ' +
    'Planned-exit rule is unvalidated — see notes below.</dd>' +
    '<dt>Reassessment date</dt><dd>' + esc(reassessment) + ' (as_of_date + 30 days), then every 30 days.</dd>' +
    '<dt>Profit target</dt><dd>+50% of the debit paid (take half). ' +
    'No debit price is published in the public feed.</dd>' +
    '<dt>Invalidation level</dt><dd>Underlying weekly close below support − 3% ' +
    '(support level not published in the public feed), or option value −50% of debit.</dd>' +
    '<dt>Max risk</dt><dd>The debit paid per contract — never more. ' +
    'Profile cap $50 per trade ($5,000 profile). No debit price is published.</dd>' +
    '</dl></div>';
}

function renderDetail(c, feed) {
  if (!c) {
    return '<p class="empty">Select a candidate above to see its detail.</p>';
  }
  var breakdown = Array.isArray(c.score_breakdown) ? c.score_breakdown : [];
  var rows = breakdown.map(function (b) {
    return '<tr><td>' + esc(b.name) + '</td><td>' + esc(b.weight) + '</td><td>' +
      (b.score === null ? '<em>unavailable</em>' : fmtScore(b.score)) + '</td></tr>';
  }).join('');
  var liq = c.liquidity_flags || {};
  var liqLine = ['ask_size_ok', 'open_interest_ok', 'recent_volume_ok'].map(function (k) {
    return esc(k.replace(/_/g, ' ')) + ': ' + (liq[k] === true ? 'pass' : liq[k] === false ? 'fail' : '—');
  }).join(' · ');
  var reasons = isBlocked(c)
    ? '<p><strong>Blocking reasons (verbatim from feed):</strong> ' +
      c.blocking_reasons.map(function (r) { return esc(r); }).join(' · ') + '</p>' +
      '<p class="fine">Risk cap: $50 per trade ($5,000 profile, SIGNAL_RULES §5). ' +
      'A high score does not override the cap — a candidate can score above 60 ' +
      'and still be blocked when its selected contract costs more than $50.</p>'
    : '<p><strong>Blocking reasons:</strong> none.</p>';

  return '<article class="detail">' +
    '<h2>' + esc(c.symbol) + ' ' +
    '<span class="badge ' + statusClass(c.status) + '">' + esc(c.status) + '</span> ' +
    '<span class="badge badge-delayed">Delayed</span></h2>' +
    '<p>Canonical score <strong>' + fmtScore(c.canonical_score) + '</strong> / 100' +
    ' · display total ' + fmtScore(c.display_total) +
    ' · entry eligibility: ' + esc(c.entry_eligibility) + '</p>' +
    reasons +
    '<h3>Score breakdown</h3>' +
    '<table><thead><tr><th>Component</th><th>Weight</th><th>Score</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>' +
    '<p class="fine">Canonical score = sum(score × weight) / 100 with missing ' +
    'components counted as 0. Display total re-weights over available components only.</p>' +
    '<h3>Selected contract</h3>' +
    (c.selected_contract_descriptor
      ? '<p>Strike ' + esc(c.selected_contract_descriptor.strike) +
        ' · expiry ' + esc(c.selected_contract_descriptor.expiry) +
        ' · delta band ' + esc(c.selected_contract_descriptor.delta_band == null
          ? 'not stated' : c.selected_contract_descriptor.delta_band) + '</p>'
      : '<p>No contract selected — data unavailable; see blocking reasons above.</p>') +
    '<p>Liquidity flags: ' + esc(liqLine) + '</p>' +
    tradePlanPreview(c) +
    '<h3>Provenance</h3>' +
    '<p>Provenance: <strong>' + esc(c.provenance) + '</strong> (delayed 15 min). ' +
    'Feed generated_at: ' + esc(feed.generated_at) + ' · as_of_date: ' + esc(feed.as_of_date) + '.</p>' +
    '</article>';
}

function renderDiagnostics(diag) {
  var lines = [];
  lines.push('<p><strong>Last fetch:</strong> ' + esc(diag.fetchedAtLocal) +
    ' (your device clock — fetch time only, never used as market data).</p>');
  lines.push('<p><strong>Fetch result:</strong> ' + esc(diag.fetchResult) + '</p>');
  lines.push('<p><strong>Parse result:</strong> ' + esc(diag.parseResult) + '</p>');
  if (diag.feed) {
    lines.push('<p><strong>Feed:</strong> dataset ' + esc(diag.feed.dataset) +
      ' · generated_at ' + esc(diag.feed.generated_at) +
      ' · as_of_date ' + esc(diag.feed.as_of_date) +
      ' · candidates ' + diag.feed.candidates.length + '</p>');
    lines.push('<p><strong>Sources:</strong> ' + esc(diag.feed.sources.options_chains) + '</p>');
  }
  if (diag.warnings && diag.warnings.length > 0) {
    lines.push('<p><strong>Warnings:</strong></p><ul>' +
      diag.warnings.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>');
  }
  if (diag.errors && diag.errors.length > 0) {
    lines.push('<p><strong>Errors:</strong></p><ul>' +
      diag.errors.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>');
  }
  return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/* Browser wiring                                                      */
/* ------------------------------------------------------------------ */

function init() {
  var els = {
    error: document.getElementById('app-error'),
    stale: document.getElementById('stale-banner'),
    meta: document.getElementById('feed-meta'),
    top10: document.getElementById('top10'),
    others: document.getElementById('others'),
    detail: document.getElementById('detail'),
    diag: document.getElementById('diagnostics')
  };
  var diag = { fetchedAtLocal: new Date().toLocaleString(), fetchResult: '', parseResult: '' };

  function showError(msg) {
    els.error.hidden = false;
    els.error.textContent = msg;
  }

  fetch(FEED_URL, { cache: 'no-store' })
    .then(function (resp) {
      diag.fetchResult = 'HTTP ' + resp.status + ' from ' + FEED_URL;
      if (!resp.ok) throw new Error('Feed request failed: HTTP ' + resp.status);
      return resp.json();
    })
    .then(function (data) {
      var result = validateFeed(data);
      diag.errors = result.errors;
      diag.warnings = result.warnings;
      if (!result.ok) {
        diag.parseResult = 'FAILED — ' + result.errors.length + ' error(s). No data shown.';
        diag.feed = null;
        els.diag.innerHTML = renderDiagnostics(diag);
        showError('Feed invalid — research disabled. ' + result.errors[0] +
          ' Nothing has been invented to fill the gap; the feed publisher must fix candidates.json.');
        return;
      }
      var feed = result.feed;
      diag.feed = feed;
      diag.parseResult = 'OK — ' + feed.candidates.length + ' candidate(s) parsed, ' +
        result.warnings.length + ' warning(s).';
      els.diag.innerHTML = renderDiagnostics(diag);

      els.meta.textContent = 'Data as of ' + feed.as_of_date +
        ' · generated ' + feed.generated_at +
        ' · sources: ' + feed.sources.options_chains;

      if (isStaleFeed(feed)) {
        els.stale.hidden = false;
        els.stale.textContent = 'Data stale — research disabled. This feed was generated ' +
          feedAgeDays(feed) + ' day(s) ago (generated_at ' + feed.generated_at +
          '). Do not use it for entries; wait for the next daily publish.';
      }

      var rendered = renderTop10(feed.candidates);
      els.top10.innerHTML = rendered.topHtml;
      els.others.innerHTML = rendered.othersHtml;

      var bySymbol = {};
      feed.candidates.forEach(function (c) { bySymbol[c.symbol] = c; });
      document.addEventListener('click', function (ev) {
        var btn = ev.target && ev.target.closest
          ? ev.target.closest('[data-symbol]') : null;
        if (!btn) return;
        var sym = btn.getAttribute('data-symbol');
        if (bySymbol[sym]) {
          els.detail.innerHTML = renderDetail(bySymbol[sym], feed);
          els.detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    })
    .catch(function (err) {
      diag.fetchResult = diag.fetchResult || 'fetch failed';
      diag.parseResult = 'No feed loaded.';
      diag.errors = [String(err && err.message ? err.message : err)];
      els.diag.innerHTML = renderDiagnostics(diag);
      showError('Could not load candidates.json (' +
        (err && err.message ? err.message : err) +
        '). No data is shown — nothing has been invented. Check the connection and try again after the next daily publish.');
    });
}

/* Export for Node (smoke check) or wire up in the browser. */
var LeapsIQ = {
  FEED_URL: FEED_URL,
  STALE_DAYS: STALE_DAYS,
  validateFeed: validateFeed,
  validateCandidate: validateCandidate,
  isStaleFeed: isStaleFeed,
  feedAgeDays: feedAgeDays,
  renderTop10: renderTop10,
  renderDetail: renderDetail,
  tradePlanPreview: tradePlanPreview,
  renderDiagnostics: renderDiagnostics
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LeapsIQ;
} else if (typeof window !== 'undefined') {
  window.LeapsIQ = LeapsIQ;
  document.addEventListener('DOMContentLoaded', init);
}
