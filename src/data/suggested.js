export const SUGGESTED_DRINKS = {
  community: [
    { 
      label: "Most popular right now", 
      sub: "Ordered 18× this morning", 
      flavorId: "lemon_immunity", 
      boostIds: ["electrolytes"], 
      waterType: "cold_still", 
      volume: 500 
    },
    { 
      label: "Afternoon favourite", 
      sub: "Top pick after 2pm here", 
      flavorId: "cucumber_yuzu_mint", 
      boostIds: ["caffeine", "collagen"], 
      waterType: "sparkling", 
      volume: 200 
    },
    { 
      label: "Trending this week", 
      sub: "Rising fast across machines", 
      flavorId: "blackcurrant_acai", 
      boostIds: ["protein"], 
      waterType: "light_sparkling", 
      volume: 500 
    },
  ],
  app: [
    { label: "Based on your sleep score", sub: "Oura: 5.8h sleep — low recovery", flavorId: "lemon_immunity", boostIds: ["collagen", "electrolytes"], waterType: "ambient_still", volume: 500 },
    { label: "Post-workout recovery", sub: "Whoop: 45min strength session", flavorId: "blackcurrant_acai", boostIds: ["collagen", "electrolytes"], waterType: "cold_still", volume: 500 },
  ],
};
