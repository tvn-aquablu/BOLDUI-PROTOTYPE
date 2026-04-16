import { useC } from "./ThemeProvider";

export function NfcStrip() {
  const C = useC();
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "7px 28px", background: C.nfcBg, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, zIndex: 10 }}>
      <span style={{ fontSize: 13, opacity: 0.4 }}>📱</span>
      <span style={{ fontSize: 10, color: C.textDim, fontWeight: 500 }}>Have the app? Tap your phone — pour in 5 seconds.</span>
    </div>
  );
}
