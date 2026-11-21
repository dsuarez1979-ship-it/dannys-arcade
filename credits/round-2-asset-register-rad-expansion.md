# Round 2 Asset Register — Rad VR Expansion

**Date verified:** 2026-11-15
**Prototype:** `~/workspace/games/rad-vr-expansion-prototype/index.html`
**Rule:** every asset is CC0 (or equivalent public-domain dedication) with the licence verified at download time. No asset with unresolved rights is used. No wrong-asset substitutions.

## Wired assets (loaded by the prototype, progressive enhancement)

### 1. Kenney Nature Kit 2.1 — palm tree
- **File:** `~/workspace/games/assets/rad-expansion/models/tree_palmDetailedTall.glb`
- **Source URL:** https://kenney.nl/assets/nature-kit (download via the kit's signed download link; kit page https://kenney.nl/assets/nature-kit)
- **Licence:** CC0 1.0 Universal (public domain dedication). Licence text copied to `models/Kenney-License.txt`.
- **Attribution:** not required (CC0). Kenney is credited here as a courtesy.
- **Verification date:** 2026-11-15 (GLB JSON parsed: geometry, materials, and bounds inspected)
- **File size:** 28,204 bytes (md5 `8fadba96942a8b36e8447fe0bd56e2d7`)
- **Poly count:** 336 triangles, 3 meshes, 2 materials, texture-free (flat material colours only)
- **Use:** replaces the procedural palm geometry in `palmIM` (32-pool); normalised to ~4.6 m height, base at y=0.
- **Modification:** material colours re-tinted at merge time toward realistic tones (CC0 permits modification): `leafsGreen`/`leafsDark` → deep green, `woodBark`/`woodBarkDark` → dark brown, `dirt` → gray-brown, `grass` → muted green. Kenney's native palette is stylised (teal leaves, orange bark) and would clash with the cinematic standard.

### 2. Kenney Nature Kit 2.1 — pine tree
- **File:** `~/workspace/games/assets/rad-expansion/models/tree_pineTallA_detailed.glb`
- **Source URL:** https://kenney.nl/assets/nature-kit
- **Licence:** CC0 1.0 Universal. Licence text in `models/Kenney-License.txt`.
- **Attribution:** not required (CC0).
- **Verification date:** 2026-11-15 (GLB JSON parsed)
- **File size:** 10,708 bytes (md5 `cad801d84f9599d2ad015d7b657b25b3`)
- **Poly count:** 134 triangles, 1 mesh, 2 materials, texture-free
- **Use:** replaces the procedural pine geometry in `pineIM` (48-pool); normalised to ~5.2 m height, base at y=0.
- **Modification:** same re-tint map as the palm (see above).

### 3. Kenney Nature Kit 2.1 — large rock
- **File:** `~/workspace/games/assets/rad-expansion/models/rock_largeA.glb`
- **Source URL:** https://kenney.nl/assets/nature-kit
- **Licence:** CC0 1.0 Universal. Licence text in `models/Kenney-License.txt`.
- **Attribution:** not required (CC0).
- **Verification date:** 2026-11-15 (GLB JSON parsed)
- **File size:** 7,552 bytes (md5 `a733c77698ef83d66da7ba76f8e755ee`)
- **Poly count:** 80 triangles, 2 materials, texture-free
- **Use:** replaces the procedural boulder geometry in `rockIM` (16-pool); normalised to ~1.6 m height, base at y=0. Scaled 1.4× in Mountain Roads.
- **Modification:** re-tint map applied where material names match.

