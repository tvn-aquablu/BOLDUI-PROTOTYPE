export const BOTANICAL_CODES = new Set(["Ginger", "Mint", "Berry", "Chamomile", "Hibiscus", "Pomegranate", "Peach", "Açaí", "Blackcurrant", "Cucumber", "Yuzu", "Guava", "Mango", "Antioxidants"]);

export const FLAVORS = [
  {
    id: "cucumber_yuzu_mint",
    fn: "Refresh",
    name: "Cucumber Yuzu & Mint",
    tag: "Zero sugar",
    glassLabel: "Vitamin B12 · C",
    vitamins: [
      { code: "B12", benefit: "Supports reduction of tiredness", botanical: false },
      { code: "C", benefit: "Refreshing antioxidant support", botanical: false }
    ],
    layerColor: "#4caf50",
    layerHeight: 25
  },
  {
    id: "raspberry_pomegranate",
    fn: "Balance",
    name: "Raspberry & Pomegranate",
    tag: "Zero sugar",
    glassLabel: "Vitamin C · B5 · B6 · B12 · E",
    vitamins: [
      { code: "C", benefit: "Protects cells from oxidative stress", botanical: false },
      { code: "B5", benefit: "Reduces tiredness and fatigue", botanical: false },
      { code: "B6", benefit: "Supports psychological function", botanical: false },
      { code: "B12", benefit: "Supports energy-yielding metabolism", botanical: false },
      { code: "E", benefit: "Protects DNA, proteins and lipids", botanical: false }
    ],
    layerColor: "#ad1457",
    layerHeight: 25
  },
  {
    id: "lemon_immunity",
    fn: "Immunity",
    name: "Lemon",
    tag: "Zero sugar",
    glassLabel: "Vitamin C · D · B12",
    vitamins: [
      { code: "C", benefit: "Boosts natural immunity", botanical: false },
      { code: "D", benefit: "Essential for immune system support", botanical: false },
      { code: "B12", benefit: "Contributes to cell division", botanical: false }
    ],
    layerColor: "#fdd835",
    layerHeight: 25
  },
  {
    id: "peach_glow",
    fn: "Glow",
    name: "Peach",
    tag: "Zero sugar",
    glassLabel: "Vitamin B3 · C",
    vitamins: [
      { code: "B3", benefit: "Maintains healthy skin", botanical: false },
      { code: "C", benefit: "Supports collagen formation", botanical: false }
    ],
    layerColor: "#ffab91",
    layerHeight: 25
  },
  {
    id: "blackcurrant_acai",
    fn: "Thrive",
    name: "Blackcurrant & Açaí",
    tag: "Zero sugar",
    glassLabel: "Vitamin B1 · B3 · Antioxidants",
    vitamins: [
      { code: "B1", benefit: "Supports heart function", botanical: false },
      { code: "B3", benefit: "Maintains healthy skin", botanical: false },
      { code: "Antioxidants", benefit: "Green tea & Hibiscus extract", botanical: true }
    ],
    layerColor: "#6a1b9a",
    layerHeight: 25
  }
];
