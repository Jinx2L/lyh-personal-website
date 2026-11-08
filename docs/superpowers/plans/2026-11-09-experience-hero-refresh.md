# EXPERIENCE and Hero Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update two EXPERIENCE descriptions and alignment, then replace the Hero background with a browser-compatible 4K video without changing other presentation behavior.

**Architecture:** Keep the existing React component structure and data model. Adjust only portfolio data and the desktop timeline grid; transcode the supplied HEVC MOV into the existing Hero MP4 asset path so no component behavior changes.

**Tech Stack:** React, TypeScript, CSS Grid, Vite, Vitest, ffmpeg

**Spec:** `docs/superpowers/specs/2026-11-09-experience-hero-refresh-design.md`

## Global Constraints

- Preserve all modules, copy, motion, colors and assets outside the requested changes.
- Preserve the uploaded video's 3840 × 2154 dimensions and prioritize visual quality.
- Keep Hero autoplay, muted and loop behavior unchanged.

## Review Focus

- Long Chinese descriptions remain readable without overlapping the date column.
- Tablet and mobile timeline breakpoints retain their current column behavior.
- The replacement MP4 is H.264, 3840 × 2154 and fast-start enabled.
- Hero references the existing asset path and does not change overlay or animation markup.
- No macOS ZIP metadata is copied into production assets.

---

### Task 1: EXPERIENCE copy and alignment

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `src/index.css`
- Test: `src/components/Experience/ExperienceTimeline.test.tsx`

- [ ] Update the test to assert the exact 九章开物 and 马上消费 descriptions and the aligned timeline class.
- [ ] Run the focused test and verify it fails against the previous copy.
- [ ] Replace only the two requested descriptions and rebalance the desktop grid columns so the description begins further left.
- [ ] Run the focused test and verify it passes.

### Task 2: Hero video replacement

**Files:**
- Replace: `public/assets/hero-background.mp4`
- Verify: `src/components/Hero/Hero.test.tsx`

- [ ] Extract only `1109_1.mov` from the uploaded archive.
- [ ] Encode H.264 MP4 at 3840 × 2154 using high-quality settings and fast-start, without audio.
- [ ] Compare codec, dimensions, duration and file size with the source; inspect representative frames for visible degradation.
- [ ] Confirm Hero continues to reference `/assets/hero-background.mp4` with autoplay, muted and loop behavior.

### Task 3: Full verification and delivery

**Files:**
- Replace: packaged project ZIP

- [ ] Run the complete Vitest suite.
- [ ] Run the Vite production build.
- [ ] Check the ZIP archive integrity and confirm no temporary source video or macOS metadata is included.
- [ ] Publish the updated project archive.
