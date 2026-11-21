# Round 2 Asset Register — Longshot VR

**Game:** Longshot VR (Quest 2 WebXR, three.js r160)
**Round:** 2 rebuild, Sun 2026-11-15
**Assets directory:** `~/workspace/games/assets/longshot/` (referenced from the prototype as `assets/longshot/<file>`, with a `../assets/longshot/<file>` fallback for the deployed flat layout)
**Verification date:** 2026-11-15 (all entries)
**Budget:** $0 — every adopted asset is CC0 (public domain), no attribution required, no purchase.

Poly Haven license note: all Poly Haven assets are released under **CC0 1.0 Universal** — free for commercial and non-commercial use, no attribution required, no redistribution restriction. Verified on each asset's Poly Haven page and via the Poly Haven API (no key required) on 2026-11-15. Every downloaded file's md5 was checked against the md5 published by the Poly Haven API for that file — all 9 match.

## Adopted assets (in the prototype)

### Textures — Poly Haven CC0, 1k JPG, 1024×1024 each

| # | File | Asset | Map | Size (bytes) | md5 | Used for |
|---|------|-------|-----|--------------|-----|----------|
| 1 | `textures/dry_ground_01_diff_1k.jpg` | dry_ground_01 | Diffuse (sRGB) | 604,799 | `f928726e24cf06765877ae77b9a04b4a` | Range floor (12×12 repeat) |
| 2 | `textures/dry_ground_01_nor_gl_1k.jpg` | dry_ground_01 | Normal (OpenGL) | 243,523 | `6088d590e646993784228156696e9948` | Range floor |
| 3 | `textures/dry_ground_01_rough_1k.jpg` | dry_ground_01 | Roughness | 336,234 | `63b583296c606971ce605e5b160a21bc` | Range floor |
| 4 | `textures/boulder_01_diff_1k.jpg` | boulder_01 | Diffuse (sRGB) | 987,467 | `25f8a843f13369d56d37f49db05ea8c3` | Instanced rocks |
| 5 | `textures/boulder_01_nor_gl_1k.jpg` | boulder_01 | Normal (OpenGL) | 1,183,552 | `0c4da644d901144b53e4fe2446f3c389` | Instanced rocks |
| 6 | `textures/boulder_01_arm_1k.jpg` | boulder_01 | AO/Rough/Metal (ARM) | 659,386 | `d632159982cc3121ed3d69b89a122146` | Instanced rocks (aoMap + roughnessMap; metalness set to 1.0 only once this map arrives — a metalness-1 rock with no envmap renders black) |
| 7 | `textures/dark_wooden_planks_diff_1k.jpg` | dark_wooden_planks | Diffuse (sRGB) | 701,221 | `7ec8fe3e0b84289a4add3b10a54090bb` | Rifle stock + shooting bench |
| 8 | `textures/dark_wooden_planks_nor_gl_1k.jpg` | dark_wooden_planks | Normal (OpenGL) | 658,444 | `4093b4023a4270b3a06b762076106d58` | Rifle stock + shooting bench |
| 9 | `textures/dark_wooden_planks_rough_1k.jpg` | dark_wooden_planks | Roughness | 673,968 | `6eaec29bb24d157dde74d38bc5a63018` | Rifle stock + shooting bench |

**Total: 9 files, 6,048,594 bytes (~5.8 MB).** All verified as JPEG 1024×1024 via `file` on 2026-11-15.

**Source pages:**
- dry_ground_01 — https://polyhaven.com/a/dry_ground_01
- boulder_01 — https://polyhaven.com/a/boulder_01
- dark_wooden_planks — https://polyhaven.com/a/dark_wooden_planks

**Download URLs (dl.polyhaven.org, from the Poly Haven API):**
- https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dry_ground_01/dry_ground_01_diff_1k.jpg
- https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dry_ground_01/dry_ground_01_nor_gl_1k.jpg
- https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dry_ground_01/dry_ground_01_rough_1k.jpg
- https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/boulder_01/boulder_01_diff_1k.jpg
- https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/boulder_01/boulder_01_nor_gl_1k.jpg
- https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/boulder_01/boulder_01_arm_1k.jpg
- https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dark_wooden_planks/dark_wooden_planks_diff_1k.jpg
- https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dark_wooden_planks/dark_wooden_planks_nor_gl_1k.jpg
- https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dark_wooden_planks/dark_wooden_planks_rough_1k.jpg

**License:** CC0 1.0 for all nine. **Attribution:** not required (none given in-game; this register is the record).
**Poly count:** N/A — textures, not meshes. The meshes they dress are procedural (see below).

### Procedural geometry in the prototype (not external assets)

These are built in code; listed here so the register covers everything visible:

