# Design Handoff Tracker

Track the status of each screen's Figma → Antigravity pipeline.

## Status legend

| Status | Meaning |
|--------|---------|
| ⬜ Not started | No Figma design exists yet |
| 🎨 Designed | Figma frame complete, not yet extracted |
| 📐 Extracted | Design context extracted (via Figma integration), ready to apply |
| ✅ Applied | Branded design applied to component, reviewed |
| 🔄 Revision | Design applied but needs iteration |

---

## Stage 1 — Standalone screens

| Screen | Figma node ID | Status | Notes |
|--------|--------------|--------|-------|
| Screensaver | 606:24948 | ✅ Applied | |
| Entry Choice | 606:24920 | ✅ Applied | |

## Stage 2 — Core flow

| Screen | Figma node ID | Status | Notes |
|--------|--------------|--------|-------|
| Craft Builder — Step 1 (Boosts) | 606:24978 | ✅ Applied | Use placeholder glass asset for now |
| Craft Builder — Step 2 (Flavours) | — | ⬜ Not started | |
| Craft Builder — Step 3 (Water/Volume) | — | ⬜ Not started | |
| Glass Visualization panel | — | ⬜ Not started | **FINAL STEP:** Dedicated implementation phase for dynamic logic |

## Stage 3 — Dispensing

| Screen | Figma node ID | Status | Notes |
|--------|--------------|--------|-------|
| Dispensing screen | 606:24778 | 🎨 Designed | Use glass placeholder and pointer lines for benefits |

## Stage 4 — Secondary flows

| Screen | Figma node ID | Status | Notes |
|--------|--------------|--------|-------|
| Suggested Drink | — | ⬜ Not started | Reuses glass viz + benefit cards |
| Quick Select | — | ⬜ Not started | Reuses glass viz + benefit cards |

---

## How to update this file

When providing a Figma frame for a screen:
1. Add the Figma node ID to the matching row
2. Update status to 🎨 Designed
3. After extraction → 📐 Extracted
4. After applying to component → ✅ Applied
5. If iteration needed → 🔄 Revision (add notes)
