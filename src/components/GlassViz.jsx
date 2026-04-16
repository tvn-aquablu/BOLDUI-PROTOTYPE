import { useC } from "./ThemeProvider";

/**
 * Reworked GlassViz - Consistent with Premium Kiosk Style Guide
 * Uses a realistic glass silhouette, standard radii (24px logic), 
 * and established typography (Inter).
 */
export function GlassViz({ boostLayers, flavorObj, waterType, volume, animPhase, fillProgress }) {
  const C = useC();
  
  // Dimensions and Scale
  const maxH = 280; 
  const glassW = 110;
  const borderRadius = 32; // Matching the prominent callout radius from Entry screen
  
  const bLayers = boostLayers || [];
  const fLayer = flavorObj ? { 
    label: flavorObj.fn.toUpperCase(), 
    color: flavorObj.layerColor, 
    height: flavorObj.layerHeight * 1.5 // Scaling up for better visibility
  } : null;

  const allLayers = [
    ...bLayers.map(b => ({ label: b.glassLabel.toUpperCase(), color: b.color, height: b.height * 1.5 })),
    ...(fLayer ? [fLayer] : [])
  ];

  const totalIngH = allLayers.reduce((s, l) => s + l.height, 0);
  const waterBase = (animPhase >= 3) ? 30 : 0;
  const rem = maxH - totalIngH - waterBase;
  const waterFill = fillProgress != null ? (rem * Math.min(fillProgress, 100) / 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      
      {/* Glass Container */}
      <div style={{ 
        width: glassW + 16, 
        height: maxH + 40, 
        position: "relative", 
        display: "flex", 
        alignItems: "flex-end", 
        justifyContent: "center" 
      }}>
        
        {/* The Glass Outer Shell */}
        <div style={{ 
          width: glassW, 
          height: maxH, 
          border: `3px solid rgba(255,255,255,0.8)`,
          borderTop: "none",
          borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)",
          backdropFilter: "blur(2px)",
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.05)"
        }}>
          
          {/* Glass Gloss/Reflection Effect */}
          <div style={{ 
            position: "absolute", 
            top: 0, 
            left: "10%", 
            width: "20%", 
            height: "100%", 
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            zIndex: 3,
            pointerEvents: "none"
          }} />

          {/* Liquid Stacking Logic */}
          <div style={{ 
            position: "absolute", 
            bottom: 0, 
            left: 0, 
            right: 0, 
            display: "flex", 
            flexDirection: "column-reverse", 
            zIndex: 2 
          }}>
            
            {/* 1. Base Water (Always present if anything added) */}
            {waterBase > 0 && (
              <div style={{ 
                height: waterBase, 
                background: "rgba(214, 235, 247, 0.4)", // Matching callout blue logic
                transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTop: "1px solid rgba(255,255,255,0.3)"
              }}>
                <span style={{ fontSize: 10, color: "#1d1d1f", fontWeight: 800, letterSpacing: "0.5px", opacity: 0.5 }}>WATER</span>
              </div>
            )}

            {/* 2. Dynamic Boosts */}
            {bLayers.map((b, i) => (
              <div key={b.id + i} style={{ 
                height: b.height * 1.5, 
                background: b.color, 
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", 
                transitionDelay: `${i * 0.1}s`,
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                overflow: "hidden", 
                borderTop: "1px solid rgba(255,255,255,0.2)" 
              }}>
                <span style={{ 
                  fontSize: 12, 
                  color: "#fff", 
                  fontWeight: 700, 
                  fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase", 
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap"
                }}>{b.glassLabel}</span>
              </div>
            ))}

            {/* 3. Flavor Profile */}
            {fLayer && (
              <div style={{ 
                height: fLayer.height, 
                background: `linear-gradient(180deg, ${fLayer.color}dd, ${fLayer.color})`, 
                transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)", 
                transitionDelay: `${bLayers.length * 0.1}s`,
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                overflow: "hidden", 
                borderTop: "1px solid rgba(255,255,255,0.2)" 
              }}>
                <span style={{ 
                  fontSize: 12, 
                  color: "#fff", 
                  fontWeight: 700, 
                  fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase", 
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap"
                }}>{fLayer.label}</span>
              </div>
            )}

            {/* 4. Dispensing Progress (Animated Fill) */}
            {waterFill > 0 && (
              <div style={{ 
                height: waterFill, 
                background: "rgba(214, 235, 247, 0.6)", 
                transition: "height 0.3s linear", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                overflow: "hidden" 
              }}>
                {waterFill > 30 && (
                  <span style={{ 
                    fontSize: 12, 
                    color: "#1d1d1f", 
                    fontWeight: 800, 
                    textTransform: "uppercase",
                    opacity: 0.6 
                  }}>{waterType?.replace("_", " ")}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Realistic Top Rim Rim */}
        <div style={{ 
          position: "absolute", 
          top: 38, 
          width: glassW + 4, 
          height: 8, 
          background: "rgba(255,255,255,0.4)", 
          borderRadius: "50%", 
          border: "2px solid rgba(255,255,255,0.8)",
          zIndex: 4 
        }} />
      </div>
    </div>
  );
}
