# Portfolio Performance Follow-up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce invisible runtime work and oversized membership hero media while preserving the portfolio's current appearance and interactions.

**Architecture:** Keep the existing React component and GSAP structure. Add visibility ownership at the component that owns each continuous loop, remove the project-media scale that conflicts with complete display, and optimize only media whose delivered pixels substantially exceed their rendered need.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, GSAP/ScrollTrigger, Motion, FFmpeg, WebP tools.

**Spec:** `docs/superpowers/specs/2026-09-01-portfolio-performance-followup-design.md`

## Global Constraints

- Do not change typography, spacing, copy, route structure, card layout, or animation timing.
- Keep the hero video at 1572 × 1080 and preserve autoplay, muted, loop, poster, and immediate first-screen loading.
- Keep all long project boards at 1920 pixels wide and lazily loaded.
- Accept image output only when it decodes successfully, is materially smaller, and preserves UI/text clarity.
- Keep reduced-motion, compact viewport, pointer capability, and ResizeObserver fallbacks.
- Do not delete an asset until literal and template-generated references have both been checked.
- This extracted workspace has no Git metadata; replace commit steps with explicit verification checkpoints.

---

### Task 1: Hero Video Visibility Ownership

**Files:**
- Modify: `src/components/Hero/AmbientBackground.tsx`
- Modify: `src/components/Hero/Hero.test.tsx`

**Interfaces:**
- Consumes: browser `IntersectionObserver`, `document.visibilityState`, and `HTMLVideoElement.play/pause`.
- Produces: a hero video that plays only when both the hero is intersecting and the document is visible.

- [ ] **Step 1: Write the failing visibility test**

Extend the test IntersectionObserver utility so a test can deliver an entry. Render `AmbientBackground`, spy on `play` and `pause`, deliver `isIntersecting: false`, then `true`, and dispatch `visibilitychange`. Assert off-screen/hidden states pause and visible state resumes.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
./node_modules/.bin/vitest --run src/components/Hero/Hero.test.tsx
```

Expected: failure because `AmbientBackground` currently has no visibility observer or playback controller.

- [ ] **Step 3: Implement the minimal controller**

Use a `videoRef`, an effect-local `intersecting` boolean, and one `syncPlayback` function:

```ts
const shouldPlay = intersecting && document.visibilityState !== 'hidden'
if (shouldPlay) void video.play().catch(() => {})
else video.pause()
```

Observe the video with `rootMargin: '100px'`, listen for `visibilitychange`, and disconnect/remove the listener during cleanup.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run the Task 1 command and require all Hero tests to pass without unhandled promise warnings.

- [ ] **Step 5: Record the checkpoint**

Run `rg -n "IntersectionObserver|visibilitychange|removeEventListener" src/components/Hero/AmbientBackground.tsx` and confirm registration and cleanup are paired.

---

### Task 2: Contact Animation Frames Only While Visible

**Files:**
- Modify: `src/components/Contact/ScrollVelocity.tsx`
- Modify: `src/components/Contact/Contact.test.tsx`

**Interfaces:**
- Consumes: `baseX`, `velocityFactor`, `copyWidth`, `inView`, `reducedMotion`, and document visibility.
- Produces: one cancellable RAF loop per visible row and no RAF callback while the row is off screen or the document is hidden.

- [ ] **Step 1: Write the failing scheduling test**

Mock `requestAnimationFrame` and `cancelAnimationFrame`, deliver an off-screen IntersectionObserver state, and assert no new frame is scheduled. Deliver an in-view state and assert one frame is scheduled. Unmount and assert the active frame is cancelled.

- [ ] **Step 2: Run the focused test and verify RED**

```bash
./node_modules/.bin/vitest --run src/components/Contact/Contact.test.tsx
```

Expected: failure because Motion's `useAnimationFrame` subscription exists for the component lifetime.

- [ ] **Step 3: Replace the continuous hook with a controlled effect**

Remove `useAnimationFrame` from the Motion import. Add an effect whose dependencies are `inView`, `copyWidth`, and `reducedMotion`. Start an RAF only when all gates pass; calculate delta from the previous timestamp, update `baseX`, then schedule the next frame. Cancel on cleanup. Add a `visibilitychange` listener that cancels while hidden and restarts when visible.

- [ ] **Step 4: Preserve motion math**

Keep the existing direction and scroll-velocity calculation exactly:

```ts
let moveBy = direction.current * baseVelocity * (delta / 1000)
const factor = velocityFactor.get()
if (factor < 0) direction.current = -1
else if (factor > 0) direction.current = 1
moveBy += direction.current * moveBy * factor
baseX.set(baseX.get() + moveBy)
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run the Task 2 command and require listener cleanup, ResizeObserver fallback, and Contact rendering tests to remain green.

---

### Task 3: Complete Project Media During GSAP Parallax

**Files:**
- Modify: `src/motion/portfolioMotion.ts`
- Modify: `src/motion/portfolioMotion.test.tsx`

**Interfaces:**
- Consumes: existing `.project-shot` elements and desktop-only ScrollTrigger parallax.
- Produces: vertical `yPercent: -3 → 3` parallax with scale fixed at `1`.

