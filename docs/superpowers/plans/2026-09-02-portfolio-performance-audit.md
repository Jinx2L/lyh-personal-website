# Portfolio Performance Audit and Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce safe media and runtime cost, prove listener and animation cleanup, and remove only affirmatively unused resources without changing the approved portfolio design.

**Architecture:** Treat every optimization as a measured candidate rather than an unconditional rewrite. Media replacements pass byte-size and objective quality gates; runtime changes require a failing lifecycle regression test; deletion requires a dynamic-aware reference inventory and a clean production build.

**Tech Stack:** React, TypeScript, Vite, Vitest, GSAP/ScrollTrigger, Motion, ffmpeg/ffprobe, shell asset inspection.

**Spec:** `docs/superpowers/specs/2026-09-02-portfolio-performance-audit-design.md`

## Global Constraints

- Do not change approved layout, copy, typography, colors, card proportions, or animation direction.
- Keep the four case-study boards at 1920 pixels wide.
- Replace a lossy image only when it is materially smaller and SSIM is at least 0.99.
- Preserve H.264 MP4 compatibility, posters, hover looping, and last-frame behavior.
- Do not introduce WebGL or canvas rendering.
- Delete only resources and code with affirmative proof that they are unused, including generated-path checks.
- Keep the user-facing ZIP separate from any persistence/upload staging copy.
- This workspace has no Git repository; execute the verification steps but omit commit commands.

---

### Task 1: Capture a Reproducible Performance Baseline

**Files:**
- Create: `docs/performance/2026-09-02-baseline.md`
- Inspect: `public/assets/*`
- Inspect: `src/**/*.{ts,tsx,css}`

**Interfaces:**
- Consumes: Current production source and assets.
- Produces: A baseline table used by Tasks 2–5, with filename, bytes, codec, dimensions, duration, and reference status.

- [ ] **Step 1: Record the current verification baseline**

Run:

```bash
./node_modules/.bin/vitest --run
./node_modules/.bin/tsc -b
./node_modules/.bin/vite build
```

Expected: all tests pass, TypeScript exits 0, and Vite prints production gzip sizes.

- [ ] **Step 2: Inventory media bytes and decoded properties**

Run:

```bash
find public/assets -maxdepth 1 -type f -printf '%f\t%s\n' | sort -k2,2nr
for file in public/assets/*.{jpg,webp,mp4}; do
  [ -e "$file" ] || continue
  ffprobe -v error -select_streams v:0 \
    -show_entries stream=codec_name,width,height,r_frame_rate,duration \
    -of csv=p=0 "$file"
done
```

Expected: every media file decodes and the four case-study boards report width 1920.

- [ ] **Step 3: Inventory runtime work**

Run:

```bash
rg -n "addEventListener|requestAnimationFrame|IntersectionObserver|ResizeObserver|ScrollTrigger|useScroll|useInView|<video|preload=|loading=" src --glob '!**/*.test.*'
rg -n "WebGL|webgl|getContext\(|<canvas|three|pixi|ogl" src public package.json
```

Expected: the first command lists all lifecycle sites; the second returns no production WebGL/canvas implementation.

- [ ] **Step 4: Write the baseline report**

Use `apply_patch` to create `docs/performance/2026-09-02-baseline.md` with these exact sections:

```markdown
# Performance Baseline — 2026-09-02

## Production build
## Media inventory
## Runtime lifecycle inventory
## WebGL status
## Candidate optimizations
```

Populate every section with measured output, not estimates.

---

### Task 2: Evaluate and Apply Safe Image Optimizations

**Files:**
- Candidate inputs: `public/assets/academic-case-study.jpg`
- Candidate inputs: `public/assets/auto-case-study-ui-07.jpg`
- Candidate inputs: `public/assets/chongbai-case-study.jpg`
- Candidate inputs: `public/assets/membership-case-study.jpg`
- Candidate inputs: `public/assets/membership-hero-illustration-{1,2,3}.webp`
- Modify only candidates that pass the gate above.
- Modify: `docs/performance/2026-09-02-baseline.md`

**Interfaces:**
- Consumes: Baseline sizes and the SSIM ≥ 0.99 rule.
- Produces: Accepted production image files plus a before/after/SSIM table; rejected candidates remain under `/tmp` and are not shipped.

