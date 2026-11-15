# Danny's Arcade — Cinematic Realism Standard

**Status: OWNER APPROVED — PERMANENT. Issued by Danny, November 15, 2026.**
**Applies to:** ALL existing games, future games, updates, and expansions in Danny's Arcade.
**Benchmark:** the upgraded Rhythm Slicer prototype (post–Nov 15 fix) is the initial visual quality benchmark.
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

Toy-like graphics, cheap-looking objects, flat environments, unfinished prototype visuals, generic primitives or empty environments as final presentation, repetitive disconnected stock-style content. A prototype look is never the shipped look.

## 4. Meta Quest 2 performance requirements

Primary platform: standalone Meta Quest 2 browser using WebXR.

- Target a stable **72 FPS** in immersive VR.
- Profile **actual frame times** and GPU/CPU bottlenecks on the headset. Never claim verified 72 FPS without actual Quest 2 measurements.
- Optimize geometry, textures, draw calls, and lighting. Use baked lighting and selective dynamic effects. Avoid excessive post-processing.
- Maintain comfortable stereoscopic rendering. Prioritize controller responsiveness and headset comfort.
- **Never sacrifice stable gameplay merely to increase graphical detail.** When an effect is too expensive, find a visually convincing alternative — never just drop the cinematic experience, and never downgrade graphics to finish faster.
- Established technical facts (verified Nov 14 against the three.js r160 source — do not re-litigate, do not re-break): mid-session pixel-ratio / framebuffer-scale changes are inert in XR; fixed foveation works mid-session and its scale is 0 = none, 1 = maximum; stereo rendering doubles draw calls (no multiview in stock three.js). The frame-time valve sheds ONLY registry items (foveation, particle counts, trails/glows) — never lighting, geometry, textures, or gameplay feedback.

## 5. Interaction requirements (feel is ground truth)

- **Contact counts.** When the player's blade/hand visibly intersects a target, it scores. No hidden gate may silently reject a genuine intersection. (Nov 15 lesson: a 1.5 m/s speed gate rejected slow swings as MISS, and random direction requirements rejected clean contact as OFF ANGLE. Both were removed after Danny's headset feedback.)
- **No punitive hidden rules.** If a mechanic can reject a player's action, the player must be able to see and understand the rule before it fires. Never punish a natural swing, a slow swing, or a diagonal.
- **Continuous collision.** Fast-moving interactors use swept/continuous collision so no hit can tunnel between frames.
- **Haptics on success.** Every successful interaction the player can feel should buzz: every slice, every hit, every grab. Firm and short (e.g. 0.8 strength / 80 ms for a normal slice), never a tap so light it reads as nothing. Haptics must fire on the same frame path as the score and the sound — collision effects, slicing sounds, scoring, and vibration are synchronized, never sequential afterthoughts.
- **Danny's feel on the headset is ground truth.** His exact failure report is the diagnosis. Fix exactly what he reported; never argue code-truth against his experience; never claim a headset verification that did not happen.

## 6. Development workflow (mandatory per game)

1. Audit the game against this standard (§2–§5) and the Bible's 7 gates (visual, gameplay, audio, immersion, performance, comfort, regression).
2. Write a gap plan (what changes, what stays, measured budgets).
3. Implement in a **prototype first** — the live game is never overwritten until the replacement passes testing and Danny validates it on the headset.
4. ChatGPT API review of the material changes (this standard attached to the brief).
5. Test and optimize (automated regression tests where the game has them; desktop smoke test; headset validation by Danny for anything VR-entry, visual, audio, haptic, or feel).
6. Deploy after checks, with before/after comparisons + measurements + limitations.
7. Record: what changed, what was measured, what is still unverified.

**Release approval criteria:** both gates pass for the exact build being released — the technical checks AND a full watch-through / play-through against this standard. A technical pass alone is never creative approval. No future game begins development without this standard loaded.

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
- **Blade color (Rhythm Slicer):** Danny asked for red/blue blades; the build keeps cyan/magenta because the color-match mechanic runs on it. A full red/blue retheme is an owner decision, not taken. (Open.)
- **Delivery:** builds reach Danny via the hub tile, not links in chat.
- **Single-player only** (multiplayer declined Oct 27, never re-pitch). Unlimited lives/retries, no game-over path. Original tributes only.
- **Budget:** $0 additional spend. No paid services, assets, or subscriptions without a separate explicit authorization.
- **Routine technical decisions are authorized** (Danny, Nov 15). Do not repeatedly request approval for previously established requirements. Owner decisions are only: creative direction changes, spending, deletions, live swaps, and anything this standard marks as needing his word.

## 9. Change log

- **2026-11-15 — v1.0 (owner-approved).** Created from Danny's Permanent Cinematic Realism Standard directive. Incorporates the Nov 14 Cinematic Quality Directive and the Nov 15 Rhythm Slicer interaction lessons (§5). Rollout order (standing): Rhythm Slicer (benchmark) → Neon Invaders → Marsh Shot → Longshot → Star Strike → Rad (perf/sound/comfort/usability only) → Dead Hollow last (HUD/mute/session fixes before its acceptance testing).
