# Portfolio Performance Audit and Optimization Design

## Goal

Audit and optimize the portfolio's media, continuous motion, scroll work, GSAP usage, first-screen loading, and unused assets/code without reducing visible quality or changing the approved visual design.

## Scope

The work covers:

- image and video size, encoding, dimensions, and loading behavior;
- confirmation that no WebGL or canvas background is present;
- scroll, resize, visibility, pointer, and observer lifecycles;
- GSAP/ScrollTrigger creation, cleanup, and GPU-heavy transforms;
- the home-page first-screen critical path and production bundle;
- unused TypeScript, styles, dependencies, and public assets.

It does not redesign layouts, copy, typography, colors, card proportions, or animation direction.

## Baseline

- `public/assets` is approximately 20.1 MB.
- Four 1920-pixel-wide case-study boards account for approximately 13.8 MB.
- Five MP4 files account for approximately 4.1 MB.
- The largest selected-work video is `project-academic.mp4` at 1444 × 1080 and approximately 1.5 MB.
- No WebGL, canvas renderer, Three.js, Pixi, or OGL implementation is present.
- Hero video playback, CONTACT RAF animation, decorative card sweeps, and CSS ambient loops already use visibility-aware controls.
- Case-study boards are route-specific and lazy-loaded.
- Auto case-study hero illustrations are referenced through generated paths and must not be classified as unused by literal filename scanning alone.

## Media Optimization Rules

### Case-study boards

- Keep the approved 1920-pixel width.
- Generate progressive JPEG candidates after metadata removal.
- Compare decoded pixels at equal dimensions.
- Replace a source only when the candidate is materially smaller and SSIM is at least 0.99.
- If the quality threshold or meaningful size reduction is not met, retain the original.

### Other images

- Preserve dimensions for hero illustrations, portrait, and posters unless the rendered maximum proves the source is materially oversized.
- Lossless optimization may be used whenever it reduces size.
- Do not recompress already-small assets solely to produce a changed file.
- Membership WebP illustrations remain unchanged if lossless re-encoding yields no saving or lossy re-encoding misses the quality threshold.

### Video

- Keep `hero-background.mp4` at its current dimensions and loading priority unless a same-size encoding produces a clear saving without quality loss.
- Test `project-academic.mp4` at 1080 pixels wide using H.264 with `faststart`; compare frames and keep the candidate only if clarity remains suitable for the 80%-width 4:3 card.
- Preserve the smaller selected-work videos unless a conservative re-encode is demonstrably better.
- Retain H.264 MP4 compatibility, posters, hover looping, and last-frame behavior.

## Motion and Listener Rules

- Do not introduce WebGL.
- Confirm every listener, observer, RAF loop, GSAP context, and ScrollTrigger has deterministic cleanup.
- Keep Hero video paused offscreen and while the document is hidden.
- Keep CONTACT RAF work limited to visible content and active documents.
- Keep BorderGlow sweeps finite, cancellable, visibility-aware, and disabled for reduced motion.
- Keep route-level GSAP work scoped to `gsap.context()` and reverted on unmount.
- Do not remove approved motion unless profiling identifies unnecessary continuous work; prefer pausing it outside the viewport.

## First-screen Loading

- Preserve immediate Hero background playback and poster fallback.
- Keep noncritical home images lazy and asynchronously decoded.
- Keep selected-work videos at `preload="none"`.
- Keep case-study routes code-split.
- Inspect the production bundle and avoid increasing the initial JS/CSS payload.
- Do not trade first-frame clarity or the approved opening animation for a synthetic score improvement.

## Unused Resource and Code Removal

- Run TypeScript with unused local and parameter checks.
- Build a resource reference inventory that understands generated filename patterns.
- Verify route configuration, CSS URLs, tests, and dynamic asset paths before deletion.
- Remove only assets, imports, styles, components, dependencies, or branches with affirmative proof that they are unused.
- If no safe deletion candidate exists, report that result instead of deleting speculative candidates.

## Verification

The completed work must pass:

- media decode and dimension checks;
- before/after byte-size reporting for every replaced asset;
- SSIM or equivalent objective comparison for lossy image replacements;
- focused regression tests for changed loading or lifecycle behavior;
- the complete Vitest suite;
- TypeScript build and unused-symbol checks;
- Vite production build;
- public asset existence/reference checks;
- macOS-compatible ZIP CRC and extraction checks.

## Deliverable

Provide one complete source archive. The user-facing archive must remain separate from any persistence/upload staging copy so the download path cannot be modified during saving.