- [ ] **Step 1: Generate progressive JPEG candidates outside the project**

Run for each case-study board:

```bash
mkdir -p /tmp/portfolio-image-candidates
ffmpeg -y -loglevel error -i public/assets/academic-case-study.jpg \
  -c:v mjpeg -q:v 2 -pix_fmt yuvj420p \
  /tmp/portfolio-image-candidates/academic-case-study.jpg
```

Repeat with the other three basenames. Do not resize; verify each candidate remains 1920 pixels wide.

- [ ] **Step 2: Measure each JPEG candidate**

Run per basename:

```bash
stat -c '%n %s' public/assets/academic-case-study.jpg \
  /tmp/portfolio-image-candidates/academic-case-study.jpg
ffmpeg -i public/assets/academic-case-study.jpg \
  -i /tmp/portfolio-image-candidates/academic-case-study.jpg \
  -lavfi ssim -f null - 2>&1 | rg 'All:' | tail -1
```

Expected: keep only candidates that are smaller and report `All:` at least 0.99.

- [ ] **Step 3: Test membership WebP lossless re-encoding**

Run for indexes 1–3:

```bash
ffmpeg -y -loglevel error \
  -i public/assets/membership-hero-illustration-1.webp \
  -c:v libwebp -lossless 1 -compression_level 6 \
  /tmp/portfolio-image-candidates/membership-hero-illustration-1.webp
```

Expected: replace only if decoded dimensions are 822 × 684 and bytes are lower. Do not use a lossy candidate below SSIM 0.99.

- [ ] **Step 4: Replace only accepted image candidates**

Use `apply_patch` for text manifests if paths change. For same-path binary replacements, copy only the individually accepted candidates to the exact existing production basename.

- [ ] **Step 5: Decode and document accepted images**

Run:

```bash
for file in public/assets/*-case-study*.jpg public/assets/membership-hero-illustration-*.webp; do
  ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height \
    -of default=noprint_wrappers=1 "$file"
done
```

Append a table to the baseline report with `file | before bytes | after bytes | dimensions | SSIM | decision`.

---

### Task 3: Evaluate the Selected-Works Video Candidate

**Files:**
- Candidate input: `public/assets/project-academic.mp4`
- Modify only if accepted: `public/assets/project-academic.mp4`
- Modify only if a frame changes materially: `public/assets/project-academic-poster.jpg`
- Test: `src/components/Works/SelectedWorks.test.tsx`
- Modify: `docs/performance/2026-09-02-baseline.md`

**Interfaces:**
- Consumes: Existing 4:3 `object-fit: contain`, hover loop, and mouse-leave last-frame behavior.
- Produces: An optional 1080-pixel-wide H.264 `faststart` file with unchanged UI behavior.

- [ ] **Step 1: Confirm the behavior test protects video semantics**

In `src/components/Works/SelectedWorks.test.tsx`, ensure tests assert:

```tsx
expect(video).toHaveAttribute('preload', 'none')
expect(video).toHaveAttribute('loop')
expect(video.style.objectFit).toBe('contain')
```

Also retain the existing mouse-leave assertion that pauses near the final frame.

- [ ] **Step 2: Generate a conservative video candidate**

Run:

```bash
mkdir -p /tmp/portfolio-video-candidates
ffmpeg -y -i public/assets/project-academic.mp4 \
  -vf "scale=1080:-2:flags=lanczos" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -movflags +faststart -an \
  /tmp/portfolio-video-candidates/project-academic.mp4
```

- [ ] **Step 3: Compare properties, bytes, and representative frames**

Run:

```bash
ffprobe -v error -show_entries format=size,duration \
  -show_entries stream=codec_name,width,height,r_frame_rate \
  -of default=noprint_wrappers=1 \
  /tmp/portfolio-video-candidates/project-academic.mp4
stat -c '%n %s' public/assets/project-academic.mp4 \
  /tmp/portfolio-video-candidates/project-academic.mp4
ffmpeg -y -loglevel error -ss 2.5 -i public/assets/project-academic.mp4 \
  -frames:v 1 /tmp/portfolio-video-candidates/original.png
ffmpeg -y -loglevel error -ss 2.5 \
  -i /tmp/portfolio-video-candidates/project-academic.mp4 \
  -frames:v 1 /tmp/portfolio-video-candidates/candidate.png
```

