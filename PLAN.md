# CIAC v2 Execution Plan — Interactive + Visual Upgrade

The two workstreams that take the site from "strong draft" to "shippable
product page": conversion interactivity (adapted from 21st.dev patterns) and
a consistent photographic world (generated via Higgsfield per VISUALS.md).

Source docs: BRAND.md (tokens/voice — law), VISUALS.md (image prompts),
this file (sequence + acceptance criteria).

---

## Phase 1 — The quote flow (conversion engine)

**The single most important change.** Replaces the static quote-card mockup in
the hero with a working "check your coverage" flow. Custom-built vanilla JS —
21st.dev's multistep forms are generic onboarding wizards; we borrow only
their *shell pattern* (progress indicator, step transitions, back/next).

### Flow
1. **Vehicle** — Year (2011–2026) → Make → Model, cascading selects.
   Curated EV/hybrid data inline in JS (~30 makes/models; no API needed v1).
2. **Mileage** — formatted number input + "used car? welcome" microcopy.
3. **Quote reveal** — THE charge moment. Beam traces the card (reuse existing
   `--beam-angle` animation), price fades in, plan toggle (monthly/once).
4. **Activate** — cobalt CTA → checkout/contact. Fallback: "Talk to us" tel link.

### Build notes
- Same card chassis as current `.quote-card` — the mockup becomes real.
- Steps slide 16px + fade (BRAND.md §6 timing), height animates like FAQ.
- Progress: 3 dots + hairline track, charge fills only on quote-ready.
- Old-vehicle path (>6yr/75k mi): quote shows "free battery health check
  first" state instead of instant price — honest, on-brand.
- Keyboard + screen-reader complete: labeled selects, `aria-live` on the
  reveal, focus moves to each new step.
- All prices remain placeholder ($39/mo, $1,290) until real rate table exists.

### Acceptance
- [ ] Complete flow keyboard-only in <60s
- [ ] Beam fires exactly once at quote reveal (viewport's only glow)
- [ ] Reduced-motion: steps swap without slide, beam renders static
- [ ] Passes BRAND.md §8 checklist

---

## Phase 2 — Higgsfield visual generation (VISUALS.md)

Generate in this order — A1 is the anchor; everything else style-references it.

| Order | Asset | Type | Gate before next |
|---|---|---|---|
| 1 | A1 hero backdrop | image 21:9 | User approves grade/mood |
| 2 | B1 battery macro | image 4:3 | Matches A1 world |
| 3 | B2 highway dusk | image 21:9 | — |
| 4 | C1 asphalt texture | image 21:9 | — |
| 5 | D1–D3 testimonial cars | 3× image 1:1 | — |
| 6 | A2 hero loop | video 8s | Only if A1 works as backdrop |
| 7 | E1 charge-port loop | video 8–10s | — |

Iterate A1 up to 3 rounds before batching; batch the rest in one session for
model/grade consistency. Budget: 7 images + 2 videos.

---

## Phase 3 — Visual integration

Wire generated assets into the page (VISUALS.md placements):

1. Hero: A1 screened behind hero (masked right edge, must not fight quote
   flow); preload; A2 video upgrade if approved.
2. Bento feature card: B1 as media block inside the lifetime-coverage card.
3. New full-bleed band: B2 between How-it-works and Coverage with one line of
   copy ("Year eight is where we begin.").
4. Stats band: C1 at ~10% opacity under the dark surface.
5. Testimonials: D1–D3 as 64px rounded thumbs beside initials.
6. Closing CTA: E1 loop behind content (poster fallback, reduced-motion safe).
7. OG image: compose F1 from A1 + overlay; add meta tags.

Per-asset: AVIF/WebP + fallback, explicit width/height (no CLS), lazy below
fold, alt text in §2 voice.

---

## Phase 4 — 21st.dev-pattern component upgrades

Adapted to vanilla + brand tokens (never installed as React):

1. **Testimonials carousel** (pattern: tommyjepsen/testimonials #1434):
   CSS scroll-snap track, 2-up desktop / 1-up mobile, auto-advance ~5s
   (pauses on hover/focus/touch), dot indicators, 6 reviews (3 current + 3
   new in §2 voice). Keyboard arrows + `aria-roledescription="carousel"`.
2. **Trust strip marquee** (pattern: ravikatiyar/marquee-logo-scroller #4765):
   infinite translateX loop, mask-image edge fades, hover-pause.
   ONLY IF real partner SVG logos exist — else keep static strip.
3. **Plans + stats: no change** (already on-brand; SaaS pricing patterns and
   number-ticker ports rejected as not worth it).

Every adaptation passes the BRAND.md §8 eight-point anti-slop pass.

---

## Phase 5 — Full-page QA + brand audit

- Section-by-section audit against BRAND.md (kills any pre-brand "design.md
  era" drift): tokens only, type ramp, spacing scale, one glow per viewport.
- Verify in browser: console clean, no horizontal overflow, quote flow e2e,
  carousel touch/keyboard, videos loop seamlessly, reduced-motion pass.
- Performance: images sized right, videos lazy, LCP is hero text not media.
- Mobile pass at 375px (breakpoints exist but were never visually verified).

---

## Sequencing rationale

Quote flow first: it's pure code, no external dependency, and it's the
conversion engine — worth shipping even if imagery iterates for days.
Then generation (Phase 2) while its integration points (Phase 3) are fresh.
Component upgrades (Phase 4) last among builds because testimonial thumbs
(D1–D3) should exist before the carousel is rebuilt. QA closes.

## Open items that block nothing but matter

- PP Neue Montreal web license + woff2 (before production)
- Real rate table for quote pricing (placeholders until then)
- Real partner SVG logos (gates the marquee)
- Real testimonials to replace drafted ones
- Wordmark (the "C" is still placeholder)
