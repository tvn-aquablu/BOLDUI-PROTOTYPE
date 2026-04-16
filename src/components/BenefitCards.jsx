import { useC } from "./ThemeProvider";
import { Badge, BadgeGroup } from "./Badge";

export function BenefitCards({ boostLayers, flavorObj }) {
  const C = useC();
  const hasBotanicals = flavorObj?.vitamins?.some(v => v.botanical);
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
      {boostLayers.length > 0 && <>
        <div style={{ fontSize: 8, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", marginBottom: 2 }}>Your boosts</div>
        {boostLayers.map(b => (
          <div key={b.id} style={{ display: "flex", gap: 6, alignItems: "flex-start", padding: "5px 8px", background: C.bg, border: `1px solid ${C.borderActive}`, borderRadius: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, border: `1px solid ${C.borderActive}`, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><span style={{ fontSize: 8, fontWeight: 800, color: C.text }}>+</span></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}><span style={{ fontSize: 10, fontWeight: 700, color: C.text }}>{b.name}</span></div>
              <div style={{ fontSize: 9, color: C.textMuted, lineHeight: "12px", marginBottom: 3 }}>{b.benefit}</div>
              <BadgeGroup codes={b.codes} />
            </div>
          </div>
        ))}
      </>}
      {flavorObj && <>
        <div style={{ fontSize: 8, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", marginTop: boostLayers.length > 0 ? 4 : 0, marginBottom: 2 }}>{flavorObj.fn}{hasBotanicals ? " — vitamins & botanicals" : " vitamins"}</div>
        {flavorObj.vitamins.map((v, i) => (
          <div key={v.code + i} style={{ display: "flex", gap: 6, alignItems: "center", padding: "5px 8px", background: C.bg, border: `1px solid ${v.botanical ? C.borderLight : C.border}`, borderRadius: 6 }}>
            <Badge label={v.code} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, color: C.textMuted, lineHeight: "12px", fontStyle: v.botanical ? "italic" : "normal" }}>{v.benefit}</div>
            </div>
          </div>
        ))}
      </>}
    </div>
  );
}
