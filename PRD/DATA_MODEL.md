# Data Model Reference

**Status**: This is the frozen data contract. Antigravity must consume this data as-is. Do not rename fields, change structure, or add new fields without updating this document first.

---

## Boosts (4)

Max selectable per drink: **0–3**

```javascript
const BOOSTS = [
  {
    id: "collagen",
    name: "[NEEDS CONFIRMATION]",   // Lifestyle name — awaiting Thijmen
    ingredient: "Collagen",
    codes: ["Collagen"],
    benefit: "Supports skin elasticity and joint recovery",
    dispenseBenefit: "Supporting your skin and joints with Collagen",
    glassLabel: "Collagen",
    color: "#7a6e5e",
    height: 18
  },
  {
    id: "electrolytes",
    name: "[NEEDS CONFIRMATION]",   // Lifestyle name — awaiting Thijmen
    ingredient: "Electrolytes",
    codes: ["Electrolytes"],
    benefit: "Replenishes minerals lost through sweat and activity",
    dispenseBenefit: "Rehydrating you with Electrolytes",
    glassLabel: "Electrolytes",
    color: "#5e6e7a",
    height: 16
  },
  {
    id: "caffeine",
    name: "[NEEDS CONFIRMATION]",   // Lifestyle name — awaiting Thijmen
    ingredient: "Caffeine",
    codes: ["Caffeine"],
    benefit: "[NEEDS COPY]",
    dispenseBenefit: "[NEEDS COPY]",
    glassLabel: "Caffeine",
    color: "#6a6a5e",
    height: 16
  },
  {
    id: "vitamin_c",
    name: "[NEEDS CONFIRMATION]",   // Lifestyle name — awaiting Thijmen
    ingredient: "Vitamin C",
    codes: ["C"],
    benefit: "[NEEDS COPY]",
    dispenseBenefit: "[NEEDS COPY]",
    glassLabel: "Vitamin C",
    color: "#7a7a5e",
    height: 16
  }
];
```

### Confirmed boost names (carry forward from wireframe)

- Collagen → was "Glow & Move Freely"
- Electrolytes → was "Replenish & Rehydrate"
- Caffeine → NEW, needs name
- Vitamin C → NEW, needs name

---

## Flavours (5)

Each carries its own vitamin profile + botanical/fruit ingredients.

```javascript
const FLAVORS = [
  {
    id: "red_fruits_mint",
    name: "Red Fruits & Mint",
    fn: "Focus",
    tag: "Zero sugar",
    codes: ["D", "B5", "B6", "Mint", "Berry"],   // ⚠️ PLACEHOLDER — needs rework
    glassLabel: "Vitamin D · B5 · Mint",
    vitamins: [
      { code: "D", benefit: "Keeps your mind sharp with Vitamin D" },
      { code: "B5", benefit: "Supports mental performance with B5" },    // PLACEHOLDER
      { code: "B6", benefit: "Helps maintain focus with B6" },           // PLACEHOLDER
      { code: "Mint", benefit: "Mint for mental clarity and a fresh head", botanical: true },
      { code: "Berry", benefit: "Antioxidant-rich berries to protect while you perform", botanical: true }
    ],
    dispenseBenefit: "Sharpening your focus with Vitamin D, B5 & mint",
    layerColor: "#b85060",
    layerHeight: 26
  },
  {
    id: "mango_guava",
    name: "Mango Guava",
    fn: "Unwind",
    tag: "Zero sugar",
    codes: ["C", "B5", "B6", "B12", "Chamomile"],
    glassLabel: "B-Complex · C · Chamomile",
    vitamins: [
      { code: "C", benefit: "Protects your body while you relax with Vitamin C" },
      { code: "B5", benefit: "Eases mental tension with B5" },
      { code: "B6", benefit: "Helps regulate your mood with B6" },
      { code: "B12", benefit: "Supports recovery from a long day with B12" },
      { code: "Chamomile", benefit: "Chamomile to calm your nervous system naturally", botanical: true }
    ],
    dispenseBenefit: "Helping you unwind with B-Complex, Vitamin C & chamomile",
    layerColor: "#d4a050",
    layerHeight: 36
  },
  {
    id: "raspberry_pomegranate",
    name: "Raspberry & Pomegranate",
    fn: "Balance",
    tag: "Zero sugar",
    codes: ["E", "B5", "B6", "B12", "Hibiscus", "Pomegranate"],
    glassLabel: "B-Complex · E · Hibiscus",
    vitamins: [
      { code: "E", benefit: "Protects your cells from daily wear with Vitamin E" },
      { code: "B5", benefit: "Keeps your metabolism in rhythm with B5" },
      { code: "B6", benefit: "Balances your energy with B6" },
      { code: "B12", benefit: "Fuels steady, all-day performance with B12" },
      { code: "Pomegranate", benefit: "Pomegranate — packed with polyphenols for cellular health", botanical: true },
      { code: "Hibiscus", benefit: "Hibiscus extract to support healthy circulation", botanical: true }
    ],
    dispenseBenefit: "Keeping you balanced with Vitamin E, B-Complex & pomegranate",
    layerColor: "#9a5a7a",
    layerHeight: 36
  },
  {
    id: "peach",
    name: "Peach",
    fn: "Glow",
    tag: "Zero sugar",
    codes: ["B3", "C", "Peach"],
    glassLabel: "Vitamin B3 · C · Peach",
    vitamins: [
      { code: "B3", benefit: "Nourishes your skin from the inside with B3" },
      { code: "C", benefit: "Supports collagen for stronger skin with Vitamin C" },
      { code: "Peach", benefit: "Peach — naturally rich in skin-loving vitamins A & E", botanical: true }
    ],
    dispenseBenefit: "Nourishing your skin with Vitamin B3, C & peach extract",
    layerColor: "#e0a070",
    layerHeight: 26
  },
  {
    id: "blackcurrant_acai",
    name: "Blackcurrant Açaí",
    fn: "Thrive",
    tag: "Zero sugar",
    codes: ["B1", "B3", "Açaí", "Blackcurrant"],
    glassLabel: "Vitamin B1 · B3 · Açaí",
    vitamins: [
      { code: "B1", benefit: "Keeps your energy systems firing with B1" },
      { code: "B3", benefit: "Converts food into fuel you feel with B3" },
      { code: "Açaí", benefit: "Açaí — one of nature's most antioxidant-dense fruits", botanical: true },
      { code: "Blackcurrant", benefit: "Blackcurrant for natural Vitamin C and anthocyanins", botanical: true }
    ],
    dispenseBenefit: "Fuelling your day with Vitamin B1, B3, açaí & blackcurrant",
    layerColor: "#6a5a8a",
    layerHeight: 26
  }
];
```

---

## Water types (4)

```javascript
const WATER_TYPES = [
  { id: "still", label: "Still" },
  { id: "sparkling", label: "Sparkling" },
  { id: "chilled", label: "Chilled" },
  { id: "room_temp", label: "Room Temp" }
];
```

## Volumes (3)

```javascript
const VOLUMES = [
  { ml: 200, label: "Cup" },
  { ml: 500, label: "Bottle" },
  { ml: 1000, label: "Large" }
];
```

---

## Change log

| Date | Change | Author |
|------|--------|--------|
| April 2026 | Initial data model: 3 boosts, 6 flavours | Thijmen |
| April 2026 | Updated: 4 boosts (added Caffeine, Vitamin C), 5 flavours (dropped Lemon Immunity), max 0–3 boosts | Thijmen |
