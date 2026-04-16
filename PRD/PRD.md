# BOLD UI Prototype — Product Requirements Document

**Product**: BOLD Smart Water Dispensing Machine — Touchscreen UI
**Owner**: Thijmen (Senior PM Digital)
**Status**: Active — staged design handoff
**Last updated**: April 2026

---

## 1. Purpose

Build a branded, interactive prototype of the BOLD touchscreen kiosk UI. The prototype runs as a **web browser preview** in React/JSX. It is a high-fidelity clickable demo for stakeholder presentations and VC meetings — not production code.

A working wireframe mockup (`bold-mockup-2-v2.jsx`) already exists and contains the complete interaction logic, data model, screen routing, state management, and UI copy. **This project is a reskin** — applying branded Figma designs to the existing wireframe without changing functionality.

---

## 2. Product context

Aquablu is repositioning from "flavoured water" to a **functional wellness technology company**. The BOLD screen is the primary brand touchpoint (~60%+ of product perception). Competitors (Bevy, Triple, Dribble) all lead with flavour — Aquablu differentiates by **leading with function**.

**Reference brands for tone**: Ritual (credibility), Moon Juice (warmth). The UI should feel desirable, not like a supplement label. You know exactly what's in the drink, but it feels premium.

**Pricing model**: Hybrid freemium — base drink free, boosts paid (~€1).

---

## 3. Hardware constraints

- 9 BiBs total: **4 boost slots + 5 flavour syrup slots**
- Max 3 boost slots can be used per drink (hardware limit on simultaneous dispensing)
- Touchscreen at 4:3 aspect ratio (~998×744px physical)
- NFC reader built into the machine
- No keyboard, no mouse — touch-only interaction

---

## 4. Data model

### 4.1 Boosts (4 independent BiBs)

User selects 0–3 per drink.

| ID | Lifestyle name | Ingredient | Status |
|----|---------------|------------|--------|
| `collagen` | `[NEEDS CONFIRMATION]` | Collagen | Name TBD — awaiting lifestyle name from Thijmen |
| `electrolytes` | `[NEEDS CONFIRMATION]` | Electrolytes | Name TBD — awaiting lifestyle name from Thijmen |
| `caffeine` | `[NEEDS CONFIRMATION]` | Caffeine | Name TBD — awaiting lifestyle name from Thijmen |
| `vitamin_c` | `[NEEDS CONFIRMATION]` | Vitamin C | Name TBD — awaiting lifestyle name from Thijmen |

Each boost carries: `name`, `ingredient`, `codes[]` (badge labels), `benefit` (feeling-language headline), `dispenseBenefit` (dispensing screen reveal copy), `glassLabel` (glass layer text), `color`, `height`.

**Naming convention**: Lifestyle-aspirational, not clinical. Pattern established by current boosts: "Glow & Move Freely", "Get Stronger After Every Session", "Replenish & Rehydrate". New names should follow this register.

### 4.2 Flavours (5 syrup BiBs)

Each flavour carries its own vitamin profile + botanical/fruit ingredients baked into the syrup.

| ID | Flavour name | Function | Vitamin codes | Botanicals | Status |
|----|-------------|----------|---------------|------------|--------|
| `red_fruits_mint` | Red Fruits & Mint | Focus | D + `[NEEDS REWORK]` | Mint, Berry | ⚠️ Caffeine removed — needs new vitamins to justify "Focus" (placeholder: D, B5, B6) |
| `mango_guava` | Mango Guava | Unwind | C, B5, B6, B12 | Chamomile | ✅ Carries forward unchanged |
| `raspberry_pomegranate` | Raspberry & Pomegranate | Balance | E, B5, B6, B12 | Hibiscus, Pomegranate | ✅ Carries forward unchanged |
| `peach` | Peach | Glow | B3, C | Peach | ✅ C stays (naturally associated with the fruit) |
| `blackcurrant_acai` | Blackcurrant Açaí | Thrive | B1, B3 | Açaí, Blackcurrant | ✅ Carries forward unchanged |

**Dropped**: Lemon (Immunity) — removed from the lineup.

**Key change**: Vitamin C is now an independent boost. It remains in some flavour profiles where naturally associated (Peach Glow, Mango Guava Unwind) but is no longer a primary flavour vitamin feature.

**Botanical ingredients are vision-mode** — subject to formulation review with Ashlyn. Prototype can show them but they are not confirmed for launch.

### 4.3 Water types (4)

Still, Sparkling, Chilled, Room Temp.

### 4.4 Volumes (3)

200ml (Cup), 500ml (Bottle), 1000ml (Large).

---

## 5. Screen map & user flow

