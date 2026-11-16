# Danny's Arcade — Cinematic Realism Standard

**Status: OWNER APPROVED — PERMANENT. Issued by Danny, November 15, 2026.**
**Applies to:** ALL existing games, future games, updates, and expansions in Danny's Arcade.
**Benchmark:** the upgraded Rhythm Slicer prototype (post–Nov 15 fix) is the initial visual quality benchmark. **Visual reference set (Danny, Nov 15):** five reference images in `~/workspace/goals/danny-s-arcade/files/visual-references/` — photorealistic cockpit driving (neon rainy city, mountain highway, coastal sunset, neon street) plus a starfighter cockpit (detailed holographic instruments, ringed gas giant, asteroid field). They define the target look for EVERY game: detailed cockpits/instruments, realistic materials, wet reflective surfaces, atmospheric lighting, believable scale and density, cinematic space environments. Aim at this bar within Quest 2's real limits — the 70/30 selective photorealism in §1 is how we get closest. Vehicles stay original (no real brands/badges/logos); the images are quality references, not assets and not feature specs.
**Location:** this file lives in the project source tree (`~/workspace/games/`) and in the project repository (dsuarez1979-ship-it/dannys-arcade). It is loaded into every new-game spec, every upgrade plan, and every ChatGPT API consultation brief for arcade work. Do not rely on conversational memory alone.

Related permanent documents: the Cinematic Production Bible v1.0 (`~/workspace/goals/danny-s-arcade/hidden_files/cinematic-production-bible-v0.1.md` — the file name is v0.1, the content is v1.0 permanent) holds the implementation detail (7 gates, valve rules, framebuffer/foveation verdicts, incident lessons). This standard is the creative bar; the Bible is how it is met. Where they disagree, this standard governs the goal and the Bible governs the method.

## 1. The standard: 70% cinematic presentation, 30% selective photorealism

These percentages describe **artistic priorities, not GPU allocation or literal rendering measurements.**

- **70% cinematic presentation:** dramatic lighting, atmosphere, environmental depth, cinematic effects, believable scale, immersive sound. The game must feel like a scene, not a tech demo.
- **30% selective photorealism:** realistic materials, textures, reflections, object proportions, physical interactions — applied where the player's eye actually rests, not everywhere at equal cost.

**Goal:** premium, AAA-inspired VR experiences on standalone Meta Quest 2 — without sacrificing stable performance. Danny's Arcade must feel like a collection of premium, immersive VR experiences, not basic browser demonstrations. Realism, cinematic quality, responsiveness, immersion, and performance are permanent requirements for every game going forward.

## 2. What every game must include

- Cinematic environments with convincing depth and scale.
- Realistic textures and physically believable materials (PBR).
- Professional lighting, shadows, and atmospheric effects.
- Smooth, responsive animations and interactions.
- High-quality spatial audio and sound effects.
- Controller haptics wherever appropriate and supported.
- Carefully optimized visual effects.
- Cohesive, professional art direction.

Each game keeps its own identity and gameplay style. Consistent production quality, not a uniform look.

## 3. What every game must avoid

Toy-like graphics, cheap-looking objects, flat environments, unfinished prototype visuals, generic primitives or empty environments as final presentation, repetitive disconnected stock-style content. A prototype look is never the shipped look. **Detailed vehicles, weapons, animals, and characters must NOT be built entirely from simplistic primitive shapes when higher-quality optimized assets are feasible** — use appropriately licensed, optimized 3D models and textures from reputable asset libraries (free resources; verify licensing and attribution per asset; no paid purchases without authorization). **Inaccurate aiming or controller interaction is a defect, not a feel preference** — a player must be able to accurately control or target objects without unexplained offsets (§5).

## 4. Meta Quest 2 performance requirements

Primary platform: standalone Meta Quest 2 browser using WebXR.

