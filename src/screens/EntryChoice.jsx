export function EntryChoice({ onCraft, onSuggested }) {
  return (
    <div style={{ 
      width: "1600px", 
      height: "1232px", 
      background: "#fbfcfc", 
      position: "relative", 
      fontFamily: "'Futura Now Headline', system-ui, sans-serif", 
      overflow: "hidden" 
    }}>
      
      {/* Image 7 (Hand holding glass) */}
      <div style={{ position: "absolute", left: "369px", top: "-530px", width: "1565px", height: "1957px" }}>
        <img 
          src="/Flavour Images/entry_bg.jpg" 
          alt="" 
          style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} 
        />
      </div>

      {/* Staggered Headlines */}
      <div style={{ position: "absolute", left: "85px", top: "150px", width: "486px", height: "72px", color: "#86868d", fontSize: "64px", fontWeight: "bold", letterSpacing: "-2.56px", lineHeight: "72px" }}>
        How do you want
      </div>
      <div style={{ position: "absolute", left: "198px", top: "222px", width: "579px", height: "84px", color: "#000000", fontSize: "64px", fontWeight: "bold", letterSpacing: "-2.56px", lineHeight: "72px" }}>
        your drink today?
      </div>

      {/* Instructional Text inside Glass */}
      <div style={{ position: "absolute", left: "833px", top: "222px", width: "524px", height: "116px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ color: "#1d1d1f", fontSize: "32px", fontWeight: "500", lineHeight: "38px" }}>
          Please place your<br/>bottle or glass
        </div>
      </div>

      {/* Action Buttons */}
      
      {/* 1. Build your perfect drink */}
      <button 
        onClick={onCraft} 
        style={{ 
          position: "absolute",
          left: "61px", 
          top: "359px",
          width: "641px", 
          height: "371px", 
          background: "#ffffff", 
          borderRadius: "24px", 
          border: "none", 
          padding: "24px", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)"
        }}
      >
        <div style={{ color: "#1d1d1f", fontSize: "32px", fontWeight: "500", lineHeight: "38px", textAlign: "center", marginBottom: "10px" }}>
          Build your<br/>perfect drink
        </div>
        <div style={{ color: "#1d1d1f", fontSize: "16px", fontWeight: "400", lineHeight: "24px", textAlign: "center" }}>
          Choose your benefits,<br/>pick a flavor, and pour
        </div>
      </button>

      {/* 2. Our most popular drinks */}
      <button 
        onClick={onSuggested} 
        style={{ 
          position: "absolute",
          left: "61px", 
          top: "779px",
          width: "641px", 
          height: "183px", 
          background: "#ffffff", 
          borderRadius: "24px", 
          border: "none", 
          padding: "24px", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)"
        }}
      >
        <div style={{ color: "#1d1d1f", fontSize: "32px", fontWeight: "500", lineHeight: "38px", textAlign: "center", marginBottom: "10px" }}>
          Our most<br/>popular drinks
        </div>
        <div style={{ color: "#1d1d1f", fontSize: "16px", fontWeight: "400", lineHeight: "24px", textAlign: "center" }}>
          Quick picks people<br/>are loving here
        </div>
      </button>

      {/* 3. Tap your phone */}
      <button 
        style={{ 
          position: "absolute",
          left: "61px", 
          top: "997px",
          width: "641px", 
          height: "149px", 
          background: "#d6ebf7", 
          borderRadius: "24px", 
          border: "none", 
          padding: "24px", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          cursor: "pointer",
          fontFamily: "inherit"
        }}
      >
        <div style={{ color: "#1d1d1f", fontSize: "32px", fontWeight: "500", lineHeight: "38px", textAlign: "center" }}>
          Tap your phone
        </div>
        <div style={{ color: "#1d1d1f", fontSize: "16px", fontWeight: "400", lineHeight: "24px", textAlign: "center", marginTop: "4px" }}>
          Use your phone to get a tailored blend in seconds
        </div>
      </button>

    </div>
  );
}
