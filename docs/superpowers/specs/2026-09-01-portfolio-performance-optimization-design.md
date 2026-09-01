# Portfolio Performance Optimization Design

## Scope

Optimize the existing React/Vite portfolio without changing its visual design, copy, project ordering, animation timing, or image dimensions. The work covers media size, route loading boundaries, animation/listener lifecycle, first-screen loading, and removal of proven unused files.

## Baseline

- `public/assets`: approximately 28 MB.
- Production JavaScript: approximately 479 KB raw / 163 KB gzip.
- Hero video: 3.55 MB, H.264 High, 1572×1080, 30 fps, 7.57 seconds.
- Three referenced long project boards total approximately 13.31 MB before optimization.
- Membership hero PNGs total approximately 2.62 MB.
- Project preview videos already use `preload="none"` and range from 0.24–1.50 MB.
- No WebGL implementation exists. The ambient effect uses video and CSS layers.
- GSAP animations use `gsap.context`, one-shot ScrollTriggers, IntersectionObserver gating, and cleanup.

## Resource Optimization

The hero video will keep its original resolution, frame rate, duration, and H.264/browser compatibility. A slow high-quality encode with fast-start metadata will replace it only when the candidate is smaller and visual-quality checks pass.

The academic, membership, and Chongbai long boards will retain 1920 px width and their complete height. They will be re-encoded as high-quality progressive JPEGs. Candidates must preserve dimensions, remain visually equivalent under objective comparison, and reduce file size before replacement.

The three membership hero PNGs will be tested as lossless WebP. They will switch format only if alpha, dimensions, and visual output remain exact while size decreases materially. Otherwise the current PNGs remain.

Project hover videos remain unchanged because they are already small and deferred with `preload="none"`.

## Loading Architecture

The current app statically imports the home page and all four detail pages. It will be split into lazy-loaded route-level modules so each path downloads only the page tree and CSS it needs. A minimal loading fallback will inherit the black page background and will not introduce visible layout or copy changes.

The hero video remains the main above-the-fold visual and keeps autoplay behavior. Its poster stays available as the immediate fallback.

## Event and Animation Lifecycle

GSAP timelines, ScrollTrigger behavior, cursor motion, IntersectionObserver gating, and animation durations remain unchanged because their cleanup is already correct.

`ScrollVelocity` will use ResizeObserver when supported and register `window.resize` only as a fallback, removing duplicate width-update work.

No WebGL code will be added or removed because none exists.

## Removal

Delete only files proven unused by direct and generated-path reference checks:

- `public/assets/auto-case-study.jpg`, superseded by `auto-case-study-ui-07.jpg`.
- `src/components/CaseStudy/ChongbaiCaseStudy.css`, no longer imported.

Template-generated membership, Chongbai, auto, and academic illustration paths are explicitly retained.

## Verification

- Add regression coverage for lazy route boundaries, media attributes, and the ResizeObserver fallback.
- Run the existing full Vitest suite and production TypeScript/Vite build.
- Verify all media dimensions, video duration/frame rate/codec, and candidate quality metrics.
- Compare before/after asset totals and generated chunk sizes.
- Validate the final ZIP and confirm removed files are absent while every referenced asset is present.

## Non-goals

- No redesign, copy edit, animation timing change, new visual effect, or layout change.
- No image downscaling or long-board cropping.
- No change to project preview playback behavior.