- Target a stable **72 FPS** in immersive VR.
- Profile **actual frame times** and GPU/CPU bottlenecks on the headset. Never claim verified 72 FPS without actual Quest 2 measurements.
- Optimize geometry, textures, draw calls, and lighting. Use baked lighting and selective dynamic effects. Avoid excessive post-processing.
- Maintain comfortable stereoscopic rendering. Prioritize controller responsiveness and headset comfort.
- **Never sacrifice stable gameplay merely to increase graphical detail.** When an effect is too expensive, find a visually convincing alternative — never just drop the cinematic experience, and never downgrade graphics to finish faster.
- **Measure automatically where feasible.** Capture browser-side frame-time measurements and adaptive-quality (valve) states automatically during play where feasible, stored locally on the device (localStorage) — with clear user consent and without unnecessary personal data collection, and never transmitted anywhere. **Do not claim GPU-level measurements unless supported by actual profiling tools.** Do not use arbitrary draw-call limits as a substitute for measured performance.
- **Rendering technology baseline (P0 directive, Nov 15):** WebGL 2 is the primary compatibility baseline; WebGPU only when verified compatible with Meta Quest Browser and the WebXR rendering path. PBR materials; compressed KTX2/Basis Universal textures; optimized glTF/GLB models; Draco or Meshopt geometry compression; LOD systems; frustum and occlusion culling where beneficial; GPU instancing; baked global illumination and light probes; optimized dynamic shadows. **No desktop-style real-time ray tracing on Quest 2.**
- **When performance is insufficient, optimize in this order (P0 directive, Nov 15):** (1) reduce expensive post-processing and particle effects; (2) optimize dynamic shadows and lighting; (3) reduce distant geometry and unnecessary draw calls; (4) improve instancing, culling, and LOD; (5) adjust render resolution within acceptable clarity limits; (6) simplify nonessential visual effects without sacrificing gameplay.
- Established technical facts (verified Nov 14 against the three.js r160 source — do not re-litigate, do not re-break): mid-session pixel-ratio / framebuffer-scale changes are inert in XR; fixed foveation works mid-session and its scale is 0 = none, 1 = maximum; stereo rendering doubles draw calls (no multiview in stock three.js). The frame-time valve sheds ONLY registry items (foveation, particle counts, trails/glows) — never lighting, geometry, textures, or gameplay feedback.

## 5. Interaction requirements (feel is ground truth)

- **Contact counts.** When the player's blade/hand visibly intersects a target, it scores. No hidden gate may silently reject a genuine intersection. (Nov 15 lesson: a 1.5 m/s speed gate rejected slow swings as MISS, and random direction requirements rejected clean contact as OFF ANGLE. Both were removed after Danny's headset feedback.)
- **No punitive hidden rules.** If a mechanic can reject a player's action, the player must be able to see and understand the rule before it fires. Never punish a natural swing, a slow swing, or a diagonal.
- **Continuous collision.** Fast-moving interactors use swept/continuous collision so no hit can tunnel between frames.
- **Haptics on success.** Every successful interaction the player can feel should buzz: every slice, every hit, every grab. Firm and short (e.g. 0.8 strength / 80 ms for a normal slice), never a tap so light it reads as nothing. Haptics must fire on the same frame path as the score and the sound — collision effects, slicing sounds, scoring, and vibration are synchronized, never sequential afterthoughts.
- **Aiming accuracy.** What the player sees must be what the game hits: visual weapon/tool orientation, the interaction ray, and the true hit point must agree. Verify grip pose, target-ray pose, controller orientation, and coordinate transformations per game; correct controller offsets, raycast origins, and collision calculations. Diagnose with a temporary developer diagnostic (interaction ray + true hit point) and remove/disable it for normal gameplay. Test accuracy at multiple distances and angles, on both controllers where supported. Preserve intended mechanics (ballistic drop, wind) — fix the offset, not the physics. (Nov 15 Round 2 lesson: Rad, Longshot, and Marsh Shot all failed owner acceptance on aiming — each game's actual interaction model must be investigated, never assumed. Rad's primary control is steering; determine whether a report concerns steering, targeting, or another interaction before changing behavior.)
- **Danny's feel on the headset is ground truth.** His exact failure report is the diagnosis. Fix exactly what he reported; never argue code-truth against his experience; never claim a headset verification that did not happen.

## 6. Development workflow (mandatory per game)

1. Audit the game against this standard (§2–§5) and the Bible's 7 gates (visual, gameplay, audio, immersion, performance, comfort, regression).
2. Write a gap plan (what changes, what stays, measured budgets).
3. Implement in a **prototype first** — the live game is never overwritten until the replacement passes testing and Danny validates it on the headset.
4. ChatGPT API review of the material changes (this standard attached to the brief).
5. Test and optimize (automated regression tests where the game has them; desktop smoke test; headset validation by Danny for anything VR-entry, visual, audio, haptic, or feel).
6. Deploy after checks, with before/after comparisons + measurements + limitations.
7. Record: what changed, what was measured, what is still unverified.