```
[Screensaver] → tap → [Entry Choice]
                           ├── "What does your body need?" → [Craft Builder]
                           │       Step 1: Boost selection (0–3)
                           │       Step 2: Flavour selection
                           │       Step 3: Water type + Volume
                           │       → [Dispensing]
                           ├── "Suggested for you" → [Suggested Drink] → [Dispensing]
                           ├── NFC tap → (future: app-connected flow)
                           └── "I already know what I want" → [Quick Select] → [Dispensing]
```

### Screen details

| Screen | Component | Layout | Description |
|--------|-----------|--------|-------------|
| Screensaver | `Screensaver` | Full-screen, 50/50 split | Rotating slides: emotional (prefix + bold keyword + subtitle with vitamin names) and live data. NFC strip at bottom. |
| Entry Choice | `EntryChoice` | Centered, full-screen | Three paths + NFC CTA + "I already know what I want" link. |
| Craft Builder | `CraftBuilder` | 40% left (glass) / 60% right (controls) | 3-step flow. Glass viz builds as user selects. Boosts = emotional entry point. |
| Suggested Drink | `SuggestedDrink` | 40% left (glass) / 60% right (suggestions) | Community vs app-connected toggle. Suggestion cards with boost/flavour/vitamin badges. |
| Quick Select | `QuickSelect` | 40% left (glass) / 60% right (compact grid) | All options on one screen. Grid selectors for boosts, flavours, water, volume. |
| Dispensing | `Dispensing` | Left sidebar (glass + summary) / right (reveals) | Staggered 600ms benefit reveals. Boosts first → "plus you're also getting" vitamin/botanical reveal. |

---

## 6. Language & copy rules

These rules are non-negotiable across all screens:

1. **Vitamin codes as compact badges** — C, D, B12, B3, etc. Never show dosages, NRV%, or ingredient weights.
2. **Two badge styles** — vitamin codes (solid, compact pill) vs. botanical/fruit ingredients (softer, italic, rounded pill). Visually distinct at a glance.
3. **Benefit copy pairs feeling with function** — "Fights fatigue with Vitamin C & B12" not "Delivers 0.75µg B12 at 15% NRV". Specific enough to be credible, light enough to feel premium.
4. **Boost cards**: aspirational lifestyle name + benefit headline + ingredient code badge.
5. **Flavour cards**: flavour name as hero, function name as clear secondary label, vitamin + botanical codes as grouped badges underneath. No doses.
6. **Glass viz labels**: name the ingredient — "Vitamin C · D · Ginger", "B-Complex · E · Hibiscus" — not quantities.
7. **Dispensing reveals**: pair outcome with vitamin name — "Supporting your immune system with Vitamin C, D & ginger". Boosts revealed first, then "plus, you're also getting — [Function] vitamins & botanicals".
8. **Screensaver**: warm and aspirational but function-aware. "Your daily dose of focus — Vitamin D & natural caffeine." Not purely emotional, not clinical.

---

## 7. Design handoff process

### Method
Figma frames provided per screen via Figma link or node ID. Antigravity's Figma integration extracts design (layout, spacing, colours, typography, components).

### Rules
- Apply visual design to the matching screen component
- Keep ALL interaction logic, state management, and data bindings from the wireframe mockup
- If Figma design shows different copy than the data model → **data model copy wins**
- If Figma design shows different data (wrong number of boosts, different flavours) → **data model wins**

### Handoff order (approximate)

| Stage | Screens | Dependency |
|-------|---------|------------|
| 1 | Screensaver, Entry Choice | None — standalone screens |
| 2 | Craft Builder (all 3 steps) + Glass Visualization | Core flow |
| 3 | Dispensing | Depends on glass viz from Stage 2 |
| 4 | Suggested Drink, Quick Select | Can reuse components from Stages 2-3 |

### Theme
Figma designs may only cover one theme (light or dark). Apply as primary theme, maintain the toggle, derive the secondary theme from reasonable inversions.

---

## 8. Open items

| Item | Owner | Status | Blocker? |
|------|-------|--------|----------|
| 4 boost lifestyle names | Thijmen | Awaiting confirmation | Yes — blocks boost card copy |
| Red Fruits & Mint vitamin profile rework | Thijmen + Ashlyn | Placeholder (D, B5, B6) in prototype | No — can ship with placeholder |
| Botanical ingredient formulation review | Ashlyn | Not started | No — prototype is vision-mode |
| Figma designs per screen | Nick / Miriam | In progress | Yes — blocks each stage |

---

## 9. Out of scope

- Production code / deployment
- App integration / NFC functionality
- Backend / real-time data feeds for screensaver live data
- Multi-language support
- Accessibility audit (future)
- Animation polish beyond basic transitions (future)
