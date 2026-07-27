# Coverage in a Click — Brand Guidelines v0.1 (Draft)

Working draft for the coverageinaclick.com redesign. Every component — hand-built or
imported from 21st.dev — must pass through these tokens and rules before it ships.
This document is the single source of truth for visual and verbal decisions.

---

## 1. Positioning

**Direction:** "Certainty, productized" (structure) + "Energy, protected" (accent).
Insurance presented as a clean, one-price financial product, with light as the
brand's emotional signature — appearing only at meaning-bearing moments.

**One-liner:**
> Lifetime battery coverage, activated in a click.

**Positioning statement:**
For EV and hybrid owners staring down the end of their factory warranty,
Coverage in a Click is the battery protection that lasts as long as you own the
car — one flat price, one $250 deductible, no fine print, activated in minutes.
Unlike dealers and warranty companies that reject older or high-mileage vehicles,
we cover the cars everyone else walks away from.

**Messaging hierarchy (in order — lead with 1, close with 4):**
1. **Lifetime certainty** — protection for as long as you own the car. Not 8 years. Not 100k miles. Lifetime.
2. **Radical clarity** — one plan, one $250 deductible, totals you can read. No fine print theater.
3. **We cover what others won't** — old batteries, high mileage, used EVs. Welcome.
4. **Effortless activation** — quote in seconds, protected in a click.

**Proof points (use verbatim, they're load-bearing):**
- Backed by an A+ rated insurer (Old Republic)
- Flat $250 deductible, no hidden fees
- Free battery health report via RepairWise (48-hour turnaround)
- Pay once or monthly at 0% interest
- Covers new AND used EVs/hybrids regardless of age or mileage

**Audience:** primary — used-EV/hybrid owners (car is 5+ years old, warranty cliff
visible); secondary — new-EV buyers who want lifetime peace of mind at purchase.

---

## 2. Voice & tone

**Voice:** a calm expert who's on your side. Plainspoken, warm, quietly confident.
Think Mercury/Stripe clarity with a human pulse — not the folksy live-site voice
("hell yes", "sketchy smile"), and not corporate-insurance beige either.

**Rules:**
- Short declarative sentences. One idea per sentence.
- Say the number. "$250 deductible" beats "low deductible."
- Name the fear once, then resolve it. Don't dwell in anxiety.
- No exclamation marks. Confidence doesn't shout.
- Jargon gets translated inline: "a Vehicle Service Contract (that's the legal
  name for this kind of coverage)".
- Buttons are verbs with outcomes: "Get my quote", "Activate coverage" —
  never "Submit", "Learn more".

**Do / Don't:**
| Do | Don't |
|---|---|
| "Your warranty ends. Your coverage shouldn't." | "Don't get stranded with a $15,000 bill!!" |
| "One price. One deductible. For as long as you own the car." | "Industry-leading comprehensive protection solutions" |
| "We cover the cars other companies walk away from." | "We accept all makes and models (restrictions apply)" |

**Required legal framing:** always describe the product as a Vehicle Service
Contract (Mechanical Breakdown Insurance in California), administered by licensed
third parties. Never call it "insurance" unqualified in body copy.

---

## 3. Color system

Philosophy: a warm paper-like canvas, ink for words, cobalt for action, and one
reserved "charge" accent that only appears when something good happens.

