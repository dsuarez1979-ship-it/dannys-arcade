# Round 2 Asset Register — Dead Hollow VR

**Verification date:** 2026-11-15 (all assets). **Location:** `~/workspace/games/assets/dead-hollow/` (7.1 MB total).
**Licenses:** Poly Pizza models are **CC BY 3.0** (attribution required — credited in the game's menu and below). Poly Haven textures are **CC0**. No unlicensed assets. No real vehicle brands (see Rejected).

Attribution line shown in the game menu: "3D models: Poly Pizza contributors — Quaternius, Kay Lousberg, J-Toastie, dook, CreativeTrio, Poly by Google (CC BY 3.0). Textures: Poly Haven (CC0)."

## Adopted — vehicles (Poly Pizza, CC BY 3.0)

| File | Model / author | Source URL | Size | Tris | Meshes / prims | Notes |
|---|---|---|---|---|---|---|
| `car-van.glb` | Van / Poly by Google | https://poly.pizza/m/aT_24cDaW1a | 44,152 B | 1,946 | 1 / 1 | 1 atlas texture. Front +Z. Spot 4. |
| `car-hatchback.glb` | Car Hatchback / Kay Lousberg | https://poly.pizza/m/BG0KAhmGDt | 82,232 B | 1,194 | 5 / 5 | 1 atlas texture. Front +Z. Spot 3. |
| `car-broken.glb` | Broken Car (Debris_BrokenCar) / Quaternius | https://poly.pizza/m/Y67erogmR9 | 211,012 B | 5,432 | 1 / 4 | 4 mats (Rust/Rust2/Grey/Black). Rusted shell, open interior, no glass. Front +Z (poster-inferred). Spot 5, tilted/sunk, keeps own paint. |
| `car-pickup.glb` | Pickup Truck / Quaternius | https://poly.pizza/m/qn4grQgHm8 | 273,012 B | 6,432 | 4 / 6 | 3 mats (Atlas/Headlights/BrakeLight). Front +Z. Spots 0, 6. |
| `car-suv.glb` | SUV / Quaternius | https://poly.pizza/m/xsMtZhBkxL | 181,608 B | 3,294 | 4 / 12 | 6 mats (White/Windows/Black/Grey/Headlights/TailLights). Front +Z. Spots 2, 7. |
| `car-sedan.glb` | Red Car / J-Toastie | https://poly.pizza/m/dVLJ5CjB0h | 109,504 B | 1,688 | 5 / 12 | 12 unnamed mats. Front **−Z** (verified: front wheels z=−0.63). Spot 1. |

Poly counts from GLB JSON inspection (index accessors). All posters viewed and judged Nov 15. All are low-poly stylized, not photorealistic (see gaps in the build notes).

## Adopted — weapons (Poly Pizza, CC BY 3.0)

| File | Model / author | Source URL | Size | Tris | Meshes / prims | Notes |
|---|---|---|---|---|---|---|
| `weapon-pistol.glb` | 9mm Pistol (9mmBeretta) / Quaternius | https://poly.pizza/m/BoZWhFdsj4 | 133,928 B | 2,992 | 4 / 7 | Barrel along X, muzzle −X. Len 0.24 m. |
| `weapon-shotgun.glb` | Shotgun / Quaternius | https://poly.pizza/m/ZmPTnh7njL | 55,352 B | 978 | 1 / 4 | Barrel along X, muzzle +X. Len 0.95 m. |
| `weapon-rifle.glb` | Rifle (lever-action, brass receiver) / CreativeTrio | https://poly.pizza/m/zBATGslN2h | 88,176 B | 700 | 1 / 1 | Length along Z, muzzle −Z, lies flat. Len 1.05 m. |
| `weapon-sniper.glb` | Sniper Rifle / J-Toastie | https://poly.pizza/m/vGAzj2Of5M | 321,048 B | 4,963 | 11 / 22 | Barrel along X, muzzle +X. Len 1.15 m. Heaviest weapon (22 prims). |
| `weapon-katana.glb` | Katana / dook | https://poly.pizza/m/zV3WXbyjMf | 26,360 B | 332 | 1 / 1 | Blade along +Y. Len 0.95 m. |
| `weapon-axe.glb` | Axe (red fire axe) / Quaternius | https://poly.pizza/m/W0UYZPYSXf | 16,196 B | 236 | 1 / 3 | Handle along +Y, silver edge −X. Len 0.75 m. |
| `weapon-machete.glb` | Machete / CreativeTrio | https://poly.pizza/m/SMBU5kBYtZ | 49,996 B | 198 | 1 / 1 | Length along Z, tip −Z, lies flat. Len 0.62 m. Edge up/down unverified (accepted). |
| `weapon-knife.glb` | Knife (survival knife) / Quaternius | https://poly.pizza/m/N9bfPFP1hr | 28,692 B | 450 | 1 / 4 | Blade along +Y. Len 0.40 m. |

Orientation verified offline per model (node/vertex analysis); see `WEAPON_GLTF` in the prototype for the fitted rotations/grips.

## Adopted — character + streetlight (Poly Pizza, CC BY 3.0)

| File | Model / author | Source URL | Size | Tris | Meshes / prims | Notes |
|---|---|---|---|---|---|---|
| `zombie.glb` | Animated Zombie / Quaternius | https://poly.pizza/m/jkrEvQZb8J | 694,500 B | 2,116 | 1 mesh, 1 skin, 1 tex | 5 animations: ZombieBite, ZombieCrawl, ZombieIdle, ZombieRun, ZombieWalk. Faces +Z (verified: toes point +Z). Fitted to 1.9 m. |
| `streetlamp.glb` | Streetlight / Kay Lousberg | https://poly.pizza/m/vPFSLYh6sg | 29,148 B | 176 | 1 / 1 | Cobra-head, arm extends −X. 0.96 units tall → scale 4.58 for a 4.4 m pole. |

## Adopted — textures (Poly Haven, CC0)

| File | Slug | Source URL | Size | Notes |
|---|---|---|---|---|
| `tex-asphalt_02-1k.jpg` | asphalt_02 | https://polyhaven.com/a/asphalt_02 | 731,707 B | Roads. |
| `tex-dark_brick_wall-1k.jpg` | dark_brick_wall | https://polyhaven.com/a/dark_brick_wall | 917,619 B | Brick walls (diner/gas). |
| `tex-concrete-1k.jpg` | concrete | https://polyhaven.com/a/concrete | 543,902 B | Concrete walls. |
| `tex-concrete_pavement_03-1k.jpg` | concrete_pavement_03 | https://polyhaven.com/a/concrete_pavement_03 | 830,452 B | Sidewalks + plaza. |
| `tex-grass_ground-1k.jpg` | grass_ground | https://polyhaven.com/a/grass_ground | 876,584 B | Ground grass. |
| `tex-dirt-1k.jpg` | dirt | https://polyhaven.com/a/dirt | 730,425 B | Dirt paths. |
| `tex-dark_planks-1k.jpg` | dark_planks | https://polyhaven.com/a/dark_planks | 379,047 B | Dock, boarded windows, siding (verified by viewing: horizontal weathered lap siding). |

All downloaded via the Poly Haven API (`https://api.polyhaven.com/files/<slug>`, 1k JPG); byte sizes match the API exactly. Color maps only (no roughness/normal maps downloaded).

## Rejected (with reasons — do not re-adopt without a new decision)

| Model / author | Source | Reason |
|---|---|---|
| "CAR Model" (Lamborghini Aventador) / Ignition Labs | Poly Pizza | Branded vehicle — no real brands/badges/logos rule. 10,252 tris, 1.8 MB. |
| Toyota Hilux 97 / Muhammad Reyhan | Poly Pizza | Branded. |
| Mazda RX-7, Camaro, Dodge Charger, Range Rover | Poly Pizza | Branded (skipped, not downloaded). |
| "80s Car" / Nick Ladd | Poly Pizza | 51 meshes / 54 prims per car — draw-call cost. |
| Pine Tree / Danni Bittman | Poly Pizza | Bright teal cone Christmas-tree shape — too cartoonish, wrong color for night horror. |
| Pine Trees cluster / Quaternius | Poly Pizza | Merged cluster (3,666 tris) can't be split per tree; 75 instances = 275k tris. |
| Zombie / bachosoftdesign | Poly Pizza | 2.1 MB, 13 anims — size; the Quaternius zombie is better. |
| Kenney Car Kit | Kenney (CC0) | Download endpoint 403 via curl (needs a browser session). Not used; Poly Pizza covered the need. Kept as a fallback source. |
| Quaternius packs (direct) | quaternius.com (CC0) | Downloads are Google Drive folders — not used directly; Quaternius models obtained via Poly Pizza instead (where they are CC BY 3.0, not CC0). |
| Sketchfab CC models | Sketchfab | Not pursued — needs an account/API token. Best future source for a photorealistic car. |

## License notes

- Poly Pizza models are **CC BY 3.0** (verified on model page HTML: "Creative Commons Attribution" linking https://creativecommons.org/licenses/by/3.0/), NOT CC0. Attribution is required and is given in the game's menu credits line + this register.
- Poly Haven textures are **CC0** (no attribution required; credited anyway in the menu line).
- The Quaternius site links the CC0 deed for its packs, but the same models via Poly Pizza are CC BY 3.0 — the Poly Pizza license governs the files actually used.
- No asset was modified except at runtime (material tinting/roughness in code); no model files were edited.
