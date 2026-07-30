# CIAC Website Handoff

Last updated: 2026-07-12 — Higgsfield-dependent work is now complete
(regenerated D1-D3 stills, A2 hero cinemagraph, E1 charge-port loop). Prior
handoff was written when the Codex session lacked a Higgsfield MCP connection
and left those items open.

## Project intent

CIAC is a polished product/marketing page for lifetime EV and hybrid battery
protection. `BRAND.md` is the brand and voice authority. `VISUALS.md` defines
the photographic world and Higgsfield prompts. `PLAN.md` contains the phased
execution plan.

The visual world is blue-hour dusk, cream light, ink shadows, and a restrained
emerald charging accent. Avoid purple, generic neon, excessive glow, fake
logos, text inside generated imagery, and glossy AI/HDR aesthetics.

## Current app and local preview

- Vanilla HTML/CSS/JS, built with Vite.
- Run with `npm run dev`.
- At handoff time Vite was running at `http://127.0.0.1:5174/` because port
  5173 was occupied.
- This directory is not currently a Git repository.

## What is already implemented

### Functional site

- The primary page and responsive styling are in `index.html`,
  `src/styles.css`, and `src/main.js`.
- Phase 1's multi-step quote flow is implemented, including cascading vehicle
  selection, mileage formatting, quote reveal, and the older/high-mileage
  battery-health-check path. Do not rebuild it from the plan as though it is
  still a mockup; inspect and QA the existing implementation first.
- Existing sections include hero, trust strip, how it works, coverage/bento,
  stats, plans, testimonials, FAQ, and closing CTA.

### Selected hero image

- The approved working anchor is corrected Candidate 1, Higgsfield generation
  `3310d3b0`.
- It shows a gray EV in a misty/rural dusk environment with the emerald charge
  port on the rear passenger-side quarter panel.
- It was selected over Candidate 2 (accurate port but studio setting) and
  Candidate 3 (best architectural composition but incorrect port location).
- The image is integrated into the hero via `.hero-backdrop` at 0.28 opacity
  desktop and 0.18 mobile, with a radial mask and isolated stacking context.
- The live integration uses `src/assets/hero-backdrop-a1.png`.

## Higgsfield assets downloaded locally

All generated stills from the previous session were successfully downloaded;
do not depend on the old Higgsfield conversation to retrieve them.

### A1 anchor candidates

- `src/assets/higgsfield/a1-anchor/A1-v2-c1-SELECTED-rural-mist.png`
  — selected anchor, generation `3310d3b0`.
- `src/assets/higgsfield/a1-anchor/A1-v2-c2-dark-studio.png`
  — correct rear-side port, rejected because it lacks driveway context.
- `src/assets/higgsfield/a1-anchor/A1-v2-c3-architectural-wrong-port.png`
  — strong composition, rejected because the port/glow is too far forward.
- `src/assets/higgsfield/a1-anchor/A1-v1-REJECTED-gray-architectural-front-port-bug.png`
  — original Variant A.
- `src/assets/higgsfield/a1-anchor/A1-v1-REJECTED-white-suburban-front-port-bug.png`
  — original Variant B, generation `efb7e227-2adc-43a3-b70b-b8e06ba9dd2a`.

### Other generated stills

- `src/assets/higgsfield/b1-battery-macro/B1-v1.png`
- `src/assets/higgsfield/b1-battery-macro/B1-v2.png`
- `src/assets/higgsfield/b2-highway-dusk/B2-v1.png`
- `src/assets/higgsfield/b2-highway-dusk/B2-v2.png`
- `src/assets/higgsfield/c1-asphalt-texture/C1-v1.png`
- `src/assets/higgsfield/d-testimonial-cars/D1-2016-nissan-leaf-REJECTED-oldworld.png`
- `src/assets/higgsfield/d-testimonial-cars/D2-2020-hyundai-kona-electric-REJECTED-oldworld.png`
- `src/assets/higgsfield/d-testimonial-cars/D3-2019-chevy-bolt-REJECTED-oldworld.png`

The first-round `*-REJECTED-oldworld.png` files remain in the repo for
reference — they were generated using the old white-suburban Variant B as their
style reference. Do not ship them.