### Core palette
| Token | Hex | Role |
|---|---|---|
| `--canvas-cream` | `#FAF9F7` | Page background. Never pure white pages. |
| `--surface-ivory` | `#FBFAF7` | Alternate section background |
| `--surface-white` | `#FFFFFF` | Cards and elevated surfaces only |
| `--ink` | `#121722` | Headlines, primary text |
| `--ink-soft` | `#4A505C` | Body text (raised from #777C86 for contrast) |
| `--ink-mute` | `#777C86` | Captions, labels — 14px+ only |
| `--hairline` | `#ECEAE6` | Borders (warmed from #EFEFEF to sit on cream) |
| `--cobalt` | `#0068F9` | Primary action. Buttons, links, focus rings. |
| `--cobalt-deep` | `#024BB1` | Hover/active states |
| `--cobalt-tint` | `#EAF2FE` | Selected states, info surfaces |

### The Charge accent (moments of light)
| Token | Hex | Role |
|---|---|---|
| `--charge` | `#0BC98B` | Charged green — protected status, quote-ready, success |
| `--charge-deep` | `#048862` | Text-on-light version (AA on cream) |
| `--charge-glow` | `#7FF2C8` | Glow gradients, beam highlights only |

**Charge rules (strict):**
1. Charge appears only at meaning-bearing moments: quote ready, coverage
   activated, "protected" status, battery-healthy. Never decorative.
2. Maximum one glow moment per viewport.
3. Charge is never a button background — action stays cobalt; charge is state.
4. Glow gradients always radiate from a semantic element (the quote card, the
   checkmark, the battery), never free-floating.

**Retired:** `--vivid-violet #6736EB` — cut. Three brand hues is one too many.
Violet's old jobs go to cobalt (emphasis) or charge (positive stats).

Accessibility floor: body text AA (4.5:1) on its actual background; large display
text AA-large minimum. `--charge` on cream fails for text — use `--charge-deep`.

---

## 4. Typography

**Families:** Nuckle and Geist with JetBrains Mono as a focused accent face:
- **Nuckle** — titles, headlines, stats, buttons, and navigation. Use Semibold
  600 for primary headings and Bold 700 for high-impact display moments.
- **Geist** — body copy, labels, captions, form fields, and supporting UI text.
  Use Regular 400 by default and 600 for compact labels.
- **JetBrains Mono** — eyebrows and section kickers only. Installed web weight:
  Semibold 600.

CSS stacks:
```css
--font-display: "Nuckle", Inter, -apple-system, system-ui, sans-serif;
--font-text: "Geist", Inter, -apple-system, system-ui, sans-serif;
--font-eyebrow: "JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;
```

The implementation bundles Nuckle Regular/Semibold/Bold and Geist as local web
assets under `src/assets/`, so the pairing is stable in production.

**Ramp (desktop / mobile):**
| Token | Family | Size | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|---|
| `display-xl` | Nuckle | 64 / 40 | 1.04 | 600 | -0.02em | Hero headline only |
| `display` | Nuckle | 48 / 32 | 1.08 | 600 | -0.015em | Section headlines |
| `title` | Nuckle | 32 / 26 | 1.15 | 600 | -0.01em | Card/bento headlines |
| `heading` | Nuckle | 24 / 20 | 1.25 | 600 | -0.005em | Sub-sections |
| `body-lg` | Geist | 18 | 1.55 | 400 | 0 | Hero copy, intros |
| `body` | Geist | 16 | 1.6 | 400 | 0 | Default text |
| `label` | Geist | 14 | 1.4 | 400/600 | +0.01em | UI labels, captions |
| `eyebrow` | JetBrains Mono | 13 | 1.2 | 600 | +0.08em, uppercase | Kickers |
| `stat` | Display | 56 / 40 | 1.0 | 600 | -0.025em | Big numbers ($250, 8yr) — tabular-nums |

Rules: headlines in sentence case; max 12 words in the hero; numbers always
`font-variant-numeric: tabular-nums` in cards and stats; never letter-space
lowercase body text. Nuckle carries display character; Geist stays neutral and
readable in longer copy — do not swap these roles.

JetBrains Mono is reserved for eyebrows and kickers. Keep it uppercase and
short; do not extend it to body copy, buttons, navigation, or long labels.

---

## 5. Space, radius, elevation

- **Spacing:** 4px base. Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
  Section vertical padding: 96 desktop / 64 mobile. Container: `min(100% - 2rem, 1200px)`.
- **Radius:** `sm` 8 (inputs, chips) · `md` 12 (buttons) · `lg` 16 (cards) ·
  `xl` 24 (feature/bento cards) · `pill` 999 (badges, nav CTA). One radius per
  component family — imported components get re-radiused.
- **Elevation (keep existing recipe, it's good):**
  - `shadow-subtle`: `rgba(0,0,0,.07) 0 1px 1px, rgba(0,0,0,.04) 0 -1px 1px inset, rgba(0,0,0,.14) 0 0 0 .5px inset`
  - `shadow-lift`: `rgba(0,0,0,.04) 0 20px 20px -8px`
  - `glow-charge`: `0 0 0 1px rgba(11,201,139,.25), 0 8px 40px -8px rgba(11,201,139,.35)` — charge moments only
- Borders are hairline (`--hairline`), 1px, never 2px. Depth comes from shadow +
  surface shifts (cream → ivory → white), not heavy strokes.

---

## 6. Motion

**Principle:** the interface is calm; light moves. UI transitions are fast and
invisible; charge moments are slow and noticed.

- UI transitions: 160–240ms, `cubic-bezier(0.2, 0, 0, 1)`. Hovers: opacity,
  shadow, ≤2px translate. No scale-jumps.
- Scroll reveals: 12–16px rise + fade, 400ms, stagger 60ms, once only.
- Charge moments: 600–900ms ease-out. Border beam traces the quote card once
  when the estimate resolves — then settles to a static charge border. Light
  travels; it never blinks or loops aggressively.
- Numbers count up only on first viewport entry (≤800ms).
- `prefers-reduced-motion`: all reveals become fades; beams render static.

---

## 7. Imagery

- **UI-as-hero:** the quote workspace card is the product shot. No stock photos
  of handshakes, call centers, or people pointing at laptops. Ever.
- Generated imagery (Higgsfield, once connected): EVs at dusk with charge-glow
  accents, macro battery/current abstracts, warm light on dark asphalt.
  Palette-locked: cream, ink, cobalt, charge-green highlights only.
- Real-thing photography allowed: actual cars, actual roads, golden-hour light.
  Treat with a subtle warm grade so it sits on the cream canvas.
- **Icons: Lucide (lucide.dev), exclusively.** Set `stroke-width: 1.5` (Lucide's
  default is 2 — too heavy next to Nuckle), rounded caps/joins as shipped,
  single color (`--ink`, `--ink-mute`, or `--cobalt`; `--charge-deep` only on
  charge states). Sizes: 16 inline, 20 UI, 24 feature cards. Never mix icon sets;
  no filled or multi-color icons.

---

## 8. Component normalization checklist (the anti-slop pass)

Every 21st.dev import must pass all eight before it merges:

1. All colors mapped to tokens in §3 — zero hardcoded hex.
2. Radius conformed to the §5 scale (one value per component family).
3. Shadows replaced with the two recipes (+ glow-charge where earned).
4. Type conformed to the §4 ramp — no off-ramp sizes/weights.
5. Spacing snapped to the 4px scale; section padding 96/64.
6. Motion re-timed to §6 (no default framer-motion springs left in).
7. Copy rewritten in §2 voice — no template lorem or template tone.
8. Dark-mode/gradient/violet leftovers stripped; charge used only per its rules.

---

## 9. Open decisions

- [x] Positioning — **A+B hybrid confirmed** (calm product + moments of light), 2026-07-11
- [x] Typeface — **Nuckle titles + Geist body** (decided 2026-07-15). Bundled
      local web assets are now used across the site.
- [x] Accent — **Charge Green `#0BC98B`** (decided 2026-07-11). Amber retired.
- [x] Iconography — **Lucide** at stroke-width 1.5 (decided 2026-07-11)
- [ ] Wordmark/logo treatment (current "C" mark is placeholder)
- [ ] Final copy deck: FAQ rewrite, testimonial curation (draft copy live in build)