Inspect both frame files at original detail. Accept only if the candidate is smaller and UI text remains clearly legible at the rendered card size.

- [ ] **Step 4: Replace the accepted candidate or retain the original**

If accepted, copy the candidate to `public/assets/project-academic.mp4`. Otherwise leave production unchanged. Do not re-encode the other four videos unless their baseline reveals a concrete regression.

- [ ] **Step 5: Run the Selected Works tests and record the decision**

Run:

```bash
./node_modules/.bin/vitest --run src/components/Works/SelectedWorks.test.tsx
```

Expected: all Selected Works behavior tests pass. Append video before/after bytes, codec, dimensions, and decision to the baseline report.

---

### Task 4: Verify and Repair Animation and Listener Lifecycles

**Files:**
- Inspect/modify if a failure is proven: `src/components/Hero/AmbientBackground.tsx`
- Inspect/modify if a failure is proven: `src/components/Contact/ScrollVelocity.tsx`
- Inspect/modify if a failure is proven: `src/components/Expertise/BorderGlow.tsx`
- Inspect/modify if a failure is proven: `src/components/common/CursorGlow.tsx`
- Inspect/modify if a failure is proven: `src/motion/portfolioMotion.ts`
- Test: corresponding existing `*.test.tsx` files.

**Interfaces:**
- Consumes: Existing visibility, reduced-motion, cleanup, and route-scope behavior.
- Produces: Regression evidence that no continuous loop or listener survives offscreen/unmount; code changes only for a reproduced failure.

- [ ] **Step 1: Map every lifecycle pair**

Create a table in the baseline report with columns:

```markdown
| owner | setup | pause condition | cleanup | test coverage | result |
```

Include Hero video, CONTACT RAF, BorderGlow RAF/timeouts, CursorGlow listeners/GSAP quickTo, ScrollTrigger context, marquee hover listeners, IntersectionObserver, and ResizeObserver.

- [ ] **Step 2: Run focused lifecycle tests**

Run:

```bash
./node_modules/.bin/vitest --run \
  src/components/Hero/Hero.test.tsx \
  src/components/Contact/Contact.test.tsx \
  src/components/Expertise/Expertise.test.tsx \
  src/motion/portfolioMotion.test.tsx
```

Expected: tests prove offscreen pause and cleanup. If they pass and source/setup pairs match, do not change production code.

- [ ] **Step 3: For any uncovered defect, write one failing regression test**

Examples of acceptable real-behavior assertions:

```tsx
unmount()
expect(cancelAnimationFrame).toHaveBeenCalledWith(activeFrame)
expect(observer.disconnect).toHaveBeenCalled()
expect(removeEventListener).toHaveBeenCalledWith('visibilitychange', handler)
```

Run the exact focused test and verify it fails for the missing cleanup, not for test setup.

- [ ] **Step 4: Implement only the minimal lifecycle fix**

Add the missing cancellation, disconnect, pause, or listener removal in the owning component. Do not alter animation geometry, timing, colors, or direction.

- [ ] **Step 5: Re-run focused tests**

Run the command from Step 2. Expected: all focused lifecycle tests pass without warnings.

---

### Task 5: Audit First-Screen Loading and Remove Proven Dead Weight

**Files:**
- Inspect/modify if proven: `src/App.tsx`
- Inspect/modify if proven: `src/components/Hero/AmbientBackground.tsx`
- Inspect/modify if proven: `src/components/Works/ProjectCard.tsx`
- Inspect/modify if proven: `src/**/*`
- Inspect/modify if proven: `public/assets/*`
- Inspect/modify if proven: `package.json`
- Modify: `docs/performance/2026-09-02-baseline.md`

**Interfaces:**
- Consumes: Dynamic-aware reference inventory and production build output.
- Produces: A clean tree with unchanged initial experience and no affirmatively unused shipped bytes.

- [ ] **Step 1: Verify first-screen loading contracts**

Confirm source contains:

