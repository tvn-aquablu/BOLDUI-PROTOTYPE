# BOLD Prototype — Execution Plan

You are building a branded React/JSX prototype for the Aquablu BOLD touchscreen kiosk UI. This document is your step-by-step execution plan. Work through it sequentially — each step builds on the previous one. Do not skip ahead.

**Before you start**: Read these reference documents in order. They are your source of truth and override any assumptions.

1. `docs/PRD.md` — Product requirements, data model, screen map, open items
2. `docs/DATA_MODEL.md` — The frozen data contract (exact arrays, field names, copy)
3. `docs/COPY_GUIDELINES.md` — Language rules, badge system, copy patterns
4. `docs/ARCHITECTURE.md` — Folder structure, component split, dependency map, rules

**Reference file**: `bold-mockup-2-v2.jsx` in the project root is the working wireframe. It contains all interaction logic, state management, screen routing, and UI copy. You are migrating FROM this monolith INTO the component structure defined in ARCHITECTURE.md.

---

## STEP 1: Update the data model

The wireframe has an outdated data model (3 boosts, 6 flavours). Update it to match the PRD before splitting into components.

### 1A: Update BOOSTS array — from 3 to 4

**Remove**: `protein` (Protein / "Get Stronger After Every Session") — this boost no longer exists in the lineup.

**Keep unchanged**:
- `collagen` — name: "Glow & Move Freely", ingredient: Collagen
- `electrolytes` — name: "Replenish & Rehydrate", ingredient: Electrolytes

**Add two new boosts**:

```javascript
{
  id: "caffeine",
  name: "[NEEDS CONFIRMATION]",   // Placeholder — lifestyle name pending
  ingredient: "Caffeine",
  codes: ["Caffeine"],
  benefit: "[NEEDS COPY]",        // Placeholder — benefit copy pending
  dispenseBenefit: "[NEEDS COPY]", // Placeholder — dispense reveal pending
  glassLabel: "Caffeine",
  color: "#6a6a5e",
  height: 16
},
{
  id: "vitamin_c",
  name: "[NEEDS CONFIRMATION]",   // Placeholder — lifestyle name pending
  ingredient: "Vitamin C",
  codes: ["C"],
  benefit: "[NEEDS COPY]",        // Placeholder — benefit copy pending
  dispenseBenefit: "[NEEDS COPY]", // Placeholder — dispense reveal pending
  glassLabel: "Vitamin C",
  color: "#7a7a5e",
  height: 16
}
```

For the placeholder `[NEEDS CONFIRMATION]` and `[NEEDS COPY]` fields: render them literally in the UI so it's visually obvious what's missing. Do NOT invent copy — leave the brackets visible.

### 1B: Update FLAVORS array — from 6 to 5

**Remove entirely**: The `lemon` flavour (Lemon / Immunity). Delete the entire object from the array.

**Rework**: `red_fruits_mint` (Red Fruits & Mint / Focus). Caffeine has been pulled out into its own boost. Update its vitamin profile:

```javascript
{
  id: "red_fruits_mint",
  name: "Red Fruits & Mint",
  fn: "Focus",
  tag: "Zero sugar",
  codes: ["D", "B5", "B6", "Mint", "Berry"],
  glassLabel: "Vitamin D · B5 · Mint",
  vitamins: [
    { code: "D", benefit: "Keeps your mind sharp with Vitamin D" },
    { code: "B5", benefit: "Supports mental performance with B5" },
    { code: "B6", benefit: "Helps maintain focus with B6" },
    { code: "Mint", benefit: "Mint for mental clarity and a fresh head", botanical: true },
    { code: "Berry", benefit: "Antioxidant-rich berries to protect while you perform", botanical: true }
  ],
  dispenseBenefit: "Sharpening your focus with Vitamin D, B5 & mint",
  layerColor: "#b85060",
  layerHeight: 26
}
```

**Keep unchanged**: `mango_guava`, `raspberry_pomegranate`, `peach`, `blackcurrant_acai`. Do not modify these — their data is final.

### 1C: Update boost selection limit