The regenerated set is:
- `src/assets/higgsfield/d-testimonial-cars/D1-v2-2016-nissan-leaf-NEWWORLD.png`
- `src/assets/higgsfield/d-testimonial-cars/D2-v2-2020-hyundai-kona-electric-NEWWORLD.png`
- `src/assets/higgsfield/d-testimonial-cars/D3-v2-2019-chevy-bolt-NEWWORLD.png`

These were style-referenced to the selected Candidate 1 anchor
(`3310d3b0`) and now match the anchor world (blue-hour dusk, wet asphalt,
faint mist, distant warm house lights). The 320px WebP derivatives at
`src/assets/optimized/testimonial-{leaf,kona,bolt}.webp` have been regenerated
from these v2 sources and are wired into the testimonial cards.

## Higgsfield videos (A2 hero, E1 CTA)

Both loops are generated and integrated.

Sources:
- `src/assets/higgsfield/a2-hero-video/A2-v1-hero-cinemagraph.mp4` — 5s
  image-to-video loop generated with `kling3_0_turbo` from the selected A1
  anchor (`3310d3b0`). The emerald port glow breathes, faint mist drifts,
  static camera.
- `src/assets/higgsfield/e1-charge-port-closeup/E1-still-v1.png` — the E1
  poster/first frame, generated with `cinematic_studio_2_5` referenced to the
  A1 anchor for grade consistency (extreme close-up of the port with the
  emerald ring lit).
- `src/assets/higgsfield/e1-charge-port-video/E1-v1-charge-port-loop.mp4` —
  5s image-to-video loop from the E1 still, `kling3_0_turbo`.

Web-optimized derivatives at `src/assets/optimized/video/`:
- `hero-cinemagraph-a2.mp4` (H.264, 94 KB, 720p) + `.webm` (VP9, 74 KB)
  + `-poster.jpg` (44 KB, first frame).
- `cta-chargeport-e1.mp4` (H.264, 175 KB) + `.webm` (VP9, 130 KB)
  + `-poster.jpg` (47 KB).

Both use `<video autoplay muted loop playsinline preload="metadata">` with
`<source>` tags in WebM-then-MP4 order, poster fallback, and a small JS nudge
(`data-hero-video` / `data-cta-video`) that fades the video in with an
`is-ready` class only after `canplay` fires. `prefers-reduced-motion: reduce`
hides the video via CSS so the still poster remains. Both videos are silent
(re-encoded with `-an`).

Video integration mask notes:
- The hero video shares the same radial mask as the hero still so it fades
  away from the quote form on the right; opacity peaks at 0.32 desktop / 0.22
  mobile.
- The CTA video sits underneath the existing charge-green radial `::before`
  glow and is masked from the bottom up, peaking around 0.4 opacity so text
  contrast holds without hiding the port.

## Critical image anatomy rule

For every future car or charge-port generation, the charging port and emerald
glow must be on the **rear passenger-side quarter panel, behind the rear door,
where a gasoline filler cap would normally sit**. Never place it on the front,
headlight, or front door. This rule is also recorded in `VISUALS.md`.

## Illustration system (added 2026-07-12)

Two technical line diagrams, deliberately a second visual register from the
cinematic photography (see VISUALS.md "Illustration system" section for the
full rationale and style lock). Generated with Higgsfield `recraft_v4_1` in
`vector` mode with explicit hex colors (`#1C1612`/`#0068F9`/`#0BC98B`) and a
transparent background — true SVG output, not raster.

- Battery coverage cutaway → FAQ's first answer (the "what's covered"
  question), `.faq-a-with-figure` / `.faq-figure` in styles.css.
- Warranty-cliff timeline chart → the "8yr cliff" bento-stat card, `.bento-chart`
  / `.cliff-chart` in styles.css.

Both SVGs were run through `svgo --multipass` (roughly 40% size reduction)
after generation; do this for any future Recraft SVG output before shipping.