```tsx
// Hero
autoPlay muted loop playsInline preload="auto"

// Selected Works
preload="none"

// Noncritical images
loading="lazy" decoding="async"
```

Confirm `App.tsx` uses route-level lazy imports for home and case-study pages. If all contracts exist, preserve them.

- [ ] **Step 2: Run strict TypeScript unused checks**

Run:

```bash
./node_modules/.bin/tsc -p tsconfig.json --noUnusedLocals --noUnusedParameters
```

Expected: exit 0. Remove only symbols reported by TypeScript, then rerun until clean.

- [ ] **Step 3: Build a dynamic-aware asset reference inventory**

For every `public/assets` basename, check literal references and then inspect generated patterns such as:

```ts
`/assets/auto-hero-illustration-${index}.jpg`
`/assets/academic-hero-illustration-${index}.jpg`
`/assets/membership-hero-illustration-${index}.webp`
```

Classify an asset as removable only when it has no literal reference, no matching generated pattern, no CSS URL, and no route/test expectation.

- [ ] **Step 4: Check dependency use**

Run:

```bash
for package in gsap lucide-react motion react react-dom; do
  printf '%s\t' "$package"
  rg -l "from ['\"]$package|from ['\"]$package/" src | wc -l
done
```

Remove a dependency only if it has zero source imports and the production build passes afterward.

- [ ] **Step 5: Delete only proven unused files or code**

Use `apply_patch` for source/config deletion. For a confirmed binary asset, remove that exact explicit path only after recording the evidence in the baseline report. Do not use recursive deletion, globs, or unresolved variables.

- [ ] **Step 6: Rebuild and compare initial payload**

Run:

```bash
./node_modules/.bin/vite build
```

Record before/after initial `index` and `HomePage` JS/CSS gzip sizes. Expected: no increase outside normal hash variation.

---

### Task 6: Final Verification and macOS-Compatible Delivery

**Files:**
- Modify: `docs/performance/2026-09-02-baseline.md`
- Create: `/workspace/scratch/0c54f7730be2/portfolio-v3-performance-audit-optimized-macos.zip`
- Create staging copy: `/workspace/scratch/0c54f7730be2/portfolio-v3-performance-audit-optimized-upload.zip`

**Interfaces:**
- Consumes: All accepted media, runtime, and cleanup changes.
- Produces: Verified report and complete source archive.

- [ ] **Step 1: Run fresh full verification**

Run:

```bash
./node_modules/.bin/vitest --run
./node_modules/.bin/tsc -b
./node_modules/.bin/tsc -p tsconfig.json --noUnusedLocals --noUnusedParameters
./node_modules/.bin/vite build
```

Expected: zero failed tests and all commands exit 0.

- [ ] **Step 2: Verify every shipped media file decodes**

Run:

```bash
for file in public/assets/*.{jpg,webp,mp4}; do
  [ -e "$file" ] || continue
  ffprobe -v error -select_streams v:0 \
    -show_entries stream=codec_name,width,height \
    -of default=noprint_wrappers=1 "$file"
done
```

Expected: every asset returns a codec and nonzero dimensions.

- [ ] **Step 3: Finish the report**

Add final sections:

```markdown
## Applied changes
## Rejected candidates
## Deleted resources and evidence
## Final verification
```

State explicitly when no safe deletion or replacement was available.

- [ ] **Step 4: Create and validate the user-facing ZIP**

Run:

```bash
archive=/workspace/scratch/0c54f7730be2/portfolio-v3-performance-audit-optimized-macos.zip
zip -r -X -9 "$archive" . -x 'node_modules/*' 'dist/*' '.git/*'
unzip -t "$archive"
zipinfo -t "$archive"
sha256sum "$archive"
```

Expected: CRC and central-directory checks pass.

- [ ] **Step 5: Preserve the download archive during saving**

Run:

```bash
cp /workspace/scratch/0c54f7730be2/portfolio-v3-performance-audit-optimized-macos.zip \
  /workspace/scratch/0c54f7730be2/portfolio-v3-performance-audit-optimized-upload.zip
```

Use only the `-upload.zip` copy for persistence. Afterward, re-run `sha256sum` and `unzip -t` on the user-facing `-macos.zip` path before sharing it.
