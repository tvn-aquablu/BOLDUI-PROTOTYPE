# Component Architecture

How the codebase is organized for staged Figma design handoff.

---

## Folder structure

```
bold-prototype/
├── docs/
│   ├── PRD.md                    ← Product requirements (this project's source of truth)
│   ├── DATA_MODEL.md             ← Frozen data contract
│   ├── COPY_GUIDELINES.md        ← Language rules and copy patterns
│   ├── DESIGN_TRACKER.md         ← Per-screen Figma handoff status
│   └── ARCHITECTURE.md           ← This file
├── designs/
│   └── (Figma exports and reference screenshots go here)
├── src/
│   ├── data/
│   │   ├── boosts.js             ← BOOSTS array (single source)
│   │   ├── flavors.js            ← FLAVORS array (single source)
│   │   ├── water.js              ← WATER_TYPES + VOLUMES
│   │   ├── screensaver.js        ← SCREENSAVER_SLIDES
│   │   └── suggested.js          ← SUGGESTED_DRINKS
│   ├── components/
│   │   ├── Badge.jsx             ← Badge + BadgeGroup (vitamin codes + botanical variant)
│   │   ├── GlassViz.jsx          ← Cross-section glass visualization
│   │   ├── BenefitCards.jsx      ← Sidebar benefit card list
│   │   ├── NfcStrip.jsx          ← Persistent NFC bottom strip
│   │   └── ThemeProvider.jsx     ← Theme context, light/dark toggle, colour tokens
│   ├── screens/
│   │   ├── Screensaver.jsx       ← Idle screen with rotating slides
│   │   ├── EntryChoice.jsx       ← Hub screen (3 paths + NFC)
│   │   ├── CraftBuilder.jsx      ← 3-step drink builder
│   │   ├── SuggestedDrink.jsx    ← Community / app suggestion cards
│   │   ├── QuickSelect.jsx       ← Compact all-on-one-screen selector
│   │   └── Dispensing.jsx        ← Pouring animation + staggered reveals
│   └── App.jsx                   ← Router (screen state machine + theme toggle)
└── bold-mockup-2-v2.jsx          ← Original wireframe (reference only, do not modify)
```

---

## Why this structure

**Staged handoff**: Each screen is its own file. When a Figma design arrives for "Craft Builder Step 1", you edit `CraftBuilder.jsx` without touching any other screen file. Other screens remain in wireframe state until their design arrives.

**Shared components**: Glass viz, badges, benefit cards, and NFC strip are reused across 4+ screens. Extracting them means a design change to the glass (for example) propagates everywhere automatically.

**Data is separate from UI**: The `data/` folder is the single source of truth for boosts, flavours, copy, etc. Screens import from data — they don't hardcode values. When boost names are confirmed, you update `boosts.js` once and it flows everywhere.

**Wireframe as reference**: The original `bold-mockup-2-v2.jsx` stays in the root as a read-only reference. It's the "before" — never modify it.

---

## Migration plan

### Phase 0: Scaffold (do this first)
1. Split the monolithic wireframe into the folder structure above
2. Extract data arrays into `src/data/`
3. Extract shared components into `src/components/`
4. Extract screens into `src/screens/`
5. Wire up `App.jsx` as the router
6. Verify: all navigation paths work identically to the wireframe

### Phase 1: Apply designs (per stage from DESIGN_TRACKER.md)
For each Figma frame received:
1. Extract design context via Figma integration
2. Update the matching screen component's JSX + styles
3. Update `ThemeProvider.jsx` if new colour tokens are needed
4. Leave other screens untouched
5. Update DESIGN_TRACKER.md status

### Phase 2: Polish
- Cross-screen consistency pass
- Transition animations
- Dark/light theme completeness
- Edge case testing (0 boosts, max 3 boosts, long flavour names, etc.)

---

## Component dependency map

```
App.jsx
├── ThemeProvider
├── Screensaver
│   └── NfcStrip
├── EntryChoice
├── CraftBuilder
│   ├── GlassViz
│   ├── BenefitCards
│   │   ├── Badge
│   │   └── BadgeGroup
│   └── BadgeGroup (in boost/flavour cards)
├── SuggestedDrink
│   ├── GlassViz
│   ├── BenefitCards
│   └── BadgeGroup
├── QuickSelect
│   ├── GlassViz
│   ├── BenefitCards
│   └── BadgeGroup
└── Dispensing
    ├── GlassViz
    ├── Badge
    └── BadgeGroup
```

---

## Rules for Antigravity

1. **Never modify `src/data/` files** unless explicitly told to by Thijmen (data model changes go through the PRD first)
2. **Never rewrite copy** — all text strings come from data files or are hardcoded in the wireframe. Preserve them exactly.
3. **Screen files are independent** — changing `CraftBuilder.jsx` must not require changes to `Dispensing.jsx` (unless you're updating a shared component)
4. **Shared components are the contract** — `GlassViz`, `BenefitCards`, `Badge` define the interface. Screens consume them. If a Figma design implies a different component structure, flag it rather than silently restructuring.
5. **Theme tokens live in ThemeProvider** — don't hardcode colours in screen files. Add new tokens to the theme object.
