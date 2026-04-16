import { useC } from "./ThemeProvider";
import { BOTANICAL_CODES } from "../data/flavors";

export function Badge({ label }) {
  const C = useC();
  const isBotanical = BOTANICAL_CODES.has(label);
  return (
    <span style={{ display: "inline-block", padding: "1px 6px", background: isBotanical ? "transparent" : C.badge, border: `1px solid ${isBotanical ? C.borderLight : C.badgeBorder}`, borderRadius: isBotanical ? 8 : 4, fontSize: 8, fontWeight: isBotanical ? 600 : 700, fontStyle: isBotanical ? "italic" : "normal", color: isBotanical ? C.textMuted : C.badgeText, letterSpacing: "0.3px", lineHeight: "14px" }}>{isBotanical ? `${label}` : label}</span>
  );
}

export function BadgeGroup({ codes }) {
  return (
    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {codes.map(c => <Badge key={c} label={c} />)}
    </div>
  );
}
