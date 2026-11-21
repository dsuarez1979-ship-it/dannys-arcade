# Round 3 Asset Register — Dead Hollow (addendum)

**Date:** 2026-11-15 (session 4315024f)
**Scope:** new assets downloaded for the Round 3 visual pass on the Dead Hollow prototype only.
**Source:** Poly Haven (polyhaven.com), no-key API — the same source the Round 2 photo textures came from.
**License:** CC0 (public domain) for every file below. No attribution required; no account was created; $0 spent.
**Location:** `~/workspace/games/assets/dead-hollow/` (alongside the existing Round 2 assets).
**Loading:** via the single `ASSET_BASE = 'assets/dead-hollow/'` base path (the file has no dual-base-path pattern — see the build note).

## New files (14)

Seven PBR textures, roughness + normal map each. All are 1024×1024. Sizes and md5s verified against the Poly Haven API metadata at download time; re-verified 2026-11-16 01:00 UTC after the edits.

| File | Size (bytes) | md5 | Poly Haven API key |
|---|---|---|---|
| tex-asphalt_02-rough-1k.jpg | 544,032 | ec80a2929797c1b3ffc121c4f665585a | `Rough` |
| tex-asphalt_02-normal-1k.jpg | 1,240,122 | 338da8de636ea36133170578cac82e8e | `nor_gl` |
| tex-concrete-rough-1k.jpg | 215,714 | 2e491629157a6d2a2c915d2b2753798c | `Rough` |
| tex-concrete-normal-1k.jpg | 114,447 | 17d4bd534e153db3ff469fdfc4484355 | `nor_gl` |
| tex-concrete_pavement_03-rough-1k.jpg | 227,809 | 5717742054eb658673277f5999a09a37 | `Rough` |
| tex-concrete_pavement_03-normal-1k.jpg | 1,017,387 | 87a68a3d2bf1131749ce6fe87670e580 | `nor_gl` |
| tex-dark_brick_wall-rough-1k.jpg | 342,901 | 8c08e7ffd512440ee076c1f7fd506561 | `Rough` |
| tex-dark_brick_wall-normal-1k.jpg | 1,327,208 | 656efc89b0c03084add1042cb77362ac | `nor_gl` |
| tex-dark_planks-rough-1k.jpg | 122,596 | f731e0e0ac9544c74fa000497c19b674 | `Rough` |
| tex-dark_planks-normal-1k.jpg | 409,238 | 38bbe50031892895c0c30b0b09c8f291 | `nor_gl` |
| tex-dirt-rough-1k.jpg | 253,549 | d936d6760ce0f899b131d30626d52ce9 | `Rough` |
| tex-dirt-normal-1k.jpg | 1,202,783 | 362610edf09fd31735958eecec823a84 | `nor_gl` |
| tex-grass_ground-rough-1k.jpg | 328,190 | 2e6afca246cf6b80bdb53f46fe7e5ce5 | `Rough` |
| tex-grass_ground-normal-1k.jpg | 1,310,516 | d518c5b2af6f2c0297bc807b351f511f | `nor_gl` |

**Total: 14 files, 8,656,492 bytes (~8.3 MB).**

## Notes

- The normal maps use the Poly Haven API key `nor_gl`, NOT `Normal` — the `Normal` key does not exist for these textures; downloading with the wrong key returns an error page, not an image. (Verified during the investigation.)
- Roughness and normal maps are DATA maps: they are loaded with no sRGB colorspace (unlike the color maps, which use sRGB). The `upgradePBR` helper enforces this.
- The asphalt sizes (544,032 / 1,240,122) match the investigation's verified values.
- No other new assets were downloaded. The grime-skirt texture (P1-G4) and the blob-shadow texture (P0-M8) are canvas-generated at runtime, not files. No Sketchfab or account-gated source was used (owner decision).
- Where each map is used: asphalt → roads; grass_ground → grass; concrete_pavement_03 → main + cross sidewalks and (color-only) plaza; dirt → dirt paths; dark_brick_wall → brick walls; concrete → concrete walls; dark_planks → siding walls (and color-only dock + boarded windows). See the build note for the full P0-M5 wiring.
