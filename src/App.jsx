import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Screensaver } from "./screens/Screensaver";
import { EntryChoice } from "./screens/EntryChoice";
import { CraftBuilder } from "./screens/CraftBuilder";
import { SuggestedDrink } from "./screens/SuggestedDrink";
import { QuickSelect } from "./screens/QuickSelect";
import { Dispensing } from "./screens/Dispensing";

export default function App() {
  const [screen, setScreen] = useState("saver");
  const [dispenseConfig, setDispenseConfig] = useState(null);
  
  const reset = () => { 
    setScreen("saver"); 
    setDispenseConfig(null); 
  };

  const goDispense = (cfg) => { 
    setDispenseConfig(cfg); 
    setScreen("dispensing"); 
  };

  return (
    <ThemeProvider>
      <div style={{ 
        width: "1600px", 
        height: "1200px", 
        margin: "0 auto", 
        background: "#F8F9FC", 
        overflow: "hidden", 
        position: "relative" 
      }}>
        {screen === "saver" && <Screensaver onTap={() => setScreen("craft")} />}
        {screen === "entry" && <EntryChoice onCraft={() => setScreen("craft")} onSuggested={() => setScreen("suggested")} onQuickSelect={() => setScreen("quick")} />}
        {screen === "craft" && <CraftBuilder onDispense={goDispense} onBack={() => setScreen("entry")} />}
        {screen === "suggested" && <SuggestedDrink onDispense={goDispense} onBack={() => setScreen("entry")} />}
        {screen === "quick" && <QuickSelect onDispense={goDispense} onBack={() => setScreen("entry")} />}
        {screen === "dispensing" && dispenseConfig && <Dispensing config={dispenseConfig} onDone={reset} />}
      </div>
    </ThemeProvider>
  );
}