**Consolidated dashboard (P0 directive, Nov 15):** one dashboard (`~/workspace/goals/danny-s-arcade/files/arcade-overhaul-dashboard.md`) shows every game and its redesign status, visual improvements completed, controller and gameplay fixes, actual Quest 2 FPS measurements where available, remaining blockers, deployment and testing links (hub tiles), and next implementation priorities. It is kept current as work lands; no game is left permanently behind.

**Release approval criteria:** both gates pass for the exact build being released — the technical checks AND a full watch-through / play-through against this standard. A technical pass alone is never creative approval. No future game begins development without this standard loaded.

**V2.0 phase structure (Danny, Nov 15 — Master Development Directive V2.0):** work in parallel where safe, in this priority order. **Phase A — Immediate corrections:** fix inaccurate aiming/controls; fix centered launch screens and page margins; preserve the three visually approved games. **Phase B — Visual rebuilds:** Dead Hollow, Longshot, Marsh Shot, Rad vehicle + environmental realism. **Phase C — Rad world expansion:** curved-road generation, four driving environments, location selection, Continuous Road Trip, Scenic Drive. **Phase D — Verification:** automated regression tests, ChatGPT API technical + creative reviews, before-and-after screenshots, WebXR interaction checks, actual Quest 2 performance measurements, owner headset validation. **Phase E — Controlled release:** live versions stay intact while prototypes are built and tested; no live replacement until the corrected prototype passes its QA gates and the owner validates it.

## 7. Integration (how the standard stays automatic)

- **New-game specs:** this document is attached to the spec before any code is written.
- **Shared architecture:** the Performance Manager and any shared rendering/audio code carry the §4 budgets and the §5 interaction rules as defaults.
- **Art and asset selection:** assets are judged against §2/§3 before adoption.
- **Performance testing:** every game's perf readout and baseline capture are judged against §4.
- **Automated quality checks:** where feasible, tests pin the §5 rules (e.g. the Rhythm Slicer collision suite pins "contact counts" and "drift does not score").
- **ChatGPT API consultation context:** every arcade consultation brief attaches this standard (with the Bible) so reviews judge against the owner's bar, not generic advice.
- **Repository:** this file is stored in the project repository alongside the games. Changes to it need an owner decision and a change-log entry below.

## 8. Standing owner decisions that bound this standard

- **Rad VR graphics: PARK LIFTED** (Danny, Nov 15 ~3:00 PM). The Nov 14 park ("Rad graphics preserved until separately authorized") is superseded — Rad gets the full cinematic upgrade including visuals, same as the other games.
- **Blade color (Rhythm Slicer):** red/blue palette FINAL (Danny, Nov 15 ~4:13 PM) — retheme DONE and deployed ~4:18 PM (left = BLUE 0x2f7fff, right = RED 0xff2b2b; bombs AMBER 0xffaa00). Alternating red/blue gameplay is a permanent spec (color tells the HAND, not the side; crosses only on inner lanes 1–2).
- **Round 2 owner verdicts (Danny, Nov 15 ~4:40 PM — headset-tested): VISUALLY APPROVED, PRESERVE UNCHANGED: Rhythm Slicer, Star Strike, Neon Invaders** (visual approval does not automatically constitute measured performance approval). **FAILED OWNER ACCEPTANCE, REBUILD: Rad** (still cartoonish; aiming completely off), **Dead Hollow** (still cartoonish, particularly cars and the interior dashboard), **Longshot** (improved but still cartoonish; aiming completely off), **Marsh Shot** (still cartoonish; aiming completely off). The four failed games are NOT approved for live replacement. Aiming/control fixes come FIRST, graphics upgrades SECOND. Professional-quality licensed assets are required where feasible (see §3). No future release regresses to toy-like graphics or inaccurate controller interactions. Do not ask the owner to restate established visual preferences.
- **Delivery:** builds reach Danny via the hub tile, not links in chat.
- **Single-player only** (multiplayer declined Oct 27, never re-pitch). Unlimited lives/retries, no game-over path. Original tributes only.
- **Budget:** $0 additional spend. No paid services, assets, or subscriptions without a separate explicit authorization.
- **Routine technical decisions are authorized** (Danny, Nov 15). Do not repeatedly request approval for previously established requirements. Owner decisions are only: creative direction changes, spending, deletions, live swaps, and anything this standard marks as needing his word.

## 9. Responsive Interface and VR Launch-Screen Requirements

**Status: PERMANENT (Danny, Nov 15, 2026). Applies retroactively to all existing games and the hub, and automatically to every future game including Skybound: Flight of Wonders.**

Every game must open with a polished, centered, properly scaled interface. The player must be able to start immediately without hunting for buttons or scrolling down.

