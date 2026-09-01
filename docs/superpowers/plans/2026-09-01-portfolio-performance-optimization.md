# Portfolio Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce first-screen and total transfer cost while preserving the portfolio's pixels, copy, behavior, and animation timing.

**Architecture:** Split the SPA at route-level boundaries, keep the existing shared motion controller, and optimize media through candidate-first quality gates. Remove only files proven unreachable by both literal and generated asset references.

**Tech Stack:** React, TypeScript, Vite, Vitest, GSAP, Motion, ffmpeg, ImageMagick

**Spec:** `docs/superpowers/specs/2026-09-01-portfolio-performance-optimization-design.md`

## Global Constraints

- Preserve all visual design, copy, project ordering, animation timing, media dimensions, and long-board content.
- Keep the hero video H.264-compatible, 1572×1080, 30 fps, and 7.57 seconds.
- Replace a media file only when the candidate is smaller and passes objective quality checks.
- Do not remove template-generated illustration assets.
- Do not change project hover video playback behavior.

---

### Task 1: Route-Level Loading Boundaries

**Files:**
- Create: `src/components/HomePage.tsx`
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: default `HomePage` component and lazy page imports consumed by `App`.
- Preserves: current pathname-to-page mapping and `main` motion root.

- [x] Add a failing source-level test that asserts `App.tsx` uses `lazy(() => import(...))` for `HomePage` and all four case pages.
- [x] Run `npm test -- --run src/App.test.tsx` and verify the static-import implementation fails.
- [x] Move the six home sections into `HomePage.tsx`; convert route components to React lazy imports with a minimal black-background Suspense fallback.
- [x] Re-run the focused test and verify it passes.
- [x] Run `npm run build` and record generated route chunks and gzip sizes.

### Task 2: Resize Listener Deduplication

**Files:**
- Modify: `src/components/Contact/ScrollVelocity.tsx`
- Test: `src/components/Contact/Contact.test.tsx`

**Interfaces:**
- Preserves: `useElementWidth(ref): number` behavior.
- Changes: `window.resize` is registered only when `ResizeObserver` is unavailable.

- [x] Add a failing test with a ResizeObserver spy asserting no window resize listener is added when the observer exists.
- [x] Run the focused Contact test and verify failure.
- [x] Branch the effect: observe the element and disconnect when ResizeObserver exists; otherwise add/remove `window.resize`.
- [x] Re-run the focused test and verify it passes.

### Task 3: Media Candidate Quality Gates

**Files:**
- Modify: `public/assets/hero-background.mp4`
- Modify: `public/assets/academic-case-study.jpg`
- Modify: `public/assets/membership-case-study.jpg`
- Modify: `public/assets/chongbai-case-study.jpg`
- Conditionally modify: membership hero assets and their config references

**Interfaces:**
- Preserves: every public URL unless lossless WebP candidates materially reduce size.
- Produces: optimized media with unchanged dimensions and video timing/frame rate.

- [x] Record source byte sizes, dimensions, JPEG quality, video codec, frame rate, and duration.
- [x] Encode the hero candidate with H.264 slow preset, CRF 23, yuv420p, no audio, and `+faststart`; compare VMAF/SSIM or PSNR and replace only if quality and size gates pass.
- [x] Encode long-board candidates as stripped progressive JPEG quality 94 with 4:4:4 sampling; require unchanged dimensions and PSNR above 45 dB before replacement.
- [x] Encode membership PNG candidates as lossless WebP; require exact dimensions and alpha preservation, then update config/tests only if total size drops materially.
- [x] Run focused case-study, Hero, and Works tests.

### Task 4: Remove Proven Dead Files

**Files:**
- Delete: `public/assets/auto-case-study.jpg`
- Delete: `src/components/CaseStudy/ChongbaiCaseStudy.css`
- Test: `src/App.test.tsx`

**Interfaces:**
- Preserves: current auto board URL `/assets/auto-case-study-ui-07.jpg`.

- [x] Add a failing audit assertion that the removed filenames do not occur in production source.
- [x] Reconfirm literal and generated path references for every retained asset.
- [x] Delete the two proven dead files.
- [x] Run the focused test and production build.

### Task 5: Full Verification and Packaging

**Files:**
- Modify: `docs/superpowers/plans/2026-09-01-portfolio-performance-optimization.md`
- Replace: `/workspace/scratch/0c54f7730be2/portfolio-v3-unified-case-study-assets.zip`

**Interfaces:**
- Produces: verified project ZIP and before/after performance summary.

- [x] Run `npm test -- --run` and require zero failures.
- [x] Run `npm run build` and require successful TypeScript/Vite output.
- [x] Compare `public/assets` total, hero media bytes, long-board total, and entry/chunk gzip sizes against the baseline.
- [x] Verify every source asset reference resolves and removed files are absent.
- [x] Rebuild the ZIP with node_modules, dist, and tsbuildinfo excluded; run `unzip -t`.
- [x] Mark completed checkboxes and save the verified ZIP as the next version of the existing deliverable.

## Verified Results

- Full suite: 43 tests passed across 10 files.
- Public assets: 28,333,038 bytes to 21,057,783 bytes, down 7,275,255 bytes (25.7%).
- Hero video: 3,545,190 bytes to 1,553,538 bytes, down 56.2%; H.264, 1572×1080, 30 fps, and 7.5667 seconds preserved; SSIM 0.9902.
- Three optimized long boards: 13,308,400 bytes to 11,609,644 bytes, down 12.8%; dimensions preserved; PSNR 49.7–51.7 dB.
- Membership hero images: 2,620,928 bytes to 1,766,316 bytes, down 32.6%; lossless WebP pixel difference 0.
- Entry JavaScript: 478.96 KB / 163.01 KB gzip to 313.50 KB / 107.62 KB gzip. Home content is now a 153.54 KB / 51.87 KB gzip on-demand chunk; detail pages do not download it.
- TypeScript/Vite production build passed and every production asset reference resolved.
