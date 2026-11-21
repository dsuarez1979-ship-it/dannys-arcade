## 10. Licenses / credits

Every licensed asset in the register is CC0. The register itself is
`docs/star-strike-2.0/asset-strategy-2.0.md` (69 rows: 31 Phase 4 + 38 Blender) and
`prototype/asset-register-tests.js` re-verifies every row against disk (228 checks, all passing).
**Nothing is presented as cleared unless a licence file or a cited catalogue page says so.**

| Asset group | Source | Licence | Evidence |
|---|---|---|---|
| Kenney Space Kit (150 files) | kenney.nl/assets/space-kit (2020) | **CC0** | `License.txt` inside `kenney_space-kit.zip`, read by the packager: "License: (Creative Commons Zero, CC0) … free to use in personal, educational and commercial projects." |
| Kenney Space Station Kit (90 files) | kenney.nl/assets/space-station-kit (2024) | **CC0** | `License.txt` inside `kenney_space-station-kit.zip`, read by the packager (same CC0 text). |
| Quaternius Ultimate Spaceships (May 2021, 10–11 hulls) | quaternius.com/packs/ultimatespaceships.html; OpenGameArt mirror opengameart.org/content/lowpoly-spaceships-pack | **CC0 (see caveat)** | ⚠️ The zip carries **NO licence file inside** (verified by the packager — no License/README in the archive). CC0 is evidenced by the Quaternius pack page, the Patreon announcement ("Free for everyone to use in any project, even commercially! (CC0)"), the OpenGameArt mirror page badge, and the Godot Asset Library entry (CC0, 2023-02-19). The asset-strategy doc flags the greywrought caveat: "Quaternius's general license changed, and individual page, store, or archive terms may differ" — so the in-archive licence file is the authority for the files actually used, and there is none. **Treat the Quaternius CC0 as externally evidenced, not in-pack proven.** The 5 converted GLBs in `downloaded-unwired/` inherit this status. |
| Quaternius Ultimate Space Kit enemies (Enemy Small / Flying / Large) | Poly Pizza model pages (/m/4LjT020LQh, /m/kzpT6fNmM5, …) | **CC0 1.0** | Per-model Poly Pizza licence badge "CC0 1.0", creator Quaternius (recorded in `downloaded-unwired/README.md`). Held unwired. |
| Poly Haven textures (`metal_plate`, `metal_plate_02`, `blue_metal_plate`, `metal_grate_rusty`, 1K JPGs) | polyhaven.com (API-verified live 2026-11-15/16) | **CC0** | Poly Haven licence + live API catalogue; per-file md5s recorded in the asset-strategy doc §2.6. No attribution required; the register provides the "Source: Poly Haven" credit. |
| Blender-built assets (38 GLBs + 31 `.blend` masters, cockpit, weapons rig, motherships) | Built in-house for Danny's Arcade (Blender 5.3.0) | **Original work** | No third-party licence applies. Hull/window textures in `arcade-assets/star-strike/textures/` were painted for these builds. |
| three.js r160 | unpkg / threejs.org | MIT | `vendor/three/LICENSE` included. |

**Unresolved / flagged:** (1) Quaternius zip has no in-pack licence file — see caveat above.
(2) Nothing else is unresolved: every other licensed file has its licence file or catalogue
record cited above, and the asset-register tests assert every register row is CC0/CC0 1.0.
