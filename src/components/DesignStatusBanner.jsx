import { useState } from "react";

// Edit this config to update status for each screen as Figma designs are applied
export const STATUS_CONFIG = {
  "Screensaver": { status: "WIREFRAME", note: "no Figma design applied yet" },
  "EntryChoice": { status: "WIREFRAME", note: "no Figma design applied yet" },
  "CraftBuilder": { status: "WIREFRAME", note: "no Figma design applied yet" },
  "SuggestedDrink": { status: "WIREFRAME", note: "no Figma design applied yet" },
  "QuickSelect": { status: "WIREFRAME", note: "no Figma design applied yet" },
  "Dispensing": { status: "WIREFRAME", note: "no Figma design applied yet" },
};

export function DesignStatusBanner({ screenName }) {
  const [dismissed, setDismissed] = useState(false);
  const config = STATUS_CONFIG[screenName];
  
  if (!config || dismissed) return null;

  const isDesigned = config.status === "DESIGNED";
  
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      background: isDesigned ? "#e6ffe6" : "#fff3cd",
      color: isDesigned ? "#0f5132" : "#856404",
      padding: "6px 12px",
      fontSize: "12px",
      fontWeight: "600",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 9999,
      fontFamily: "system-ui, sans-serif",
      borderBottom: `1px solid ${isDesigned ? "#badbcc" : "#ffeeba"}`
    }}>
      <div>
        [{isDesigned ? "✅ DESIGNED" : "⬜ WIREFRAME"}] {screenName} — {config.note}
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          fontSize: "14px",
          opacity: 0.6
        }}
      >
        ✕
      </button>
    </div>
  );
}
