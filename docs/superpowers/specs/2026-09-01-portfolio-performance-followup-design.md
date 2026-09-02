# Portfolio Performance Follow-up Design

## Goal

Reduce off-screen CPU/GPU work and avoid oversized first-view media without changing the portfolio's layout, copy, visual hierarchy, or interaction language. Image and video resolution may be reduced only when the rendered result remains visually clear at the site's largest intended display size.

## Current Evidence

- `public/assets` totals 21,046,302 bytes.
- The home hero video is 1,553,538 bytes and its poster is 58,206 bytes.
- The three membership hero illustrations total 1,766,316 bytes at 822 × 684 each. Their lossless WebP encoding is disproportionate to their display size.
- Four long case-study boards total about 13.2 MB, but each route loads only its own board and the board image already uses native lazy loading.
- There is no WebGL context or canvas renderer. The dynamic background is a video plus CSS gradients and transforms.
- The hero video keeps decoding when the hero is off screen.
- Contact uses two `useAnimationFrame` subscriptions. Each callback returns early while off screen, but the frame callbacks still run for the lifetime of the mounted page.
- GSAP and ScrollTrigger are scoped through `gsap.context`, `gsap.matchMedia`, and cleanup functions. Reveal triggers are one-shot. Four project parallax triggers remain active by design.
- Project video parallax still applies `scale: 1.08`, which can crop media even though the component now uses `object-fit: contain`.
- Static reference analysis found no unused public assets after accounting for the case-study assets generated through template-string paths.

## Selected Approach

Use a balanced, visibility-driven optimization. Preserve the current loading sequence and animation character while stopping work that cannot affect visible pixels.

### Media

1. Re-encode the three membership hero illustrations as high-quality lossy WebP.
2. Test the original 822 × 684 resolution first. Reduce resolution only if the displayed result remains clear at two device pixels per CSS pixel.
3. Accept an optimized image only when:
   - it is materially smaller than the source;
   - it decodes successfully;
   - SSIM is at least 0.99 against the source at the delivered resolution, or visual inspection shows no meaningful UI/text degradation when a resolution reduction makes direct SSIM unsuitable.
4. Keep the 1920-pixel-wide long project boards unchanged. They support large desktop display and direct full-image viewing and are already lazily loaded.
5. Keep the 1.55 MB hero video resolution and encoding unchanged. It is already optimized and fills the desktop hero.

### Hero Runtime

Add visibility control to the hero video:

- play while the hero intersects the viewport and the document is visible;
- pause when the hero leaves the viewport or the document becomes hidden;
- resume when it becomes visible again;
- preserve autoplay, muted, loop, poster, and immediate first-screen loading;
- disconnect observers and listeners on unmount.

### Contact Runtime

Replace the always-subscribed `useAnimationFrame` callbacks with a controllable animation-frame effect:

- start a frame loop only when a row is in view, has a measured width, motion is allowed, and the document is visible;
- cancel the frame when any of those conditions becomes false;
- restart from the existing motion value without a visible jump;
- preserve scroll-velocity direction and speed response.

### GSAP and Project Media

- Preserve all reveal timing, one-shot ScrollTriggers, compact-mode behavior, and cleanup.
- Keep the project vertical parallax but remove `scale: 1.08` from its initial and target states.
- This prevents scroll-time cropping and removes unnecessary compositing work while retaining motion.

### WebGL and CSS Backgrounds

- Do not add WebGL.
- Keep the existing CSS aurora and orb animations.
- Retain their IntersectionObserver-based pause behavior and reduced-motion handling.

### Dead Code and Asset Cleanup

- Run TypeScript unused-local/unused-parameter analysis in non-build mode.
- Trace every candidate asset through literal references and template-generated case-study paths before deletion.
- Remove only files, imports, listeners, helpers, or branches proven unreachable or unreferenced.
- Do not remove fallback code used when ResizeObserver, reduced motion, or pointer capabilities differ.

## Testing and Verification

Add regression coverage for:

- hero video pausing and resuming on visibility changes;
- observer/listener cleanup on unmount;
- Contact frame scheduling stopping while off screen;
- project parallax no longer scaling media;
- all dynamically named case-study assets remaining present;
- no deleted asset appearing in the production build.

Final verification must include:

- red/green regression test cycle;
- image decode, dimensions, byte totals, and quality comparison;
- all Vitest tests;
- TypeScript build;
- Vite production build;
- production asset inventory and archive integrity check.

## Non-goals

- No visual redesign.
- No typography, spacing, copy, route, or card layout changes.
- No delayed hero-video source mounting.
- No removal of GSAP, Motion, cursor glow, CSS aurora, or project hover playback.
- No downscaling of long project boards.