**Step illustrations (added 2026-07-14).** The how-it-works rail's four Lucide
icons were replaced by line-diagram illustrations in the same locked vector
style (`.step-illo` in styles.css, `optimized/step-{vehicle-s1,health-s2,
plan-s3,activate-s4}.svg`). Same generation + svgo pipeline. Rejected variants
and the unplaced hero illustration (H1) live in
`src/assets/higgsfield/i-illustrations/`. The `.step-icon` CSS rules are now
dead (no matching elements) and can be removed in a cleanup pass.

**Hero is now the illustrated H1 line-art (finalized 2026-07-14).** The
photographic hero (A1 photo + A2 cinemagraph video) has been removed from the
hero; the A/B URL-flag/toggle scaffolding is gone. `.hero-illo` in styles.css
holds the illustration (`optimized/hero-illustration-h1.svg`, eager +
preload). Retired assets: A1 photo remains ONLY as `og:image`/`twitter:image`;
A2 video files are unreferenced now (kept in `src/assets/higgsfield/` for the
record, not in the build). The E1 charge-port video loop in the closing CTA is
unchanged. `main.js` no longer has the hero-video or A/B logic — only the CTA
video fade-in remains.

## Work that remains

1. Sign-off review of A2 hero and E1 CTA video loops in a real modern browser
   (autoplay-muted-playsinline behavior varies by browser; both videos have
   still-image poster fallbacks and reduced-motion hides). If either loop
   feels too active behind copy, tune `.hero-backdrop-video.is-ready` and
   `.cta-video.is-ready` opacity in `src/styles.css`.
2. Optionally regenerate more variants of A2 or E1 for A/B choice. Suggested
   next candidates:
   - A2 alt: seedance_2_0 for higher motion fidelity if kling3_0_turbo drift
     feels off.
   - E1 alt: text-to-video from scratch if the current close-up composition
     doesn't zoom well on wider viewports.
3. Complete the remaining Phase 4/5 work in `PLAN.md`:
   - Expand testimonial carousel to six slides after real replacement
     testimonials arrive.
   - Do not build a partner-logo marquee without real partner SVGs.
   - Run Phase 5 QA: keyboard quote flow, focus and screen-reader behavior,
     reduced motion, mobile at 375px, console errors, overflow, CLS, image
     formats/sizing/lazy loading, and a production build.

## Current completion checkpoint

- Phase 1 (quote flow), Phase 3 (visual integration), and the Higgsfield-side
  of Phase 2 are all implemented. Every generated asset called for in
  `VISUALS.md` now has a downloaded source and, where the plan required, a
  web-optimized derivative and an integration in the page.
- Videos: A2 hero cinemagraph and E1 charge-port loop are wired with WebM+MP4
  sources, static poster fallbacks, `data-hero-video`/`data-cta-video`
  fade-in JS, and `prefers-reduced-motion` hide-video rules.
- Phase 4 visual-sophistication pass (2026-07-12): the 3-card carousel was
  replaced with an infinite marquee wall (21st.dev #9338 pattern) — 9 drafted
  reviews across two counter-scrolling rows, hover/focus pause, edge fade
  masks, reduced-motion fallback to a static scrollable strip (no duplicated
  content; the loop clone only happens in JS when motion is allowed). The
  trust strip is now a scrolling marquee (#4765) using text wordmarks plus two
  proof-point chips. Bento cards, plan cards, and step cards have a
  cursor-following spotlight (#2220 pattern): cobalt tint by default, charge
  green on the feature card, only on hover-capable devices, disabled under
  reduced motion. All drafted review copy still needs replacement with real
  testimonials before launch.
- Phase 5 code-level checks completed so far: production build passes, active
  images are local optimized WebP with dimensions, hero is preloaded, social
  metadata is present, and mobile menu `aria-controls`/label state is wired.
  Still to run: browser QA of the full page with both videos live.

## Known non-blocking production dependencies

- PP Neue Montreal web license and WOFF2.
- Real quote/rate table; current prices are placeholders.
- Real partner SVG logos.
- Real testimonials to replace drafted copy.
- Final wordmark; the current “C” remains a placeholder.

## Working preferences established by the user

- Put candidates into the website for contextual preview before asking the
  user to choose between them.
- Keep every generated asset downloaded locally with clear selected/rejected
  filenames.
- Avoid spending video-generation credits until the still-image direction is
  approved in the live page.
