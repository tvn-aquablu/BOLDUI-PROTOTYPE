# BOLD UI Prototype

Branded interactive prototype for the Aquablu BOLD touchscreen kiosk UI.

## Quick start

This project is a React/JSX prototype rendered in a web browser. It simulates the BOLD machine's touchscreen interface at 4:3 aspect ratio (max-width: 1024px).

## Documentation

All project documentation lives in `/docs`:

| File | Purpose |
|------|---------|
| [PRD.md](docs/PRD.md) | Product requirements — the source of truth |
| [DATA_MODEL.md](docs/DATA_MODEL.md) | Frozen data contract (boosts, flavours, vitamins) |
| [COPY_GUIDELINES.md](docs/COPY_GUIDELINES.md) | Language rules, badge system, copy patterns |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Component structure, folder layout, migration plan |
| [DESIGN_TRACKER.md](docs/DESIGN_TRACKER.md) | Per-screen Figma handoff status |

## Current state

The wireframe mockup (`bold-mockup-2-v2.jsx`) contains the complete working prototype with all interaction logic, data, and copy. The project is being migrated to a component-based structure for staged Figma design application.

## Key constraints

- **4 boosts** (max 0–3 selectable): Collagen, Electrolytes, Caffeine, Vitamin C
- **5 flavours**: Red Fruits & Mint (Focus), Mango Guava (Unwind), Raspberry & Pomegranate (Balance), Peach (Glow), Blackcurrant Açaí (Thrive)
- **Flow**: Boosts (step 1) → Flavour (step 2) → Water/Volume (step 3) → Dispensing
- **Glass viz always on the left** (40%), controls on the right (60%)
- **Copy rules**: No dosages, no NRV. Vitamin codes as badges. Benefit copy pairs feeling with function.

## Open items

See PRD.md § 8 for the full list. Key blockers:
- 4 boost lifestyle names (awaiting Thijmen)
- Red Fruits & Mint vitamin profile (placeholder in place)
- Figma designs per screen (staged handoff)