| Item | Construction | Draw calls | Notes |
|------|--------------|-----------|-------|
| Rifle (4 weapons) | ~20 merged primitives → 4 meshes (metal / stock / glass / accent) | 4 | Documented fallback for the missing rifle GLB (see Gaps). Barrel taper + scope-bell taper corrected in Round 2 (both were reversed in Round 1). |
| Rocks | 1 InstancedMesh, jittered icosahedra, 37 instances | 1 | Boulder PBR textures applied |
| Pine treeline | 2 InstancedMeshes (trunks + merged two-cone canopies), 48 trees | 2 | Documented fallback for the missing pine GLB (see Gaps) |
| Grass tufts | 1 InstancedMesh, crossed planes + canvas blade texture, 84 tufts | 1 | Gravel strip kept clear |
| Berms | Sloped trapezoid prisms (custom BufferGeometry) + flat tops | 6 (3 lanes × 2) | Same call count as the Round 1 boxes |
| Target plates | Cylinder + neon ring, brushed-steel canvas texture | per target | Steel texture is procedural canvas (painted in code), not an external asset |

## Investigated and REJECTED (do not use — reasons recorded)

| Candidate | Source | License | Reason rejected |
|-----------|--------|---------|-----------------|
| Rifle GLB (Quaternius, via Cinevva re-host) | quaternius.com / cinevva.com | CC0, 2,709 verts, 0.126×0.576×1.82 m | **Wrong weapon type** — assault rifle with curved magazine and yellow/red "wasteland" styling (thumbnail inspected). A Longshot sniper rifle must be a bolt-action with a scope. Substituting it would be a wrong-asset substitution. |
| Sniper GLB (Kenney) | kenney.nl | CC0, 8,600 verts | Cruder than the current procedural rifle (boxes + cylinder; thumbnail inspected). No quality gain. |
| Sniper 1/2/3 (Quaternius modular-scifi-guns) | quaternius.com | CC0 | Sci-fi styling — wrong look for a golden-hour hunting range. |
| M338 bolt-action sniper (CuiGames, itch.io) | itch.io | **Custom license — FORBIDS redistribution** ("No reselling or redistributing the files") | Not CC0/CC-BY; cannot be shipped in the game. Also ~55k tris — too heavy for a Quest 2 viewmodel. |
| Bolt-action rifles (SMLE, Springfield 1903, rigmodels.com) | rigmodels.com | "Royalty Free" (unclear provenance) | Search-result URLs contained spam/malicious-looking path segments. Source not trusted; do not use. |
| boulder_01 MESH (Poly Haven) | polyhaven.com/a/boulder_01 | CC0 | 66,122 tris / 67,042 verts (parsed from the 1k glTF) — far too heavy for Quest 2. Its **textures** were adopted instead. |
| namaqualand_rocks_01 MESH (Poly Haven) | polyhaven.com | CC0 | 85,716 tris / 44,947 verts across 4 meshes — too heavy. Not downloaded. |
| Poly Haven trees (various) | polyhaven.com | CC0 | 30–100+ MB GLBs, hundreds of thousands of tris — not Quest 2-appropriate. |
| Kenney Nature Kit (pine trees) | kenney.nl/media/pages/assets/nature-kit/…/kenney_nature-kit.zip | CC0 | Direct archive URL returned **403 Forbidden** (donation-flow / session-cookie gate — needs a browser session). Not obtainable by this agent. Procedural pines used instead. |
| Sketchfab models (various) | sketchfab.com | CC-licensed (various) | Downloads require a signed-in account + OAuth — not available to this agent. |
| Poly Pizza models (various) | poly.pizza | CC0/CC-BY | API requires a free API key (account); direct download links not exposed in page text. Not obtainable by this agent. |

## FLAGGED GAPS (no suitable licensed asset obtainable — documented, not silently substituted)

1. **Bolt-action sniper-rifle GLB — GAP.** No suitable licensed bolt-action sniper rifle model could be obtained free on 2026-11-15. Every candidate was wrong-type (assault/sci-fi), cruder than the procedural build, license-blocked (CuiGames redistribution ban), or from an untrusted source. **Fallback used:** a substantially upgraded procedural rifle (~20 merged parts, PBR wood/steel/glass materials, correct tapers) — recorded here and in the build notes, not a silent substitute. If a suitable CC0/CC-BY bolt-action GLB is found later, the importmap already maps `three/addons/` (added Round 2) so GLTFLoader can be dropped in; the rifle's local origin must stay at the barrel centerline (y +0.02 in rifle space) or the aiming fix breaks — see the build notes.
2. **Pine-tree GLB — GAP.** Kenney Nature Kit was blocked by a 403; Poly Haven trees are far too heavy. **Fallback used:** procedural pines (instanced trunks + merged two-cone canopies with per-instance colour variation). A future CC0 low-poly pine GLB (≤ ~2k tris per tree) could replace them; instancing must be preserved (48 trees = 2 draw calls today).

## Notes

- **No GLB/GLTF was adopted in Round 2.** The importmap entry for `three/addons/` was added to the prototype so a future licensed model can be loaded with GLTFLoader, but no GLTFLoader import exists in the shipped code.
- **Visual-reference images are NOT assets.** Danny's four reference images (visual-references/) are quality references only — never copied into the game as textures or billboards, per his rules.
- **No real brands, badges, or logos** appear in any adopted asset or in the procedural rifle (no manufacturer markings).
- Texture loading is async with a procedural fallback: if a texture file is missing (e.g. not yet deployed), the game plays identically on its canvas-generated textures, and `applyPbrTextures()` upgrades materials as each PBR map arrives.
