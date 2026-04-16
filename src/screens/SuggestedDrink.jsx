import { useState } from "react";
import { useC } from "../components/ThemeProvider";
import { GlassViz } from "../components/GlassViz";
import { BOOSTS } from "../data/boosts";
import { FLAVORS } from "../data/flavors";
import { SUGGESTED_DRINKS } from "../data/suggested";

const ArrowIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function SuggestedDrink({ onDispense, onBack }) {
  const C = useC();
  const [source, setSource] = useState("community");
  const [selected, setSelected] = useState(null);
  const suggestions = SUGGESTED_DRINKS[source];

  const buildConfig = (sug) => {
    const fl = FLAVORS.find(f => f.id === sug.flavorId);
    const bl = sug.boostIds.map(id => BOOSTS.find(b => b.id === id)).filter(Boolean);
    return { boosts: sug.boostIds, boostLayers: bl, flavor: fl, waterType: sug.waterType, volume: sug.volume };
  };

  const sel = selected !== null ? suggestions[selected] : null;
  const config = sel ? buildConfig(sel) : null;

  const getNutrientValue = (cfg) => (label) => {
    if (!cfg) return "";
    let total = 0;
    if (label === "Energy") return "0 kcal";
    if (label === "Sugar") return "0 g";
    if (label === "Sodium") {
      if (cfg.boosts.includes("electrolytes")) total += 150;
      return total > 0 ? `${total} mg` : "";
    }
    if (label === "Potassium") {
      if (cfg.boosts.includes("electrolytes")) total += 80;
      return total > 0 ? `${total} mg` : "";
    }
    if (label === "Caffeine") {
      if (cfg.boosts.includes("caffeine")) total += 75;
      return total > 0 ? `${total} mg` : "";
    }
    if (label === "Collagen") {
      if (cfg.boosts.includes("collagen")) total += 5;
      return total > 0 ? `${total} g` : "";
    }
    if (label === "Protein") {
      if (cfg.boosts.includes("protein")) total += 2;
      return total > 0 ? `${total} g` : "";
    }
    return "";
  };

  const nutrientLabels = ["Energy", "Sugar", "Sodium", "Potassium", "Caffeine", "Collagen", "Protein"];
  const nutrientItems = config ? nutrientLabels.map(label => ({ label, value: getNutrientValue(config)(label) })).filter(n => n.value !== "") : [];

  const activeIngredients = config ? [
    ...config.boostLayers.map(b => ({ name: b.ingredient, type: "boost" })),
    ...(config.flavor?.vitamins || []).map(v => ({ name: v.botanical ? v.code : `Vitamin ${v.code}`, type: "flavor" }))
  ] : [];

  return (
    <div style={{ width: "1600px", height: "1200px", background: "#f5f5f7", position: "relative", fontFamily: "'Futura Now Headline', system-ui, sans-serif", overflow: "hidden", display: "flex" }}>
      
      <div style={{ width: "600px", height: "100%", position: "relative", padding: "64px" }}>
        <div style={{ marginBottom: "64px" }}>
          <div style={{ fontSize: "64px", fontWeight: "900", color: "#000000", textTransform: "uppercase", lineHeight: "1" }}>
            Hydration
          </div>
          <div style={{ fontSize: "32px", fontWeight: "900", color: "#9999a4", textTransform: "uppercase", marginTop: "14px", letterSpacing: "-0.64px" }}>
            Suggested for you
          </div>
        </div>

        <div style={{ position: "relative", height: "800px" }}>
          <div style={{ position: "absolute", left: 0, top: 0, display: "flex", flexDirection: "column", gap: "24px", zIndex: 10 }}>
            {nutrientItems.length > 0 && (
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "-8px", paddingLeft: "8px" }}>Nutrients</div>
            )}
            {nutrientItems.map((n, i) => (
              <div key={i} style={{ padding: "0 8px" }}>
                <div style={{ fontSize: "16px", fontWeight: "500", color: "#000000" }}>{n.value}</div>
                <div style={{ fontSize: "16px", fontWeight: "400", color: "#86868d" }}>{n.label}</div>
              </div>
            ))}

            {activeIngredients.length > 0 && (
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginTop: "16px", marginBottom: "-8px", paddingLeft: "8px" }}>Active Ingredients</div>
            )}
            {activeIngredients.map((ing, i) => (
              <div key={i} style={{ padding: "0 8px" }}>
                <div style={{ fontSize: "16px", fontWeight: "500", color: "#000000" }}>{ing.name}</div>
                <div style={{ fontSize: "12px", fontWeight: "400", color: ing.type === "boost" ? "#2d4a5a" : "#86868d" }}>
                  {ing.type === "boost" ? "Selected Boost" : "Flavor Profile"}
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", left: "140px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "scale(2.2)" }}>
              <GlassViz 
                boostLayers={config?.boostLayers || []} 
                flavorObj={config?.flavor || null} 
                waterType={config?.waterType || "cold_still"} 
                volume={config?.volume || 500} 
                animPhase={config ? 2 : 0} 
              />
            </div>
          </div>
        </div>
      </div>

      <div 
        style={{ 
          flex: 1, 
          margin: "64px 64px 64px 0",
          background: "#fefefe", 
          borderRadius: "20px", 
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 4px 24px rgba(0,0,0,0.02)"
        }}
      >
        <div style={{ width: "100%" }}>
          <div style={{ marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={onBack} style={{ background: "none", border: "none", color: "#86868d", cursor: "pointer", fontSize: "24px", fontWeight: "600", fontFamily: "inherit" }}>← Back</button>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", background: "#f5f5f7", borderRadius: "100px", padding: "6px", border: "1px solid #e8e8ef" }}>
              {[{ id: "community", label: "Popular here", icon: "🔥" }, { id: "app", label: "From your health data", icon: "📱" }].map(s => (
                <button 
                  key={s.id} 
                  onClick={() => { setSource(s.id); setSelected(null); }} 
                  style={{ 
                    fontFamily: "inherit", 
                    background: source === s.id ? "#000" : "transparent", 
                    color: source === s.id ? "#fff" : "#86868d", 
                    border: "none", 
                    borderRadius: "100px", 
                    padding: "16px 32px", 
                    cursor: "pointer", 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    transition: "all 0.2s", 
                    whiteSpace: "nowrap" 
                  }}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "680px", overflowY: "auto", paddingRight: "10px" }}>
            {suggestions.map((sug, i) => {
              const fl = FLAVORS.find(f => f.id === sug.flavorId);
              const bls = sug.boostIds.map(id => BOOSTS.find(b => b.id === id)).filter(Boolean);
              const active = selected === i;

              let imgName = "";
              if (fl?.fn === "Focus") imgName = "focus3.jpg";
              else if (fl?.fn === "Unwind") imgName = "unwind3.jpg";
              else if (fl?.fn === "Balance") imgName = "balance3.jpg";
              else if (fl?.fn === "Immunity") imgName = "immunity1.jpg";
              else if (fl?.fn === "Refresh") imgName = "refresh1.jpg";
              else if (fl?.fn === "Thrive") imgName = "thrive2.jpg";
              const bgUrl = `url("/Flavour Images/${imgName}")`;
              
              return (
                <button 
                  key={i} 
                  onClick={() => setSelected(i)} 
                  style={{ 
                    fontFamily: "inherit", 
                    background: active ? "#fefefe" : "#f5f5f7", 
                    border: active ? "4px solid #000" : "none", 
                    borderRadius: "24px", 
                    padding: "0", 
                    cursor: "pointer", 
                    textAlign: "left", 
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    height: "140px"
                  }}
                >
                  <div style={{ width: "160px", height: "100%", background: `${bgUrl} center/cover`, flexShrink: 0 }} />
                  
                  <div style={{ flex: 1, padding: "0 24px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "4px" }}>{sug.label}</div>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#000", lineHeight: "1.1" }}>
                      {bls.length > 0 ? bls.map(b => b.name).join(" + ") : "Pure Hydration"}
                    </div>
                    <div style={{ fontSize: "16px", color: "#86868d", marginTop: "4px", fontWeight: "500" }}>
                      with {fl?.fn} flavour
                    </div>
                  </div>

                  <div style={{ padding: "0 24px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {active ? <span style={{ color: "#fff", fontSize: "20px" }}>−</span> : <span style={{ color: "#fff", fontSize: "20px" }}>+</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <button 
              disabled={selected === null} 
              onClick={() => onDispense(config)} 
              style={{ background: "#000", color: "#fff", padding: "20px 40px", borderRadius: "40px", border: "none", fontSize: "20px", fontWeight: "bold", cursor: selected !== null ? "pointer" : "not-allowed", opacity: selected !== null ? 1 : 0.5, display: "flex", alignItems: "center", gap: "12px", fontFamily: "inherit" }}
            >
              Dispense Drink
              <ArrowIcon color="#fff" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
