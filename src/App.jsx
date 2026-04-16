import { useState } from "react";
import { ThemeProvider, DARK, LIGHT } from "./components/ThemeProvider";
import { Screensaver } from "./screens/Screensaver";
import { EntryChoice } from "./screens/EntryChoice";
import { CraftBuilder } from "./screens/CraftBuilder";
import { SuggestedDrink } from "./screens/SuggestedDrink";
import { QuickSelect } from "./screens/QuickSelect";
import { Dispensing } from "./screens/Dispensing";

export default function App() {
  const [screen, setScreen] = useState("saver");
  const [dispenseConfig, setDispenseConfig] = useState(null);
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;
  
  const reset = () => { setScreen("saver"); setDispenseConfig(null); };
  const goDispense = (cfg) => { setDispenseConfig(cfg); setScreen("dispensing"); };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: 1600, height: 1200, margin: "0 auto", background: theme.bg, overflow: "hidden", position: "relative" }}>
        {screen === "saver" && <Screensaver onTap={() => setScreen("craft")} />}
        {screen === "entry" && <EntryChoice onCraft={() => setScreen("craft")} onSuggested={() => setScreen("suggested")} onQuickSelect={() => setScreen("quick")} />}
        {screen === "craft" && <CraftBuilder onDispense={goDispense} onBack={() => setScreen("entry")} />}
        {screen === "suggested" && <SuggestedDrink onDispense={goDispense} onBack={() => setScreen("entry")} />}
        {screen === "quick" && <QuickSelect onDispense={goDispense} onBack={() => setScreen("entry")} />}
        {screen === "dispensing" && dispenseConfig && <Dispensing config={dispenseConfig} onDone={reset} />}
        
        <button onClick={() => setDark(d => !d)} style={{ position: "absolute", top: 12, right: 12, zIndex: 50, width: 34, height: 34, borderRadius: "50%", background: theme.card, border: `1px solid ${theme.borderLight}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontFamily: "system-ui", color: theme.text }}>
          {dark ? "☀" : "☾"}
        </button>
      </div>
    </ThemeProvider>
  );
}