Change the maximum selectable boosts from 2 to **3**. Find every instance of the max-2 logic:
- In `CraftBuilder`: the `toggleBoost` function caps at `s.length < 2` → change to `s.length < 3`
- In `QuickSelect`: same `toggleBoost` function → change to `s.length < 3`
- Update any UI copy that says "max 2" → "max 3"

### 1D: Update SUGGESTED_DRINKS

The suggested drinks reference `flavorId` and `boostIds`. Update them:
- Remove any suggestions that reference `"lemon"` as a flavorId — replace with a valid flavour
- Remove any suggestions that reference `"protein"` as a boostId — replace with a valid boost
- Ensure all `boostIds` arrays contain at most 3 items

### 1E: Update SCREENSAVER_SLIDES

Update any screensaver copy that references removed items:
- Replace references to "Lemon Immunity" with a current flavour
- Replace references to "Protein" boost with a current boost
- Ensure screensaver copy follows the tone rules in COPY_GUIDELINES.md

### 1F: Verify

After all data changes, run the app and click through every path:
- Screensaver → tap → Entry Choice
- Entry Choice → Craft Builder → select 0 boosts → select flavour → select water → dispense → done
- Entry Choice → Craft Builder → select 3 boosts → select flavour → select water → dispense → done
- Entry Choice → Suggested Drink → community tab → select each suggestion → dispense
- Entry Choice → Suggested Drink → app tab → select each suggestion → dispense
- Entry Choice → Quick Select → select all options → dispense
- Verify dark/light theme toggle works on every screen

**Do not proceed to Step 2 until all paths work without errors.**

---

## STEP 2: Scaffold the folder structure

Split the monolithic wireframe into the component architecture defined in `docs/ARCHITECTURE.md`.

### 2A: Create the folder structure

```
src/
├── data/
│   ├── boosts.js
│   ├── flavors.js
│   ├── water.js
│   ├── screensaver.js
│   └── suggested.js
├── components/
│   ├── Badge.jsx
│   ├── GlassViz.jsx
│   ├── BenefitCards.jsx
│   ├── NfcStrip.jsx
│   └── ThemeProvider.jsx
├── screens/
│   ├── Screensaver.jsx
│   ├── EntryChoice.jsx
│   ├── CraftBuilder.jsx
│   ├── SuggestedDrink.jsx
│   ├── QuickSelect.jsx
│   └── Dispensing.jsx
└── App.jsx
```

### 2B: Extract data files

Move each data array into its own file in `src/data/`. Each file exports one or more named constants:

| File | Exports |
|------|---------|
| `boosts.js` | `BOOSTS` |
| `flavors.js` | `FLAVORS`, `BOTANICAL_CODES` |
| `water.js` | `WATER_TYPES`, `VOLUMES` |
| `screensaver.js` | `SCREENSAVER_SLIDES` |
| `suggested.js` | `SUGGESTED_DRINKS` |

### 2C: Extract shared components

Move these into `src/components/`:

| Component | Source function(s) | Props interface |
|-----------|-------------------|-----------------|
| `ThemeProvider.jsx` | `DARK`, `LIGHT`, `ThemeContext`, `useC()`, theme toggle logic | Wraps children, exposes theme context |
| `Badge.jsx` | `Badge`, `BadgeGroup`, `BOTANICAL_CODES` import | `Badge: { label }`, `BadgeGroup: { codes }` |
| `GlassViz.jsx` | `GlassViz` | `{ boostLayers, flavorObj, waterType, volume, animPhase, fillProgress }` |
| `BenefitCards.jsx` | `BenefitCards` | `{ boostLayers, flavorObj }` |
| `NfcStrip.jsx` | `NfcStrip` | No props |

### 2D: Extract screen components

Move each screen function into `src/screens/`:

| Screen file | Source function | Props interface |
|-------------|----------------|-----------------|
| `Screensaver.jsx` | `Screensaver` | `{ onTap }` |
| `EntryChoice.jsx` | `EntryChoice` | `{ onCraft, onSuggested, onQuickSelect }` |
| `CraftBuilder.jsx` | `CraftBuilder` | `{ onDispense, onBack }` |
| `SuggestedDrink.jsx` | `SuggestedDrink` | `{ onDispense, onBack }` |
| `QuickSelect.jsx` | `QuickSelect` | `{ onDispense, onBack }` |
| `Dispensing.jsx` | `Dispensing` | `{ config, onDone }` |