- [ ] **Step 1: Write the failing no-scale regression test**

Mount portfolio motion around a project card and assert `Number(gsap.getProperty(media, 'scale'))` equals `1` after initialization, while a scrub ScrollTrigger still exists for the card.

- [ ] **Step 2: Run the focused test and verify RED**

```bash
./node_modules/.bin/vitest --run src/motion/portfolioMotion.test.tsx
```

Expected: failure because the current initial and target scale are `1.08`.

- [ ] **Step 3: Remove only project-media scaling**

Change the desktop project parallax to:

```ts
gsap.fromTo(media, { yPercent: -3 }, {
  yPercent: 3,
  ease: 'none',
  scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
})
```

Do not change reveal timelines or card hover transforms.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run the Task 3 command and confirm ScrollTrigger cleanup tests still pass.

---

### Task 4: Membership Hero Image Optimization

**Files:**
- Replace: `public/assets/membership-hero-illustration-1.webp`
- Replace: `public/assets/membership-hero-illustration-2.webp`
- Replace: `public/assets/membership-hero-illustration-3.webp`

**Interfaces:**
- Consumes: the existing asset paths referenced dynamically by `MembershipCaseStudy.tsx`.
- Produces: visually equivalent, smaller WebP images using the same filenames and supported browser format.

- [ ] **Step 1: Record source evidence**

Capture dimensions and bytes with:

```bash
for f in public/assets/membership-hero-illustration-*.webp; do
  identify -format '%f %wx%h %b\n' "$f"
done
```

- [ ] **Step 2: Generate candidates outside production paths**

Create high-quality lossy WebP candidates at original resolution first. Use quality around 88–92, method 6, metadata stripped. If a candidate remains disproportionately large, test a 760-pixel-wide version while preserving aspect ratio.

- [ ] **Step 3: Compare quality and inspect pixels**

Decode every candidate. Compare same-size candidates with SSIM and require at least 0.99. For reduced-resolution candidates, render at the intended CSS size and visually inspect UI text, edges, gradients, and contrast before acceptance.

- [ ] **Step 4: Replace only accepted candidates**

Copy accepted candidates to the existing three paths. Do not change `MembershipCaseStudy.tsx` or its tests because the public interface stays stable.

- [ ] **Step 5: Verify reduction**

Re-run the source evidence command, calculate total before/after bytes, and decode all three files successfully.

---

### Task 5: Dead Code and Asset Audit

**Files:**
- Modify only files proven unused by the checks below.
- Test: `src/App.test.tsx` when an asset is removed.

**Interfaces:**
- Consumes: TypeScript compiler diagnostics, Vite module graph, literal asset references, and template-generated case-study paths.
- Produces: no unreferenced shipped resource or unreachable local helper while preserving every dynamic asset.

- [ ] **Step 1: Run unused-symbol analysis without build mode**

```bash
./node_modules/.bin/tsc --noEmit --noUnusedLocals --noUnusedParameters \
  --target ES2020 --module ESNext --moduleResolution Bundler --jsx react-jsx \
  --lib ES2020,DOM,DOM.Iterable --types vitest/globals --skipLibCheck \
  $(rg --files src -g '*.ts' -g '*.tsx')
```

Review every diagnostic; remove only application symbols that are genuinely unreachable, not test types or framework-required parameters.

- [ ] **Step 2: Reconcile the asset inventory**

For every `public/assets` file, check literal references and the four template patterns for academic, chongbai, membership, and auto hero illustrations. Treat a template match as a live reference.

- [ ] **Step 3: Add a failing deletion guard before any asset removal**

If an asset is proven unused, add it to the existing superseded-asset test in `src/App.test.tsx`, verify the test fails while the file exists, then delete that exact file and re-run to green.

- [ ] **Step 4: Verify imports and listeners**

Run `rg` over `addEventListener`, `IntersectionObserver`, `ResizeObserver`, and RAF creation. Confirm every persistent registration has cleanup and that no duplicate listener was introduced.

---

### Task 6: Full Verification and Delivery

**Files:**
- Verify all modified source, media, and tests.
- Create: `/workspace/scratch/0c54f7730be2/portfolio-v3-performance-followup.zip`

**Interfaces:**
- Consumes: completed Tasks 1–5.
- Produces: a validated complete source archive.

- [ ] **Step 1: Run all tests**

```bash
./node_modules/.bin/vitest --run
```

Expected: zero failed tests.

- [ ] **Step 2: Run TypeScript and production build**

```bash
./node_modules/.bin/tsc -b
./node_modules/.bin/vite build
```

Expected: both commands exit 0.

- [ ] **Step 3: Verify production media and bundle inventory**

Confirm the hero and project videos decode, all referenced images exist, the three membership images decode, and `dist/assets` contains no superseded resource.

- [ ] **Step 4: Package the complete project**

Create the archive while excluding `node_modules`, `dist`, and `.git`. Run `unzip -t` and require no archive errors.

- [ ] **Step 5: Report measured outcomes**

Report before/after membership bytes, total public-asset bytes, runtime changes, tests, build status, deleted files/code, and the archive link. Do not claim a deletion if no safe unused candidate was found.
