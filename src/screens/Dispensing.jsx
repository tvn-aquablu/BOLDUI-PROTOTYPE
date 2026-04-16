import { useState, useEffect } from "react";
import { GlassViz } from "../components/GlassViz";
import { BOOSTS } from "../data/boosts";

// Assets from Figma extraction
const imgImage118 = "http://localhost:3845/assets/6c436d3a9e49c204436abbf3b632e1620f2f74b8.png";
const imgVector1 = "http://localhost:3845/assets/fb951f12fefa6c84de169f161f045370e1d382c0.svg";
const imgVector2 = "http://localhost:3845/assets/81da222f02949c730b8c6d588dfbafe73438cb19.svg";
const imgVector3 = "http://localhost:3845/assets/b422ff535c75b3a2323f3ecd306d39223207aa08.svg";
const imgVector4 = "http://localhost:3845/assets/5cb5d2b6456a7b3e09ed44c05660c57bfa1cd298.svg";
const imgVector5 = "http://localhost:3845/assets/8b96bd31e35d46ef21eb1bbe3b0324826470904e.svg";
const imgVector6 = "http://localhost:3845/assets/361cabd3a93a99e1e26aa07927f0d4a24c006971.svg";

// Precise coordinates from Figma metadata
const SLOTS = [
  // Left side
  { x: 321, y: 402, side: "left", lineSrc: imgVector2, lineProps: { x: 488, y: 434, w: 216, h: 1 } },
  { x: 321, y: 589, side: "left", lineSrc: imgVector5, lineProps: { x: 488, y: 609, w: 198, h: 1 } },
  { x: 321, y: 805, side: "left", lineSrc: imgVector4, lineProps: { x: 488, y: 781, w: 271, h: 43, transform: "scaleY(-1)" } },
  // Right side
  { x: 1124, y: 423, side: "right", lineSrc: imgVector1, lineProps: { x: 866, y: 438, w: 231, h: 124 } },
  { x: 1124, y: 609, side: "right", lineSrc: imgVector6, lineProps: { x: 902, y: 619, w: 195, h: 60, transform: "scaleY(-1)" } },
  { x: 1124, y: 759, side: "right", lineSrc: imgVector3, lineProps: { x: 870, y: 728, w: 227, h: 41, transform: "scaleY(-1)" } },
];

export function Dispensing({ config, onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => { 
    const t = setInterval(() => setProgress(p => { 
      if (p >= 100) { clearInterval(t); return 100; } 
      return p + 1; 
    }), 50); 
    return () => clearInterval(t); 
  }, []);

  const done = progress >= 100;

  // Extract all active ingredients
  const boostLayers = (config.boostLayers || config.boosts?.map(id => BOOSTS.find(b => b.id === id)) || []).filter(Boolean);
  const flavorVits = config.flavor?.vitamins || [];

  const allIngredients = [
    ...boostLayers.map(b => ({ title: b.ingredient, desc: b.benefit })),
    ...flavorVits.map(v => ({ 
      title: v.botanical ? v.code : `Vitamin ${v.code}`, 
      desc: v.benefit 
    }))
  ].slice(0, 6); // Max 6 visual slots

  return (
    <div style={{ 
      width: "1600px", 
      height: "1200px", 
      background: "#f5f5f7", 
      position: "relative", 
      fontFamily: "'Futura Now Headline', system-ui, sans-serif", 
      overflow: "hidden" 
    }}>
      
      {/* Header */}
      <div style={{ position: "absolute", left: "64px", top: "70px" }}>
        <div style={{ fontSize: "64px", fontWeight: "900", color: "#000000", textTransform: "uppercase", lineHeight: "1" }}>
          {done ? "Ready" : "Hydration"}
        </div>
        <div style={{ fontSize: "32px", fontWeight: "900", color: "#9999a4", textTransform: "uppercase", marginTop: "14px", letterSpacing: "-0.64px" }}>
          {done ? "Enjoy your drink" : "Tailored to your needs"}
        </div>
      </div>

      {/* Dynamic Glass Visual */}
      <div style={{ position: "absolute", left: "608px", top: "232px", width: "377px", height: "814px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "scale(2.5)" }}>
          <GlassViz 
            boostLayers={boostLayers}
            flavorObj={config.flavor}
            waterType={config.waterType}
            volume={config.volume}
            fillProgress={progress}
            animPhase={3}
          />
        </div>
      </div>

      {/* Dynamic Ingredient Slots */}
      {allIngredients.map((item, i) => {
        const slot = SLOTS[i];
        const isVisible = progress >= (i + 1) * 12;
        
        return (
          <div key={i} style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease-in" }}>
            {/* Pointer Line */}
            <div style={{ 
              position: "absolute", 
              left: `${slot.lineProps.x}px`, 
              top: `${slot.lineProps.y}px`, 
              width: `${slot.lineProps.w}px`, 
              height: `${slot.lineProps.h}px`,
              transform: slot.lineProps.transform
            }}>
              <img src={slot.lineSrc} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
            </div>

            {/* Text Box */}
            <div style={{ 
              position: "absolute", 
              left: `${slot.x}px`, 
              top: `${slot.y}px`, 
              width: "190px",
              textAlign: slot.side
            }}>
              <div style={{ 
                fontSize: "24.7px", 
                fontWeight: "600", 
                fontFamily: "Inter, sans-serif", 
                color: "#000",
                letterSpacing: "-0.99px",
                lineHeight: "30px"
              }}>
                {item.title}
              </div>
              <div style={{ 
                fontSize: "17.3px", 
                fontWeight: "400", 
                fontFamily: "Inter, sans-serif", 
                color: "#000",
                letterSpacing: "-0.69px",
                lineHeight: "1.2",
                marginTop: "4px"
              }}>
                {item.desc}
              </div>
            </div>
          </div>
        );
      })}

      {/* Progress Footer */}
      <div style={{ position: "absolute", bottom: "64px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {done ? (
          <button 
            onClick={onDone}
            style={{ 
              background: "#000", 
              color: "#fff", 
              padding: "16px 64px", 
              borderRadius: "60px", 
              border: "none",
              fontSize: "24px",
              fontWeight: "800",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.48px"
            }}
          >
            Finish
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#86868d", textTransform: "uppercase", letterSpacing: "0.48px" }}>
              Pouring... {progress}%
            </div>
            <div style={{ width: "400px", height: "6px", background: "#e8e8ef", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "#000", transition: "width 0.05s linear" }} />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
