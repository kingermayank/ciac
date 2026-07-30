# CIAC Visual Asset Plan v1

Companion to BRAND.md §7 (Imagery). Every asset below is generated in Higgsfield
with the same master style block so the whole site reads as one photographic
world. Nothing decorative — each visual carries a message from the §1 hierarchy.

---

## The one visual world

All imagery lives in a single scene-language: **blue-hour dusk, real EVs, warm
cream light against deep ink shadows, and one emerald charge-light source per
frame.** This is "moments of light" made photographic — the world is calm and
dark-warm; the light appears where the meaning is (the charging port, the
battery, the road home).

### Master style block (prepend to every prompt)

> Cinematic photograph, blue-hour dusk, matte editorial film grade with soft
> grain, warm paper-cream highlights (#FAF9F7) and deep espresso-ink shadows
> (#1C1612), one restrained emerald-green light accent (#0BC98B) emanating from
> a single meaningful source, faint cool cobalt (#0068F9) reflections, shallow
> depth of field, minimalist composition, generous negative space, premium car
> advertising aesthetic —
> no people, no faces, no text, no logos, no badges, no purple or violet, no
> oversaturated neon, no lens flare clichés, no HDR look

### Anatomy rules (do not violate)

- **Charge port is on the rear passenger-side quarter panel, behind the rear
  door — where a fuel filler cap lives on a gas car.** Never on the front,
  never on the headlight. This is where the emerald glow must originate for
  the whole world to read correctly.
- If a shot doesn't show the port, still say "no green light source from the
  front" so the model doesn't invent one.

### Consistency mechanics

1. Generate the **anchor asset first** (A1 hero backdrop), iterate until the
   grade is right.
2. Reuse A1 as a **style/reference image** for every subsequent generation
   (Higgsfield reference elements) so grade, grain, and light temperature match.
3. Same model + settings for the whole batch. Batch in one session.
4. Post-process check: every asset must sit comfortably next to cream `#FAF9F7`
   — if an image's warm tones fight the canvas, re-grade before shipping.

### Motion rules for video (extends BRAND.md §6)

- Max **2 video loops** on the page (hero + closing CTA). Everything else static.
- Loops are 6–10s, seamless, slow — light travels, camera barely moves.
- `prefers-reduced-motion` and mobile: serve the poster frame instead.
- Autoplay muted, `playsinline`, lazy-loaded below the fold.

---

## Asset list (by section, in generation order)

### A1 — Hero backdrop (ANCHOR ASSET) · image · 21:9
**Placement:** hero section background, heavily screened behind the cream
canvas (low opacity or masked to the right edge behind the quote form).
Must not compete with the quote card — the card's beam owns this viewport's glow.

**Prompt:**
> [master block] + Wide establishing shot of a modern compact electric SUV
> parked on a quiet suburban driveway at dusk, house windows glowing warm
> cream, the car's charging port emitting a soft emerald glow, long shadows on
> asphalt, mist in the far background, shot on 35mm, f/2.8, eye level

**Why:** "protection lives at home, quietly" — lifetime certainty as a mood,
not a claim.

### A2 — Hero ambient loop · video · 16:9 · 8s seamless
**Placement:** optional upgrade over A1 (poster = A1 frame). Motion: the
charge-port glow slowly breathes brighter once; distant house light flickers on.

**Prompt (image-to-video from A1):**
> Subtle cinemagraph motion: the emerald charging-port light gradually
> brightens and settles, faint heat shimmer, mist drifts slowly, everything
> else still, seamless loop, no camera movement

### B1 — Battery macro · image · 4:3
**Placement:** bento feature card ("Protected for as long as you own the car")
— replaces or sits behind the mini quote rows. This is the coverage section's
one charge moment.

**Prompt:**
> [master block] + Extreme macro photograph of an EV battery cell array,
> precision-machined metal and matte black polymer, one cell seam traced by a
> thin line of emerald light, engineering-grade cleanliness, dark background
> fading to charcoal, studio product lighting from top-left

**Why:** the product IS the battery. Macro = we know this machine intimately.

### B2 — The warranty-cliff road · image · 21:9
**Placement:** full-bleed band between How-it-works and Coverage sections
(new), or background of the "8yr cliff" bento card.

**Prompt:**
> [master block] + Empty two-lane highway at dusk stretching to the horizon,
> road markings catching the last warm light, a single EV far ahead with tail
> lights glowing softly, rolling hills silhouetted in ink, vast calm sky in
> gradient from cream to deep blue

**Why:** "the road ahead after year 8" — the journey continues past the cliff.

### C1 — Stats band texture · image · 21:9, very low contrast
**Placement:** dark stats band background at ~8–12% visibility. Almost
subliminal.

**Prompt:**
> [master block] + Overhead abstract of dark wet asphalt at night with one
> faint thin streak of emerald light reflected across it, nearly black
> composition, tone-on-tone, extremely subtle, texture not subject

### D1–D3 — Testimonial vehicles · 3 images · 1:1
**Placement:** small square thumbs in the testimonial cards next to each
driver's initials — the actual cars from the reviews (2016 Nissan Leaf,
2020 Hyundai Kona Electric, 2019 Chevy Bolt). Real things, per BRAND.md §7.

**Prompt (×3, swap vehicle):**
> [master block] + Three-quarter front view of a [2016 Nissan Leaf, silver] /
> [2020 Hyundai Kona Electric, dark gray] / [2019 Chevrolet Bolt, white]
> parked on a residential street at dusk, warm porch light in soft-focus
> background, honest and unglamorous but beautifully lit, slight warm grade

**Why:** grounds drafted testimonials in the physical world; "we cover the
cars other companies walk away from" — shown, not said.

### E1 — Closing CTA loop · video · 16:9 · 8–10s + poster
**Placement:** closing CTA dark section background (replaces/augments the
charge radial gradient). This viewport's single glow moment.

**Prompt (text-to-video or image-to-video):**
> [master block] + Close-up of an EV charge port at night as charging engages:
> a ring of emerald light traces around the port once and settles into a calm
> steady glow, reflections on dark paint, slow shallow rack focus, seamless
> loop, no camera shake

**Why:** literal "activated in a click" — the brand's signature beam, in the
physical world, mirroring the hero quote card animation.

### F1 — OG/share image · 1200×630
**Placement:** `og:image` meta. Compose in code: A1 backdrop (cropped) + ink
overlay + wordmark + "Lifetime battery coverage, activated in a click."
No generation needed beyond A1.

---

## What deliberately gets NO imagery

- **Plans section** — pricing decisions want calm, not atmosphere.
- **FAQ** — text is the product here.
- **How-it-works step cards** — Lucide icons already carry them; photos would
  fight the 4-step scanability. (B2 band nearby supplies the mood instead.)
- **Nav/footer** — chrome stays chromeless.

Budget: 7 generated images + 2 videos. One world, nine frames.

---

---

## Illustration system (technical line diagrams — added 2026-07-12)

A **second, deliberately separate** visual mode from the photographic world
above. BRAND.md's imagery language is 100% cinematic photography; illustration
is a different register and only earns a place where the job is to *explain*
something, not set a *mood*. Used sparingly — this is an extension of the
Lucide icon system (§7), not a parallel brand.

**Model:** Higgsfield `recraft_v4_1`, `model_type: vector`, explicit `colors`
array locked to hex tokens (not prompt-described), `background_color: null`
(transparent, so it composites directly onto cream/white cards).

### Master illustration style block

> Clean vector line illustration, minimal technical diagram style, thin
> uniform stroke weight matching a 1.5px icon line, flat color fills only
> where specified, no gradients, no shading, no texture, no photorealism,
> generous white space, editorial technical-diagram aesthetic —
> no text or numbers rendered in the image (labels are added in HTML/CSS
> after), no photorealistic rendering, no other colors beyond the palette

**Color lock:** `#1C1612` (ink — outlines/structure), `#0068F9` (cobalt —
informational/structural elements), `#0BC98B` (charge — the ONE covered/
meaningful element only, per BRAND.md's charge rules). Never more than these
three in a single diagram.

### Diagrams

**I1 — Battery coverage cutaway.** Side-profile line illustration of a
compact EV in cutaway; body/wheels/interior in plain ink linework, the
high-voltage battery pack outlined in cobalt along the floor, one module
within the pack filled charge-green with a small charge-green checkmark.
Answers "what's actually covered" without a paragraph of FAQ text.
**Placement:** coverage/bento section, alongside or replacing the B1 macro
photo in the feature card.

**I2 — Warranty-cliff timeline.** Minimal 2-line chart: a thin dashed ink-gray
line rising then dropping to zero at year 8 (typical factory warranty), a
solid charge-green line continuing flat and unbroken across the full chart
(CIAC coverage). No axis text/numbers in the generated image — real HTML
labels ("Year 8", "Factory warranty ends", "CIAC coverage continues") are
overlaid in code. **Placement:** near the "8yr cliff" bento-stat card or the
B2 warranty-cliff band, as the literal data companion to that section's mood.

### Shipped (2026-07-12)

- **I1 battery cutaway** — generated `8f45b6e2` (recraft_v4_1, vector mode),
  selected over a busier variant with visible seats/interior detail that read
  as "illustrated car" rather than "technical diagram." Placed beside the
  FAQ's first answer ("What exactly does the coverage protect?") — the one
  deliberate exception to "FAQ gets no imagery," because this is explanation,
  not decoration. `src/assets/optimized/battery-cutaway-i1.svg` (svgo-optimized,
  73.8 KB / 28.4 KB gzip).
- **I2 warranty-cliff chart** — generated `10333fd3`, selected over a variant
  whose decline was a diagonal slope (wrong story — factory warranties don't
  gradually ramp down, they just end; the vertical step-down reads as an
  actual cliff). Placed inside the previously-sparse "8yr cliff" bento-stat
  card. `src/assets/optimized/warranty-cliff-i2.svg` (16.6 KB / 6.9 KB gzip).

Rejected variants kept for reference in
`src/assets/higgsfield/i-illustrations/` (`I1-v2-*-detailed.svg`,
`I2-v2-*-slope.svg`).

### How-it-works step illustrations (S1–S4) + hero (H1) — added 2026-07-14

User directive (2026-07-14) reverses the earlier "how-it-works stays
icon-only" call: each of the 4 step cards gets a line-diagram illustration in
the same locked vector style, replacing (sitting above) the Lucide step icon.
Reference the user supplied showed a UI-mockup "how it works" 3-panel; we hold
our own line-art register rather than copying that flatter mint-card style, so
the whole illustration system still reads as one hand. Same model
(`recraft_v4_1` vector), same 3-hex palette, transparent background, no text
in the image (card titles/descriptions stay in HTML).

- **S1 — Tell us your vehicle.** A minimal UI-card outline containing a simple
  side-profile EV in ink linework; below it, short input-field rectangles
  outlined in cobalt (year/make/model), the last with a small charge-green
  checkmark. Mirrors the real quote form's cascade.
- **S2 — Check battery health.** A rounded EV battery outlined in ink with
  internal cell divisions, a thin cobalt pulse/heartbeat line across the
  middle, one charge-green check badge — the RepairWise health report moment.
- **S3 — Choose your plan.** Two stacked plan cards in ink linework; the top
  highlighted with a cobalt border and a charge-green filled radio + check,
  the lower a plain outline with an empty circle. Mirrors the monthly/once
  toggle.
- **S4 — Activate coverage.** A cobalt shield outline with a charge-green
  checkmark filled inside, a small ink cursor arrow near it — the literal
  "activated in a click" moment (the one charge-green confirm of the set).
- **H1 — Hero illustration (exploratory).** Three-quarter EV in clean ink
  linework, battery pack outlined cobalt along the floor, a soft charge-green
  glow + check at the rear-side charge port, generous left negative space.
  Placement TBD — the hero already carries the A1 photo + A2 video, so this
  may instead serve as an alternate hero, a section divider, or the OG image.

Charge rule still holds: exactly one charge-green meaning-bearing element per
illustration (the completed/covered/activated moment), never decorative.

**Shipped 2026-07-14.** S1–S4 replaced the Lucide step icons in the
how-it-works rail (`.step-illo` in styles.css). Selected variants:
- S1-A vehicle form (`9b15b3cc`) · `optimized/step-vehicle-s1.svg`
- S2-A battery + pulse (`8e1cd2bd`) · `optimized/step-health-s2.svg`
- S3-B plan cards (`d2559861`) · `optimized/step-plan-s3.svg`
- S4-A shield + click cursor (`0781ad36`) · `optimized/step-activate-s4.svg`

All svgo-optimized (gzip 3.9–32 KB; S1's detailed car is the heavy one at
32 KB gzip — regenerate simpler if that matters). Rejected variants archived in
`higgsfield/i-illustrations/`.

**H1 hero illustration** (`d0772c23`, variant A) — **now the finalized default
hero** (user chose it over the photo hero, 2026-07-14). The line-art EV is
anchored lower-right with the quote form floating above; the copy sits over the
clean left negative space. `optimized/hero-illustration-h1.svg` (svgo, 54 KB
gzip), eager + `fetchpriority="high"` + `<link rel=preload>` since it's the
above-the-fold hero visual. Styles: `.hero-illo` in styles.css.

The A/B scaffolding (URL flags, floating toggle, `.hero.is-illustrated` gating)
has been removed. The photographic hero (A1 still + A2 cinemagraph) is retired
from the page — A1 stays only as the `og:image`/`twitter:image` share
thumbnail; A2's video files are now unreferenced (source kept in
`src/assets/higgsfield/a2-hero-video/` for the record, out of the build). The
E1 charge-port loop is unaffected — still live in the closing CTA.

### FAQ + bento illustration set (F2–F5, D-tag/D-fees, X-compare) — added 2026-07-14

User directive (2026-07-14): illustrate every FAQ answer and the empty bento
cards, plus a "CIAC vs everyone else" comparison. Same locked vector style,
mix of photo + illustration stays. One charge-green element each.

FAQ (F1 already has the I1 battery cutaway):
- **F2 · Is this an insurance policy?** — contract/certificate page with a
  cobalt shield seal + charge check (a backed Vehicle Service Contract).
- **F3 · Used / high-mileage?** — odometer gauge, cobalt needle to the high
  end, charge check badge (high miles welcome).
- **F4 · Battery health report?** — clipboard report with a small cobalt
  battery + pulse and report rows, charge check (the RepairWise report; note
  it's the *report/document*, distinct from step S2's bare battery).
- **F5 · Cancel / transfer?** — two cars with a cobalt shield + transfer arrow
  between them, charge check (coverage transfers on sale).

Bento (empty cards):
- **D-tag · "$250 flat deductible"** — cobalt price tag, flat cobalt line,
  charge check → into the flat-deductible stat card.
- **D-fees · "Every fee shown upfront"** — itemized receipt fully visible with
  a cobalt magnifier, charge check → replaces the Lucide icon in that card.
- **X-compare · "We cover what others won't"** — horizontal row of 4 cars: the
  first cobalt with a charge check (CIAC covers), the other three plain ink
  with an X (others reject) → into the wide bento card. This is the
  conversion-moment comparison.

### What does NOT get an illustration

Photography still owns B1, B2, C1, D1-D3, hero backdrop, and CTA — the
line-diagram set is for *explanatory* moments (coverage anatomy, the process
steps), not mood. The FAQ keeps only its single battery-cutaway diagram (I1);
the other answers stay text-only.

## Integration checklist (after generation)

- [ ] Export web sizes: hero 2400w, bands 2000w, cards 800w, thumbs 320w — AVIF/WebP + JPEG fallback
- [ ] `loading="lazy"` below the fold; hero backdrop preloaded
- [ ] Videos: muted, autoplay, playsinline, loop, poster; reduced-motion → poster only
- [ ] Every image passes the §8 anti-slop check #1: sits on cream without fighting it
- [ ] Alt text in §2 voice (plain, factual)
- [ ] Re-audit each touched section against BRAND.md while integrating