### 4. Poly Haven — rock face texture (tunnel interior)
- **File:** `~/workspace/games/assets/rad-expansion/textures/rock_face_03_diff_1k.jpg`
- **Source URL:** https://polyhaven.com/a/rock_face_03 (API record confirmed CC0; md5 matches the Poly Haven API record exactly)
- **Licence:** CC0 1.0 Universal.
- **Attribution:** not required (CC0).
- **Verification date:** 2026-11-15 (md5 matched against the Poly Haven API record)
- **File size:** 927,082 bytes (md5 `e4c34abb1aad5befe12754fad507147a`), 1024×1024
- **Poly count:** n/a (texture)
- **Use:** `tunnelRingMat.map`, repeat (4, 1), anisotropy 4, sRGB. Gives the tunnel tubes a rock-face read instead of flat grey.
- **Modification:** none.

### 5. Poly Haven — concrete wall texture (pillars/portals)
- **File:** `~/workspace/games/assets/rad-expansion/textures/concrete_wall_008_diff_1k.jpg`
- **Source URL:** https://polyhaven.com/a/concrete_wall_008 (API record confirmed CC0; md5 matches the Poly Haven API record exactly)
- **Licence:** CC0 1.0 Universal.
- **Attribution:** not required (CC0).
- **Verification date:** 2026-11-15 (md5 matched against the Poly Haven API record)
- **File size:** 623,051 bytes (md5 `6a0f87fbfea261d797661c47e05b25ad`), 1024×1024
- **Poly count:** n/a (texture)
- **Use:** `pillarMat.map`, repeat (2, 2), anisotropy 4, sRGB. Gives bridge/elevated support pillars a concrete read.
- **Modification:** none.

