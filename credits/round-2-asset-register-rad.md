# Round 2 Asset Register — Rad VR

Per-asset record for the Rad Round 2 rebuild (Nov 15, 2026). Every asset in the
prototype is CC0 (no attribution required); sources are recorded anyway. Assets
are staged in both `~/workspace/games/assets/rad/` (canonical) and
`~/workspace/games/rad-vr-prototype/assets/rad/` (prototype copy); the loader
tries `assets/rad/` (deployed layout) then `../assets/rad/` (workspace layout).
All loads are progressive enhancement with silent procedural fallback — the game
always plays if an asset fails to load.

## In use

### 1. Kenney Car Kit 3.1 — `sedan-sports.glb` (traffic variant 0, supercar slot)

- **Source URL:** https://kenney.nl/media/pages/assets/car-kit/1a312ec241-1775131960/kenney_car-kit.zip
  (asset page: https://kenney.nl/assets/car-kit)
- **Licence:** CC0 1.0 (Public Domain) — verified in-zip `License.txt`, Nov 15, 2026.
- **Attribution required:** No (CC0). Credit: Kenney (https://kenney.nl).
- **Verification date:** 2026-11-15 (downloaded, unzipped, GLB JSON chunk parsed).
- **File size:** 177,676 bytes (173 KB).
- **Poly count:** 2,088 tris total (body 712 tris, 4 wheels 332 tris each, spoiler 48 tris).
- **md5:** `532f420ec60afae0cc89787b8cc9d6f8`
- **Notes:** Front is +Z (rotated 180° about Y in-game; game front is −Z). Body
  centred in X/Z, base at y=0, bbox 1.3 × 0.95 × 2.55 m. Single material,
  `doubleSided`, metallicFactor 0. Texture is EXTERNAL (`Textures/colormap.png`).
  Rescaled in-game to the variant footprint (len 4.4, wid 1.80, roof 1.10).

### 2. Kenney Car Kit 3.1 — `sedan.glb` (traffic variant 1, sedan slot)

- **Source URL:** same zip as above (https://kenney.nl/assets/car-kit)
- **Licence:** CC0 1.0 — verified in-zip `License.txt`, Nov 15, 2026.
- **Attribution required:** No (CC0). Credit: Kenney.
- **Verification date:** 2026-11-15 (GLB JSON chunk parsed).
- **File size:** 172,216 bytes (168 KB).
- **Poly count:** 2,032 tris total (body 704 tris, 4 wheels 332 tris each).
- **md5:** `5fc2f2353fb3b0963e069f8fa4ef7622`
- **Notes:** Front +Z. Body bbox 1.5 × 1.15 × 2.55 m. Rescaled in-game to
  len 4.6, wid 1.82, roof 1.36.

### 3. Kenney Car Kit 3.1 — `suv.glb` (traffic variant 2, SUV slot)

- **Source URL:** same zip as above (https://kenney.nl/assets/car-kit)
- **Licence:** CC0 1.0 — verified in-zip `License.txt`, Nov 15, 2026.
- **Attribution required:** No (CC0). Credit: Kenney.
- **Verification date:** 2026-11-15 (GLB JSON chunk parsed).
- **File size:** 207,572 bytes (202 KB).
- **Poly count:** 2,474 tris total (body 814 tris, 4 wheels 332 tris each,
  + a spare wheel-back mesh that is NOT used in-game).
- **md5:** `11f3c8144d2cb19b77ba48bf8c8efd6d`
- **Notes:** Front +Z. Body bbox 1.5 × 1.1 × 2.55 m. Rescaled in-game to
  len 4.7, wid 1.92, roof 1.64.

### 4. Kenney Car Kit 3.1 — `wheel-default.glb` (traffic wheels, all variants)

- **Source URL:** same zip as above (https://kenney.nl/assets/car-kit)
- **Licence:** CC0 1.0 — verified in-zip `License.txt`, Nov 15, 2026.
- **Attribution required:** No (CC0). Credit: Kenney.
- **Verification date:** 2026-11-15 (GLB JSON chunk parsed).
- **File size:** 26,820 bytes (26 KB).
- **Poly count:** 332 tris.
- **md5:** `44b8a28c9978c6086442b6c9e33e4a4a`
- **Notes:** Symmetric and centred (bbox X [−0.2, 0.2], Y/Z ±0.3). Normalised
  in-game to unit radius, 0.24 m width, then scaled per variant wheel radius.

### 5. Kenney Car Kit 3.1 — `Textures/colormap.png` (shared car palette texture)

- **Source URL:** same zip as above (https://kenney.nl/assets/car-kit)
- **Licence:** CC0 1.0 — verified in-zip `License.txt`, Nov 15, 2026.
- **Attribution required:** No (CC0). Credit: Kenney.
- **Verification date:** 2026-11-15.
- **File size:** 12,371 bytes (12 KB). 512 × 512 px palette PNG.
- **Poly count:** n/a (texture).
- **md5:** `451b163d51d08b73f7d98244fef3f979`
- **Notes:** Required by all four GLBs above (external `uri` reference). Must
  sit at `kenney/Textures/colormap.png` relative to the GLBs — staged that way
  in both locations.

### 6. Poly Haven — `asphalt_02_diff_1k.jpg` (road surface, diffuse)

- **Source URL:** https://polyhaven.com/a/asphalt_02
  (downloaded via the Poly Haven API, `asphalt_02_diff_1k.jpg`)
- **Licence:** CC0 1.0 (Poly Haven licence) — verified Nov 15, 2026.
- **Attribution required:** No (CC0).
- **Verification date:** 2026-11-15. **The file's md5 matches the Poly Haven
  API's published md5 exactly.**
- **File size:** 731,707 bytes (716 KB). 1024 × 1024 px.
- **Poly count:** n/a (texture).
- **md5:** `fa19772d4817754c3efab708c651f5a8`
- **Notes:** Diffuse only — the Poly Haven API returned empty 1k entries for
  the roughness and normal maps, so those were not downloaded. The wet look is
  driven by material roughness + envMapIntensity instead. Repeat (5, 3.33)
  ≈ 3 m tiles, anisotropy 4.

## Rejected / blocked (investigated, not used)

| Candidate | Reason |
|---|---|
| Khronos glTF Sample Assets — Buggy | Download URL 404s. |
| Khronos glTF Sample Assets — CarConcept | CC BY 4.0, 11.7 MB — too heavy for Quest 2 traffic use. |
| Khronos glTF Sample Assets — ToyCar | Toy proportions; wrong object for a realistic racer. |
| Poly Pizza | API requires a key (401 "You need an API key"). |
| Sketchfab / Fab (e.g. Generic Sedan Car, CC BY, 18.2k tris; MMC Works, 113.2k tris) | Requires a logged-in account to download. Option for a follow-up if Danny downloads one. |
| Quaternius Cars Bundle | CC0 but stylised/untextured; download path blocked. |
| Poly Haven asphalt_02 roughness/normal 1k | API returned empty entries; unavailable. |

## Gaps (flagged — never silently substituted)

1. **Cockpit/interior:** no licensed free cockpit/interior GLTF was found in any
   searched library. The Round 2 cockpit (console, paddles, stitching, header
   band, gauges) is procedural. This is a recorded gap, not a silent substitute.
2. **Hero car:** no higher-detail hero car was adopted (see CarConcept / Sketchfab
   above). Kenney cars are the traffic fleet; the player's own car is the cockpit
   + hood, which are procedural.
3. **Asphalt PBR maps:** roughness/normal unavailable (see #6 above).

## Licence copies on disk

- `~/workspace/games/assets/rad/kenney/LICENSE-kenney-car-kit.txt` (and the
  prototype copy) — the Kenney CC0 licence text from the zip.
- `~/workspace/games/assets/rad/kenney-car-kit.zip` — the full downloaded kit
  (4,814,237 bytes), kept for reference; only the 5 files above are referenced
  by the game.
