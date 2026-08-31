# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable PC-first personal portfolio for a Visual Designer / UI Designer with an original dark editorial hero, résumé-based experience, four selected projects, expertise cards, and a full-screen contact ending.

**Architecture:** A Vite + React + TypeScript single-page app. Content lives in typed data modules while each page section is a focused component. CSS/Tailwind and Framer Motion handle layout and motion; the hero ambient visual is CSS/DOM-based so no WebGL dependency is required.

**Tech Stack:** React 18+, Vite, TypeScript, Tailwind CSS 3, Framer Motion, lucide-react, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-08-26-portfolio-site-design.md`

## Global Constraints

- Professional identity: Visual Designer / UI Designer.
- Experience label: 9+ years.
- Selected projects, in order: 会员管理系统、重百云购小程序、混天绫数字营销系统、汽贸（企微）小程序.
- Do not invent unsupported metrics or case-study details for 会员管理系统 or 汽贸（企微）小程序.
- PC-first content width is approximately 1700px at 1920px viewport width.
- Visual direction is Dark Editorial × Digital Product: dark, restrained, premium, lightly technological, not template-like.
- Hero uses an original abstract animated background, not Prisma media.
- Prefer transform/opacity animation and honor `prefers-reduced-motion`.
- Keep project/person imagery behind replaceable asset interfaces.

---

## File Structure

- `package.json` — scripts and dependencies.
- `vite.config.ts`, `tsconfig*.json`, `tailwind.config.js`, `postcss.config.js` — build/tooling.
- `src/main.tsx` — React bootstrap.
- `src/App.tsx` — section composition only.
- `src/index.css` — tokens, global layout, noise texture, responsive helpers.
- `src/data/portfolio.ts` — typed résumé/project/expertise/contact content.
- `src/types/portfolio.ts` — shared content interfaces.
- `src/components/common/SectionLabel.tsx` — numbered section heading primitive.
- `src/components/common/RevealText.tsx` — reusable in-view text entrance.
- `src/components/HeaderNav.tsx` — anchor navigation.
- `src/components/Hero/AmbientBackground.tsx` — original animated hero visual.
- `src/components/Hero/Hero.tsx` — hero composition and CTA.
- `src/components/About/About.tsx` — editorial introduction and image placeholder.
- `src/components/About/MetricGrid.tsx` — 9+ and other supported/structural metrics.
- `src/components/Experience/ExperienceTimeline.tsx` — résumé timeline.
- `src/components/Works/ProjectCard.tsx` — reusable large project card.
- `src/components/Works/SelectedWorks.tsx` — four-project layout.
- `src/components/Expertise/ExpertiseCard.tsx` and `Expertise.tsx` — capability cards.
- `src/components/Contact/Contact.tsx` — full-screen ending.
- `src/test/setup.ts`, `src/**/*.test.tsx` — behavior/content tests.

---

### Task 1: Runnable Vite shell and content model

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.js`, `postcss.config.js`
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/types/portfolio.ts`, `src/data/portfolio.ts`, `src/test/setup.ts`, `src/App.test.tsx`

**Interfaces:**
- Produces: `projects: Project[]`, `experiences: Experience[]`, `expertise: ExpertiseItem[]`, `contact: ContactInfo`.
- Produces: section ids `about`, `experience`, `works`, `expertise`, `contact`.

- [ ] **Step 1: Write a failing smoke/content test** that renders `App` and expects `PORTFOLIO`, `9+`, and the four exact selected-project names.
- [ ] **Step 2: Run `npm test -- --run`** and verify failure because the app/content model does not exist yet.
- [ ] **Step 3: Scaffold Vite/Tailwind/Vitest and implement typed data** with the confirmed four projects; mark unsupported project descriptions as neutral placeholders rather than invented claims.
- [ ] **Step 4: Add minimal `App` markup** that consumes the data so the smoke test passes.
- [ ] **Step 5: Run `npm test -- --run && npm run build`** and expect both to pass.
- [ ] **Step 6: Commit** with `feat: scaffold portfolio app and content model`.

### Task 2: Global visual system, navigation, and Hero

**Files:**
- Create: `src/components/HeaderNav.tsx`, `src/components/Hero/AmbientBackground.tsx`, `src/components/Hero/Hero.tsx`, `src/components/common/RevealText.tsx`
- Modify: `src/App.tsx`, `src/index.css`
- Test: `src/components/Hero/Hero.test.tsx`

**Interfaces:**
- Consumes: section ids from Task 1.
- Produces: `<Hero />`, `<HeaderNav />`, `<RevealText />`.

- [ ] **Step 1: Write failing Hero tests** for the role copy `Visual Designer / UI Designer`, Chinese value proposition, contact anchor, and all five nav anchors.
- [ ] **Step 2: Run the Hero test** and verify it fails before the components exist.
- [ ] **Step 3: Implement global tokens and the ~1700px container** using `min(1700px, calc(100vw - ...))`, warm cream typography, deep-black surfaces, selection styles, and reduced-motion overrides.
- [ ] **Step 4: Implement `AmbientBackground`** with 2–3 blurred gradient orbs, noise overlay, subtle grid/refraction layer, 12–20s CSS keyframes, and no Three.js/WebGL.
- [ ] **Step 5: Implement `HeaderNav` and `Hero`** with full-height rounded media frame, oversized responsive `PORTFOLIO`, staggered Framer Motion entrances, and a restrained CTA.
- [ ] **Step 6: Run Hero tests and build**; expect pass and no TypeScript errors.
- [ ] **Step 7: Commit** with `feat: build cinematic portfolio hero`.

### Task 3: About, metrics, and résumé experience

**Files:**
- Create: `src/components/common/SectionLabel.tsx`, `src/components/About/About.tsx`, `src/components/About/MetricGrid.tsx`, `src/components/Experience/ExperienceTimeline.tsx`
- Modify: `src/App.tsx`, `src/data/portfolio.ts`
- Test: `src/components/About/About.test.tsx`, `src/components/Experience/ExperienceTimeline.test.tsx`

**Interfaces:**
- Consumes: `experiences` and metric content.
- Produces: `<About />`, `<ExperienceTimeline />`, `<MetricGrid />`.

- [ ] **Step 1: Write failing tests** expecting `9+`, the three résumé companies, and dates `2020.07–至今`, `2016.11–2020.07`, `2015.11–2016.11`.
- [ ] **Step 2: Run targeted tests** and verify failure.
- [ ] **Step 3: Implement About** as editorial typography plus a replaceable abstract/person-image slot, avoiding the conventional avatar-left résumé layout.
- [ ] **Step 4: Implement metrics** with `9+ Design Experience`, `30+ Product Iterations`, `90%+ Design Fidelity`, and `4 Core Case Studies`, distinguishing the last item as site structure rather than résumé performance.
- [ ] **Step 5: Implement Experience timeline** with only résumé-supported company, role, date, and concise responsibility themes.
- [ ] **Step 6: Run tests and build** and expect pass.
- [ ] **Step 7: Commit** with `feat: add about and experience sections`.

### Task 4: Selected Works with replaceable visual assets

**Files:**
- Create: `src/components/Works/ProjectCard.tsx`, `src/components/Works/SelectedWorks.tsx`
- Modify: `src/App.tsx`, `src/data/portfolio.ts`, `src/index.css`
- Test: `src/components/Works/SelectedWorks.test.tsx`

**Interfaces:**
- Consumes: `Project` objects with `id`, `name`, `tags`, `year?`, `summary`, `metric?`, `visualKey`.
- Produces: `<ProjectCard project={project} index={number} />` and `<SelectedWorks />`.

- [ ] **Step 1: Write failing tests** asserting exact project order: 会员管理系统 → 重百云购小程序 → 混天绫数字营销系统 → 汽贸（企微）小程序.
- [ ] **Step 2: Add a safety assertion** that 会员管理系统 and 汽贸（企微）小程序 do not render unsupported numeric performance claims.
- [ ] **Step 3: Run tests** and verify failure.
- [ ] **Step 4: Implement the two-column staggered works grid** with large variable-height cards, numbered labels, metadata, visual placeholders keyed by `visualKey`, and 1.02–1.04 image-scale hover motion.
- [ ] **Step 5: Use only source-supported detail** for 重百云购 and 混天绫; keep the two newly supplied projects deliberately neutral until case-study material is provided.
- [ ] **Step 6: Run tests and build** and expect pass.
- [ ] **Step 7: Commit** with `feat: add selected project showcase`.

### Task 5: Expertise and full-screen Contact

**Files:**
- Create: `src/components/Expertise/ExpertiseCard.tsx`, `src/components/Expertise/Expertise.tsx`, `src/components/Contact/Contact.tsx`
- Modify: `src/App.tsx`, `src/data/portfolio.ts`
- Test: `src/components/Expertise/Expertise.test.tsx`, `src/components/Contact/Contact.test.tsx`

**Interfaces:**
- Consumes: `expertise` and `contact` data.
- Produces: `<Expertise />`, `<Contact />`.

- [ ] **Step 1: Write failing tests** for the four capability categories and the contact section's email/phone/location/back-to-top controls.
- [ ] **Step 2: Run targeted tests** and verify failure.
- [ ] **Step 3: Implement four premium capability cards** for Complex B2B Systems, Data Visualization, Mobile & Commerce, and Design System & Delivery; do not add skill percentages or software-logo grids.
- [ ] **Step 4: Implement the near-100vh Contact ending** with oversized `LET'S CREATE SOMETHING CLEAR.`, résumé contact information, 成都, and back-to-top behavior.
- [ ] **Step 5: Run tests and build** and expect pass.
- [ ] **Step 6: Commit** with `feat: finish expertise and contact sections`.

### Task 6: Responsive, motion, and production verification

**Files:**
- Modify: `src/index.css`, relevant section components if verification finds overflow issues
- Create: `src/responsive.test.tsx`

**Interfaces:**
- Consumes: all finished page components.
- Produces: production-ready single-page baseline.

- [ ] **Step 1: Add structural responsive tests** for navigation labels, section ids, and absence of duplicate main landmarks.
- [ ] **Step 2: Verify CSS breakpoints** at 1920, 1440, 1280, and below 900px: hero typography remains inside the frame; nav spacing contracts; works/expertise collapse appropriately; no fixed widths force horizontal overflow.
- [ ] **Step 3: Verify reduced-motion behavior** by ensuring ambient and entrance animations have CSS/Framer fallbacks when `prefers-reduced-motion: reduce` is active.
- [ ] **Step 4: Run `npm test -- --run`** and expect the full suite to pass.
- [ ] **Step 5: Run `npm run build`** and expect Vite production build success.
- [ ] **Step 6: Run `npm run dev -- --host 0.0.0.0`** long enough to verify the dev server starts without runtime compile errors, then stop it.
- [ ] **Step 7: Commit** with `chore: verify responsive portfolio baseline`.
