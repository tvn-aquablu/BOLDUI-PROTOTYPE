import { useState } from "react";
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

const BOTANICAL_COLORS = {
  "Mint": "#4CAF50",
  "Berry": "#E91E63",
  "Chamomile": "#FFEB3B",
  "Hibiscus": "#D32F2F",
  "Pomegranate": "#B71C1C",
  "Peach": "#FFAB91",
  "Açaí": "#9C27B0",
  "Blackcurrant": "#4A148C",
  "Antioxidants": "#6a1b9a"
};

const NEED_STATES = [
  { id: "energized", label: "Get Energized", sub: "Boost focus and energy", boosts: ["caffeine", "electrolytes"], recommendedFlavorId: "blackcurrant_acai" },
  { id: "perform", label: "Perform Better", sub: "Power your physical performance", boosts: ["protein", "electrolytes"], recommendedFlavorId: "raspberry_pomegranate" },
  { id: "recover", label: "Recover Faster", sub: "Support muscle and joints", boosts: ["protein", "collagen"], recommendedFlavorId: "lemon_immunity" },
  { id: "look_feel", label: "Think sharp, look sharp", sub: "Glow from within", boosts: ["collagen", "caffeine"], recommendedFlavorId: "cucumber_yuzu_mint" },
];

export function CraftBuilder({ onDispense, onBack }) {
  const [step, setStep] = useState(0);
  const [needStateId, setNeedStateId] = useState(null);
  const [boosts, setBoosts] = useState([]);
  const [flavorId, setFlavorId] = useState(null);
  const [waterType, setWaterType] = useState("cold_still");
  const [volume, setVolume] = useState(500);
  const [intensity, setIntensity] = useState(3);

  const flavorObj = FLAVORS.find(f => f.id === flavorId);
  const selectedBoosts = boosts.map(id => BOOSTS.find(b => b.id === id)).filter(Boolean);

  const selectNeedState = (ns) => {
    setNeedStateId(ns.id);
    setBoosts(ns.boosts);
  };

  const handleNextStep = () => {
    if (step === 0) {
      // Transitioning to Step 2 (Flavour)
      const ns = NEED_STATES.find(n => n.id === needStateId);
      if (ns && !flavorId) {
        setFlavorId(ns.recommendedFlavorId);
      }
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else {
      onDispense({ flavor: flavorObj, boosts, waterType, volume, intensity });
    }
  };

  const canContinue = step === 0 ? !!needStateId : step === 1 ? !!flavorId : true;

  const getNutrientValue = (label) => {
    let total = 0;
    if (label === "Energy") return (boosts.length > 0 || flavorId) ? "0 kcal" : "";
    if (label === "Sugar") return (boosts.length > 0 || flavorId) ? "0 g" : "";
    if (label === "Sodium" && boosts.includes("electrolytes")) return "150 mg";
    if (label === "Potassium" && boosts.includes("electrolytes")) return "80 mg";
    if (label === "Magnesium" && boosts.includes("electrolytes")) return "56 mg";
    if (label === "Zinc" && boosts.includes("electrolytes")) return "5 mg";
    if (label === "Caffeine") {
      if (boosts.includes("caffeine")) total += 75;
      if (flavorObj?.vitamins.some(v => v.code === "Caffeine")) total += 25;
      return total > 0 ? `${total} mg` : "";
    }
    if (label === "Collagen" && boosts.includes("collagen")) return "5 g";
    if (label === "Protein" && boosts.includes("protein")) return "2 g";
    return "";
  };

  const nutrientLabels = ["Energy", "Sugar", "Sodium", "Potassium", "Magnesium", "Zinc", "Caffeine", "Collagen", "Protein"];
  const nutrientItems = (boosts.length > 0 || flavorId) ? nutrientLabels.map(label => ({ label, value: getNutrientValue(label) })).filter(n => n.value !== "") : [];

  const activeIngredients = [
    ...selectedBoosts.map(b => ({ name: b.ingredient, type: "boost" })),
    ...(flavorObj?.vitamins || []).map(v => ({ name: v.botanical ? v.code : `Vitamin ${v.code}`, type: "flavor" }))
  ];
return (
  <div style={{ 
    width: "1600px", 
    height: "1200px", 
    background: "#F8F9FC", 
    position: "relative", 
    fontFamily: "'Futura Now Text', system-ui, sans-serif", 
    color: "#16243E",
    overflow: "hidden" 
  }}>

    {/* Left Sidebar: Brand & Glass */}
    <div style={{ position: "absolute", left: "64px", top: "70px" }}>
      <div style={{ fontSize: "64px", fontWeight: "900", color: "#16243E", textTransform: "uppercase", lineHeight: "1", fontFamily: "'Futura Now Headline'" }}>
        Hydration
      </div>
      <div style={{ fontSize: "32px", fontWeight: "900", color: "#1EDCF8", textTransform: "uppercase", marginTop: "14px", letterSpacing: "-0.64px", fontFamily: "'Futura Now Headline'" }}>
        Tailored to your needs
      </div>
    </div>

      <div style={{ position: "absolute", left: "64px", top: "204px", width: "537px", height: "932px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, display: "flex", flexDirection: "column", gap: "24px", paddingTop: "20px" }}>
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

        <div style={{ position: "absolute", left: "200px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ transform: "scale(2.2)" }}>
            <GlassViz boostLayers={selectedBoosts} flavorObj={flavorObj} waterType={waterType} volume={volume} animPhase={step + 1} />
          </div>
        </div>
      </div>

      <div 
        style={{ 
          position: "absolute", 
          right: "64px", 
          top: "64px", 
          width: "911px", 
          height: "1072px", 
          background: "#fefefe", 
          borderRadius: "20px", 
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div style={{ width: "100%" }}>
          <div style={{ marginBottom: "64px" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "8px" }}>
              Step {step + 1} - {step === 0 ? "Selection" : step === 1 ? "Flavour" : "Water Type"}
            </div>
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              <div style={{ height: "16px", borderRadius: "4px", width: "200px", background: step >= 0 ? "#8e8e9e" : "#e8e8ef" }} />
              <div style={{ height: "16px", borderRadius: "4px", width: "60px", background: step >= 1 ? "#8e8e9e" : "#e8e8ef" }} />
              <div style={{ height: "16px", borderRadius: "4px", width: "60px", background: step >= 2 ? "#8e8e9e" : "#e8e8ef" }} />
            </div>
          </div>

          {step === 0 && (
            <div>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#16243E", marginBottom: "16px", letterSpacing: "-0.72px", fontFamily: "'Futura Now Headline'" }}>
                What does your body need?
              </div>
              <div style={{ fontSize: "28px", fontWeight: "400", color: "#626573", marginBottom: "48px" }}>
                Select what you need to optimize your hydration
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                {NEED_STATES.map(ns => {
                  const isSelected = needStateId === ns.id;
                  return (
                    <button 
                      key={ns.id} 
                      onClick={() => selectNeedState(ns)}
                      style={{ 
                        height: "200px", 
                        background: isSelected ? "#e8e8ef" : "#f5f5f7", 
                        borderRadius: "24px", 
                        border: isSelected ? "2px solid #000" : "none",
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1d1d1f" }}>{ns.label}</div>
                      <div style={{ fontSize: "16px", fontWeight: "500", color: "#86868d", marginTop: "4px" }}>{ns.sub}</div>
                    </button>
                  );
                })}
              </div>

              {needStateId && (
                <div style={{ marginTop: "48px", animation: "fadeIn 0.5s ease" }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "16px" }}>Included Boosts</div>
                  <div style={{ display: "flex", gap: "16px" }}>
                    {selectedBoosts.map(b => (
                      <div key={b.id} style={{ flex: 1, background: "#fff", border: "1px solid #e8e8ef", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "#fff" }}>✓</div>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#000" }}>{b.name}</div>
                          <div style={{ fontSize: "12px", color: "#86868d" }}>{b.marketingSub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#000000", marginBottom: "16px" }}> Select your flavour</div>
              <div style={{ fontSize: "28px", fontWeight: "400", color: "#1d1d1f", marginBottom: "8px" }}>Made with real botanical extracts</div>
              <div style={{ fontSize: "16px", color: "#86868d", fontWeight: "bold", marginBottom: "32px", textTransform: "uppercase", letterSpacing: "1px" }}>
                ✨ We've preselected our recommendation for you
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "720px" }}>
                {FLAVORS.map(f => {
                  const isSelected = flavorId === f.id;
                  const isAnySelected = flavorId !== null;
                  let imgName = "";
                  if (f.fn === "Glow") imgName = "glow1.jpg";
                  else if (f.fn === "Unwind") imgName = "unwind3.jpg";
                  else if (f.fn === "Balance") imgName = "balance3.jpg";
                  else if (f.fn === "Immunity") imgName = "immunity1.jpg";
                  else if (f.fn === "Refresh") imgName = "refresh1.jpg";
                  else if (f.fn === "Thrive") imgName = "thrive2.jpg";
                  const bgUrl = `url("/Flavour Images/${imgName}")`;

                  return (
                    <div key={f.id} onClick={() => setFlavorId(flavorId === f.id ? null : f.id)} style={{ flex: isSelected ? 8 : 1, display: "flex", overflow: "hidden", borderRadius: "24px", transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", background: isSelected ? "#fff" : "#f5f5f7", border: "none", cursor: "pointer" }}>
                      <div style={{ width: isSelected ? "240px" : (isAnySelected ? "60px" : "180px"), height: "100%", background: `${bgUrl} center/cover`, transition: "width 0.6s ease", flexShrink: 0 }} />
                      <div style={{ flex: 1, padding: isSelected ? "24px" : "12px 24px", display: "flex", flexDirection: "column", justifyContent: isSelected ? "flex-start" : "center", transition: "all 0.6s ease" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <div style={{ fontSize: isAnySelected && !isSelected ? "16px" : "24px", color: "#000", transition: "font-size 0.6s" }}>
                              <span style={{ fontWeight: "bold" }}>{f.fn}</span>
                              <span style={{ fontWeight: "400", opacity: 0.8 }}> — {f.name}</span>
                            </div>
                            <div style={{ fontSize: "14px", color: "#86868d", fontWeight: "500", transition: "opacity 0.6s" }}>{f.glassLabel} · {f.tag}</div>
                          </div>
                          <div style={{ width: isAnySelected && !isSelected ? "32px" : "48px", height: isAnySelected && !isSelected ? "32px" : "48px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isAnySelected && !isSelected ? "18px" : "24px", color: "#fff", transition: "all 0.6s ease", flexShrink: 0 }}>
                            {isSelected ? "−" : "+"}
                          </div>
                        </div>
                        {isSelected && (
                          <div style={{ marginTop: "24px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                              {f.vitamins.map((v, i) => (
                                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: v.botanical ? (BOTANICAL_COLORS[v.code] || "#f0f9f0") : "#f0f4f9", color: v.botanical ? "transparent" : "#2d4a5a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold", flexShrink: 0 }}>
                                    {!v.botanical && v.code}
                                  </div>
                                  <div style={{ fontSize: "14px", color: "#1d1d1f", lineHeight: "1.4" }}>{v.benefit}</div>
                                </div>
                              ))}
                            </div>
                            <div style={{ marginTop: "32px", paddingTop: "24px" }}>
                              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
                                <span>Flavour intensity</span>
                                <span style={{ fontSize: "12px", textTransform: "none", color: "#86868d" }}>Low ↔ High</span>
                              </div>
                              <div style={{ display: "flex", gap: "12px" }}>
                                {[1, 2, 3, 4, 5].map(lvl => {
                                  const isDisabled = lvl === 1 || lvl === 5;
                                  const isSelectedLvl = intensity === lvl;
                                  return (
                                    <button key={lvl} disabled={isDisabled} onClick={(e) => { e.stopPropagation(); setIntensity(lvl); }} style={{ width: "64px", height: "64px", borderRadius: "16px", background: isSelectedLvl ? "#000" : "#f5f5f7", color: isSelectedLvl ? "#fff" : (isDisabled ? "#d2d2d7" : "#1d1d1f"), border: "none", fontSize: "20px", fontWeight: "bold", cursor: isDisabled ? "not-allowed" : "pointer", fontFamily: "inherit", position: "relative" }}>
                                      {lvl}
                                      {isDisabled && <div style={{ position: "absolute", bottom: "4px", fontSize: "10px", width: "100%", textAlign: "center", color: "#d2d2d7" }}>🔒</div>}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#000000", marginBottom: "16px" }}>How do you want it served?</div>
              <div style={{ fontSize: "28px", fontWeight: "400", color: "#1d1d1f", marginBottom: "64px" }}>Pick your water style and glass size</div>
              <div style={{ marginBottom: "40px" }}>
                <div style={{ fontSize: "14px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "16px" }}>Water style</div>
                <div style={{ display: "flex", gap: "12px" }}>
                  {WATER_TYPES.map(w => (
                    <button key={w.id} onClick={() => setWaterType(w.id)} style={{ padding: "16px 32px", borderRadius: "40px", background: waterType === w.id ? "#000" : "#f5f5f7", color: waterType === w.id ? "#fff" : "#1d1d1f", border: "none", fontSize: "18px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit" }}>{w.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "bold", color: "#8e8e9e", textTransform: "uppercase", marginBottom: "16px" }}>Volume</div>
                <div style={{ display: "flex", gap: "20px" }}>
                  {VOLUMES.map(v => (
                    <button key={v.ml} onClick={() => setVolume(v.ml)} style={{ width: "100px", height: "100px", borderRadius: "50%", background: volume === v.ml ? "#000" : "#f5f5f7", color: volume === v.ml ? "#fff" : "#1d1d1f", border: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>{v.ml >= 1000 ? "1L" : v.ml}</div>
                      <div style={{ fontSize: "12px", opacity: 0.8 }}>ml</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ width: "100%" }}>
          {step === 2 && (
            <div style={{ marginBottom: "32px", background: "#f5f9fc", borderRadius: "24px", padding: "24px", display: "flex", alignItems: "center", gap: "20px", border: "1px solid #d6ebf7" }}>
              <div style={{ width: "56px", height: "56px", background: "#fff", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", boxShadow: "0 4px 12px rgba(214,235,247,0.5)", flexShrink: 0 }}>📱</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1d1d1f" }}>Love this combination?</div>
                <div style={{ fontSize: "14px", color: "#5a7a8a", fontWeight: "500", marginTop: "2px" }}>Save it to your profile in the Aquablu app and craft it with one tap next time.</div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={step > 0 ? () => setStep(s => s - 1) : onBack} style={{ background: "none", border: "none", color: "#86868d", fontSize: "20px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
            <button 
              disabled={!canContinue}
              onClick={handleNextStep}
              style={{ 
                background: "#000", 
                color: "#fff", 
                padding: "20px 40px", 
                borderRadius: "40px", 
                border: "none", 
                fontSize: "20px", 
                fontWeight: "bold", 
                cursor: canContinue ? "pointer" : "not-allowed",
                opacity: canContinue ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "inherit"
              }}
            >
              {step === 2 ? "Dispense Drink" : "Next Step"}
              <ArrowIcon color="#fff" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