### 2E: Wire up App.jsx

Create `src/App.jsx` as the router. It manages:
- `screen` state (string: "saver" | "entry" | "craft" | "suggested" | "quick" | "dispensing")
- `dispenseConfig` state (object passed to Dispensing)
- `dark` theme toggle state
- ThemeProvider wrapper
- Screen rendering based on state
- Dark/light toggle button (absolute positioned, top-right)

### 2F: Verify again

Run the exact same verification paths from Step 1F. Every interaction must work identically to the monolith. If anything breaks, fix it before proceeding.

**The app at this point should look and behave exactly like the wireframe — just structured differently under the hood.**

---

## STEP 3: Prepare for design handoff

### 3A: Add design token infrastructure to ThemeProvider

Ensure `ThemeProvider.jsx` exports the full token set used by the wireframe. Currently:

```javascript
// Light theme tokens (dark inverts these)
bg, surface, card, cardHover,
border, borderLight, borderActive,
text, textMuted, textDim,
primaryBg, primaryText,
nfcBg,
badge, badgeBorder, badgeText
```

Add placeholder slots for tokens that Figma designs might introduce:

```javascript
// Reserved for design handoff — will be populated from Figma
accent: null,        // Primary accent colour (if Figma introduces one)
accentText: null,    // Text on accent
boostCard: null,     // Boost card background (if different from card)
flavorCard: null,    // Flavour card background (if different from card)
glassStroke: null,   // Glass outline colour (if different from borderLight)
```

Set these to `null` initially. When a Figma design introduces a new token, populate it here rather than hardcoding in the screen file.

### 3B: Add a design status banner

Add a small, dismissable banner to the top of each screen that shows its design status. This is a dev-only helper — remove before final delivery.

```
[⬜ WIREFRAME] Screensaver — no Figma design applied yet
[✅ DESIGNED] CraftBuilder — Figma applied 2026-04-15
```

Pull status from a simple config object. This makes it instantly visible which screens are branded and which are still wireframes during staged development.

### 3C: Create a designs/ folder README

```
designs/README.md
```

Content:
```
# Design Assets

Drop Figma exports, reference screenshots, and design notes here.

## Naming convention
[screen-name]_[version].[ext]
Example: craft-builder-step1_v1.png

## Figma node IDs
Record node IDs in docs/DESIGN_TRACKER.md as they're provided.
```

---

## STEP 4: Apply Figma designs (staged)

**This step repeats for each screen.** I will provide Figma frame links or node IDs one at a time. For each:

### 4A: Extract

Use the Figma integration to pull the design for the specified frame. Extract:
- Layout structure (spacing, padding, gaps, alignment)
- Colour values (map to theme tokens or add new ones)
- Typography (font family, sizes, weights, line heights)
- Border radii, shadows, opacity values
- Component patterns (card structure, button styles, input styles)

### 4B: Map to existing components

Compare the Figma design against the current wireframe component. Identify:
- What's purely a style change (colours, spacing, fonts) → apply directly
- What implies a structural change (different card layout, new sub-components) → flag for review before implementing
- What shows different copy or data → **ignore, the data model wins**

### 4C: Apply

Update the matching screen file in `src/screens/`. Rules:
- Use theme tokens from `ThemeProvider.jsx` — do not hardcode colours
- If the design introduces new colours, add them as tokens first
- Preserve ALL interaction logic — `onClick`, `useState`, conditional rendering, animations
- Preserve ALL data bindings — the component must still consume `BOOSTS`, `FLAVORS`, etc. from `src/data/`
- If the design affects a shared component (`GlassViz`, `Badge`, etc.), update the component file AND verify it doesn't break other screens

### 4D: Verify

