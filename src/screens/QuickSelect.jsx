import { useState } from "react";
import { useC } from "../components/ThemeProvider";
import { GlassViz } from "../components/GlassViz";
import { BOOSTS } from "../data/boosts";
import { FLAVORS } from "../data/flavors";
import { WATER_TYPES, VOLUMES } from "../data/water";

// Correct SVG arrow icon
const ArrowIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function QuickSelect({ onDispense, onBack }) {
  const C = useC();
  const [boosts, setBoosts] = useState([]);
  const [flavorId, setFlavorId] = useState(null);
  const [waterType, setWaterType] = useState("cold_still");
  const [volume, setVolume] = useState(500);

  const toggleBoost = (id) => setBoosts(s => s.includes(id) ? s.filter(x => x !== id) : s.length < 2 ? [...s, id] : s);
  const boostLayers = boosts.map(id => BOOSTS.find(b => b.id === id)).filter(Boolean);
  const flavorObj = FLAVORS.find(f => f.id === flavorId);

  // Calculate dynamic nutrients (Mirroring logic)
  const getNutrientValue = (label) => {
    let total = 0;
    if (label === "Energy") return (boosts.length > 0 || flavorId) ? "0 kcal" : "";
    if (label === "Sugar") return (boosts.length > 0 || flavorId) ? "0 g" : "";
    if (label === "Sodium") {
      if (boosts.includes("electrolytes")) total += 150;
      return total > 0 ? `${total} mg` : "";
    }
    if (label === "Potassium") {
      if (boosts.includes("electrolytes")) total += 80;
      return total > 0 ? `${total} mg` : "";
    }
    if (label === "Caffeine") {
      if (boosts.includes("caffeine")) total += 75;
      return total > 0 ? `${total} mg` : "";
    }
    if (label === "Collagen") {
      if (boosts.includes("collagen")) total += 5;
      return total > 0 ? `${total} g` : "";
    }
    if (label === "Protein") {
      if (boosts.includes("protein")) total += 2;
      return total > 0 ? `${total} g` : "";
    }
    return "";
  };

  const nutrientLabels = ["Energy", "Sugar", "Sodium", "Potassium", "Caffeine", "Collagen", "Protein"];
  const nutrientItems = (boosts.length > 0 || flavorId) ? nutrientLabels.map(label => ({ label, value: getNutrientValue(label) })).filter(n => n.value !== "") : [];

  const activeIngredients = [
    ...boostLayers.map(b => ({ name: b.ingredient, type: "boost" })),
    ...(flavorObj?.vitamins || []).map(v => ({ name: v.botanical ? v.code : `Vitamin ${v.code}`, type: "flavor" }))
  ];

  return (
    <div style={{ width: "1600px", height: "1200px", background: "#f5f5f7", position: "relative", fontFamily: "'Futura Now Headline', system-ui, sans-serif", overflow: "hidden", display: "flex" }}>
      
      {/* Left Sidebar: Brand & Preview */}
      <div style={{ width: "600px", height: "100%", position: "relative", padding: "64px" }}>
        <div style={{ marginBottom: "64px" }}>
          <div style={{ fontSize: "64px", fontWeight: "900", color: "#000000", textTransform: "uppercase", lineHeight: "1" }}>
            Hydration
          </div>
          <div style={{ fontSize: "32px", fontWeight: "900", color: "#9999a4", textTransform: "uppercase", marginTop: "14px", letterSpacing: "-0.64px" }}>
            Quick Select
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
                boostLayers={boostLayers} 
                flavorObj={flavorObj} 
                waterType={waterType} 
                volume={volume} 
                animPhase={flavorId || boosts.length > 0 ? 2 : 0} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Content: Quick Controls */}
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
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "48px" }}>
          <div>
            <button onClick={onBack} style={{ background: "none", border: "none", color: "#86868d", cursor: "pointer", fontSize: "24px", fontWeight: "600", fontFamily: "inherit" }}>← Back</button>
          </div>

          {/* Boosts */}
          <div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "16px" }}>Add Boosts (Max 2)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {BOOSTS.map(b => {
                const active = boosts.includes(b.id);
                return (
                  <button key={b.id} onClick={() => toggleBoost(b.id)} style={{ fontFamily: "inherit", background: active ? "#000" : "#f5f5f7", color: active ? "#fff" : "#1d1d1f", border: "none", borderRadius: "16px", padding: "16px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                    <div style={{ fontSize: "16px", fontWeight: "bold" }}>{b.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flavours */}
          <div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "16px" }}>Select Flavour</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {FLAVORS.map(f => (
                <button key={f.id} onClick={() => setFlavorId(flavorId === f.id ? null : f.id)} style={{ fontFamily: "inherit", background: flavorId === f.id ? "#000" : "#f5f5f7", color: flavorId === f.id ? "#fff" : "#1d1d1f", border: "none", borderRadius: "16px", padding: "16px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>{f.fn}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Water & Volume */}
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "16px" }}>Water Style</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                {WATER_TYPES.map(w => (
                  <button key={w.id} onClick={() => setWaterType(w.id)} style={{ fontFamily: "inherit", background: waterType === w.id ? "#000" : "#f5f5f7", color: waterType === w.id ? "#fff" : "#1d1d1f", border: "none", borderRadius: "100px", padding: "12px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}>{w.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "16px" }}>Volume</div>
              <div style={{ display: "flex", gap: "12px" }}>
                {VOLUMES.map(v => (
                  <button key={v.ml} onClick={() => setVolume(v.ml)} style={{ fontFamily: "inherit", width: "64px", height: "64px", borderRadius: "50%", background: volume === v.ml ? "#000" : "#f5f5f7", color: volume === v.ml ? "#fff" : "#1d1d1f", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold" }}>{v.ml >= 1000 ? "1L" : v.ml}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button 
            disabled={!flavorId} 
            onClick={() => onDispense({ flavor: flavorObj, boosts, waterType, volume, intensity: 3 })} 
            style={{ background: "#000", color: "#fff", padding: "20px 40px", borderRadius: "40px", border: "none", fontSize: "20px", fontWeight: "bold", cursor: flavorId ? "pointer" : "not-allowed", opacity: flavorId ? 1 : 0.5, display: "flex", alignItems: "center", gap: "12px", fontFamily: "inherit" }}
          >
            Dispense Drink
            <ArrowIcon color="#fff" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