### 6. Poly Haven — asphalt texture (road surface) — REUSED from the main prototype
- **File:** `~/workspace/games/assets/rad/asphalt_02_diff_1k.jpg` (the sibling's copy — NOT duplicated into `rad-expansion/`)
- **Source URL:** https://polyhaven.com/a/asphalt_02 (API record confirmed: author Rob Tuytel, CC0, "weathered grey asphalt")
- **Licence:** CC0 1.0 Universal.
- **Attribution:** not required (CC0). Author: Rob Tuytel.
- **Verification date:** 2026-11-15 (Poly Haven API record confirmed; file already on disk from the sibling's work)
- **File size:** 731,707 bytes (md5 `fa19772d4817754c3efab708c651f5a8`), 1024×1024
- **Poly count:** n/a (texture)
- **Use:** `road.material.map` via `activateAsphalt` (identical to the main prototype's implementation — the integration pass keeps one copy), repeat (5, 3.33), anisotropy 4, sRGB. Road band UVs span u 0.06–0.94, so the texture tiles at ~3.5 m.
- **Modification:** none.

### 7. Kenney Nature Kit 2.1 — large cliff rock — WIRED 2026-11-15 (integration pass)
- **File:** `~/workspace/games/assets/rad-expansion/models/cliff_large_rock.glb`
- **Source URL:** https://kenney.nl/assets/nature-kit
- **Licence:** CC0 1.0 Universal. Licence text in `models/Kenney-License.txt`.
- **Attribution:** not required (CC0).
- **Verification date:** 2026-11-15 (GLB JSON parsed by the expansion agent; re-parsed by the integration pass: 1 mesh, 1 material `dirt`, bounds x −0.50–0.50, y 0–1.00, z 0.08–0.50)
- **File size:** 3,560 bytes (md5 `041818c881fff8955382d45e6ddf9722`)
- **Poly count:** 32 triangles, 1 material, texture-free, ~1.00×1.00×0.42 m
- **Use:** instanced cliff-face blocks (`cliffIM`, 96-pool) along the Mountain Roads cliff ranges (bank +18, segments 60–330 left / 420–690 right), one slab per segment at the foot of the slope, broad face fronting the road. Normalised via `kenneyNatureGeometry(gltf, 1.0)`; per-instance scale gives 10–16 m height, 10.5–13 m length, ~3–4 m depth.
- **Modification:** same `KENNEY_TINT` re-tint map as the other Kenney models (`dirt` → `0x6b6258` grey-brown; the native dirt is orange-brown). Procedural dodecahedron-slab fallback stands if the GLB fails to load.

### 8. Kenney Car Kit 3.1 — traffic cars + wheel — REUSED from the main prototype (integration pass)
- **Files (NOT duplicated — the sibling's copies in `~/workspace/games/assets/rad/kenney/`):** `sedan-sports.glb` (177,676 bytes, md5 `532f420ec60afae0cc89787b8cc9d6f8`), `sedan.glb` (172,216 bytes, md5 `5fc2f2353fb3b0963e069f8fa4ef7622`), `suv.glb` (207,572 bytes, md5 `11f3c8144d2cb19b77ba48bf8c8efd6d`), `wheel-default.glb` (26,820 bytes, md5 `44b8a28c9978c6086442b6c9e33e4a4a`), `Textures/colormap.png` (12,371 bytes, md5 `451b163d51d08b73f7d98244fef3f979`)
- **Source / licence / poly counts:** see the full entries in `round-2-asset-register-rad.md` (CC0 1.0, verified Nov 15, 2026 by the Rad rebuild agent — sedan-sports 2,088 tris, sedan 2,032 tris, SUV 2,474 tris, wheel 332 tris). Not duplicated here; this register cross-references that one.
- **Attribution:** not required (CC0).
- **Verification date:** 2026-11-15 (sizes + md5s re-verified on disk by the integration pass; licences per the Rad register)
- **Use:** `activateKenneyCars` replaces the procedural traffic-car bodies/wheels when all four GLBs + the colormap load (all-or-nothing + silent procedural fallback). Bodies rescaled to the existing variant footprints; the Kenney texture carries paint/glass/trim, so the procedural glass/dark/trim/rim instances are hidden. Loads via `loadGLBFrom(RAD_ASSET_BASES, …)`.
- **Modification:** none (geometry rescaled/rotated at load time only; the files are untouched).

## Staged assets (verified, on disk, NOT yet wired)

None remaining — the cliff GLB (the only staged asset) was wired by the integration pass on 2026-11-15 (see wired entry 7 above).

## Gaps flagged (no licensed asset found in scope — never substituted)

| Need | Status |
|---|---|
| Licensed free cockpit / hero-car GLB | Not found in scope. The sibling agent owns the vehicle/cockpit rebuild (procedural cockpit in the main prototype); no unlicensed model was used. |
| Dedicated sand texture (Coastal beach) | Not acquired — the beach is a vertex-colour ground band. A Poly Haven sand texture would be a cheap follow-up. |
| Water normal / foam texture | Not acquired — the ocean is a flat PBR plane with a per-location colour. |
| Castle asset (Mountain reference image 02) | Not reproduced. No licensed castle GLB was sourced in scope; the mountain read comes from elevation + pines + snow palettes. |
| Asphalt roughness / normal maps | Not acquired — the wet look is roughness/envMap only. Poly Haven ships `asphalt_02` roughness/normal maps; wiring them is a follow-up (the sibling's gap list notes the same). |
| Tunnel interior light fixtures (modelled) | Not acquired — ceiling lights are instanced emissive planes, which read correctly at speed. |

## Loader behaviour (all wired assets)

- Dual-base fallback: deployed layout (`assets/rad-expansion/...`, `assets/rad/...`) first, then workspace layout (`../assets/rad-expansion/...`, `../assets/rad/...`).
- Every failure falls back silently to the procedural build — the game always plays.
- Status is shown on the pause menu: `ASSETS OK` / `ASSETS LOADING` / `ASSETS FALLBACK` (with the failed job names in `assetLoadStatus` for debugging).
- 11 load jobs (3 nature GLBs + 1 cliff GLB + 3 car GLBs + 1 wheel GLB + rock + concrete + asphalt textures). Kenney cars are all-or-nothing (all four GLBs + colormap, or procedural cars); nature/cliff/textures activate independently.
- Total wired download weight: ~2.93 MB (11 files). All Quest 2-appropriate (low-poly GLBs, 1K textures).