- **Primary launch controls centered and visible on load.** START GAME and ENTER VR are centered horizontally and visible immediately when the page loads — no scrolling to begin playing. Headings, instructions, and secondary controls must never push the launch button below the visible viewport.
- **Responsive layout for the actual Quest 2 browser viewport.** Responsive CSS Grid or Flexbox; viewport-aware sizing and spacing; appropriate viewport meta configuration; safe padding around screen edges; `box-sizing: border-box`; flexible text wrapping and button sizing; dynamic viewport units where supported; appropriate height and overflow management. No fixed-width layouts, oversized containers, or absolute positioning that pushes content out of the visible area. **No horizontal scrolling during normal use.** Primary controls visible without vertical scrolling at the supported Quest 2 browser viewport sizes; secondary content may scroll when necessary.
- **Consistent, reusable menu design.** One responsive menu/launch-screen design shared by all games and future titles: cinematic title presentation, clearly visible centered START GAME / ENTER VR button, readable properly spaced instructions, consistent menu navigation, accessible pause/restart/sound controls, responsive layout that works with Quest controllers. Each game keeps its unique visual identity; usability stays consistent.
- **WebXR entry preserved.** Immersive VR entry must not break during menu redesigns. WebXR session requests stay directly associated with supported user interactions. No unnecessary extra clicks before entering VR. Test: starting a game, entering immersive VR, exiting VR, restarting, returning to the main menu, controller selection and button activation.
- **Testing is mandatory.** Test the hub and every game at multiple browser viewport sizes, including the actual Quest 2 browser. Verify: no clipped buttons or text, no unwanted horizontal overflow, centered launch buttons, primary controls visible without scrolling, readable menus, no overlapping interface elements, proper landscape and resized-window behavior, successful WebXR entry. Use screenshots and viewport measurements as evidence. **Never claim Quest 2 layout verification based solely on desktop emulation.**

## 10. Change log

- **2026-11-15 — P0 Complete Cinematic VR Graphics Overhaul (owner directive, ~8:18 PM).** Added the rendering-technology baseline and the 6-step performance-optimization order (§4), the consolidated dashboard requirement (§6), and the per-game redesign mandates (full text in `~/workspace/goals/danny-s-arcade/files/cinematic-vr-graphics-overhaul-directive-2026-11-15.md`). Supersedes weaker visual quality standards; all previous owner decisions and approved functionality preserved unless explicitly changed.

- **2026-11-15 — Visual reference set expanded to 5 images (owner decision, ~8:12 PM).** Danny added the starfighter-cockpit image (`star-strike-cockpit-reference.jpg`) and directed that it be the visual bar for EVERY game, not just Star Strike 2.0 ("That's what I want you to use for every single game, high end graphics"). The set is now 4 driving cockpits + 1 space cockpit. No rules changed — §1–§9 stand; the 70/30 selective photorealism in §1 remains how the bar is approached within Quest 2's real limits.

- **2026-11-15 — v1.4 (Master Development Directive V2.0).** Consolidated all owner instructions, findings, QA requirements, and issues into this standard. Added the V2.0 phase structure A–E (§6), automatic browser-side frame-time/valve-state capture (local-only, consent, no personal data; no GPU-level claims without profiling tools) (§4). Visual approval status: Rhythm Slicer, Star Strike, Neon Invaders approved (preserve); Rad, Dead Hollow, Longshot, Marsh Shot failed (rebuild). Applies to all 7 games + Skybound + every future game.

- **2026-11-15 — v1.1 (owner findings, Round 2).** Danny's headset test results: Rhythm Slicer, Star Strike, Neon Invaders visually approved (preserve unchanged); Rad, Dead Hollow, Longshot, Marsh Shot failed owner acceptance (cartoonish graphics; aiming off in Rad/Longshot/Marsh Shot). Added the aiming-accuracy rule (§5), the professional-assets requirement (§3), and the Round 2 verdicts (§8). Aiming fixes precede graphics upgrades. The standard applies to every future game including Skybound: Flight of Wonders.
- **2026-11-15 — v1.0 (owner-approved).** Created from Danny's Permanent Cinematic Realism Standard directive. Incorporates the Nov 14 Cinematic Quality Directive and the Nov 15 Rhythm Slicer interaction lessons (§5). Rollout order (standing): Rhythm Slicer (benchmark) → Neon Invaders → Marsh Shot → Longshot → Star Strike → Rad (perf/sound/comfort/usability only) → Dead Hollow last (HUD/mute/session fixes before its acceptance testing).