After applying each design:
- Run the full verification path for that screen
- Check the other screens that share components (especially if GlassViz or BenefitCards changed)
- Toggle dark/light theme and verify both
- Update `docs/DESIGN_TRACKER.md` status to ✅

### 4E: Screenshot

Save a before/after screenshot in `designs/` for reference:
- `[screen]_wireframe.png`
- `[screen]_branded_v1.png`

---

## STEP 5: Cross-screen consistency pass

After all screens have designs applied:

### 5A: Token audit
Review `ThemeProvider.jsx`. Ensure:
- No orphaned tokens (defined but never used)
- No hardcoded colours in screen files
- Dark theme is a coherent inversion of light

### 5B: Shared component consistency
- `GlassViz` looks identical across Craft Builder, Suggested, Quick Select, and Dispensing
- `BenefitCards` renders identically in sidebar positions across all screens
- `Badge` / `BadgeGroup` styling is consistent everywhere
- `NfcStrip` appearance matches across Screensaver and any other screen that uses it

### 5C: Interaction audit
Run every path one final time:
- Screensaver auto-advances slides (5s interval)
- Screensaver tap → Entry Choice
- All three Entry Choice paths work
- Craft Builder: 0 boosts → flavour → water → dispense
- Craft Builder: 3 boosts → flavour → water → dispense
- Craft Builder: back navigation at each step
- Suggested: community tab, all cards selectable, glass updates
- Suggested: app tab, all cards selectable, glass updates
- Quick Select: all combos, dispense button enables correctly
- Dispensing: progress bar, staggered reveals at 600ms, "plus you're also getting" header, done button resets to screensaver
- Dark/light toggle on every screen

### 5D: Copy audit
Spot-check against `docs/COPY_GUIDELINES.md`:
- No dosages visible anywhere
- Badges use the two-style system (vitamin vs botanical)
- Benefit copy pairs feeling + vitamin name
- Screensaver subtitles name specific vitamins
- Dispensing reveals use `dispenseBenefit` from data, not ad-hoc text
- Placeholder `[NEEDS CONFIRMATION]` and `[NEEDS COPY]` labels are still visible for unconfirmed boosts

---

## STEP 6: Polish & cleanup

### 6A: Remove dev helpers
- Remove the design status banners from Step 3B
- Remove any console.log statements
- Remove any commented-out wireframe code

### 6B: Add transitions
If not already present from Figma designs:
- Screen transitions (fade or slide, 200-300ms)
- Glass viz layer animations (stagger 150ms per layer)
- Dispensing reveal stagger (600ms — this is defined in the PRD, do not change)
- Button hover/active states
- Theme toggle transition (150ms on background/text colours)

### 6C: Edge cases
Test and handle:
- 0 boosts selected → "Just a vitamin drink today" note, progression allowed
- 3 boosts selected → 4th boost card shows disabled state, not hidden
- Long flavour name ("Raspberry & Pomegranate") doesn't break card layout
- Glass viz with 3 boost layers + flavour layer doesn't overflow
- Dispensing with 3 boosts + all flavour vitamins + botanicals doesn't overflow the scroll area

### 6D: Final output
The deliverable is a working React application that:
- Renders in a web browser at max-width 1024px, aspect-ratio 4:3
- Contains branded designs on all screens
- Has working dark/light theme toggle
- All data comes from `src/data/` files
- All interactions from the wireframe still function
- Placeholder copy is visibly marked for items pending confirmation

---

## Execution summary

| Step | What | Depends on | Verification |
|------|------|-----------|-------------|
| 1 | Update data model (4 boosts, 5 flavours, max 3) | Nothing | All click paths work |
| 2 | Scaffold folder structure | Step 1 | Identical behaviour to wireframe |
| 3 | Prepare for design handoff | Step 2 | Token infrastructure, status banners |
| 4 | Apply Figma designs (per screen) | Step 3 + Figma frames | Per-screen + cross-component verification |
| 5 | Cross-screen consistency | All of Step 4 | Full interaction + copy audit |
| 6 | Polish & cleanup | Step 5 | Edge cases, transitions, final review |

**Tell me "execute step [N]" and I will work through that step completely before asking for review.**
