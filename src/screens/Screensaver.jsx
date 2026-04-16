import { useState, useEffect } from "react";

const VIDEOS = [
  "/videos/rehydrate to focus.mp4",
  "/videos/screensaver_3.mp4",
  "/videos/screensaver_4.mp4",
  "/videos/screensaver_5.mp4",
  "/videos/screensaver_6.mp4"
];

export function Screensaver({ onTap }) {
  const [videoIdx, setVideoIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Pick a random starting video
    setVideoIdx(Math.floor(Math.random() * VIDEOS.length));

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setVideoIdx(prev => {
          let next;
          do {
            next = Math.floor(Math.random() * VIDEOS.length);
          } while (next === prev && VIDEOS.length > 1);
          return next;
        });
        setFade(true);
      }, 1000); // Wait for fade out
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onClick={onTap} 
      style={{ 
        width: "100%", 
        height: "100%", 
        background: "#000", 
        cursor: "pointer", 
        fontFamily: "'Futura Now Headline', system-ui, sans-serif", 
        overflow: "hidden", 
        position: "relative"
      }}
    >
      <video 
        key={VIDEOS[videoIdx]} // Key ensures re-mount on change
        autoPlay 
        loop 
        muted 
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          opacity: fade ? 1 : 0,
          transition: "opacity 1s ease-in-out"
        }}
      >
        <source src={VIDEOS[videoIdx]} type="video/mp4" />
      </video>

      {/* Tap Overlay (Footer) */}
      <div 
        style={{ 
          position: "absolute", 
          bottom: "80px", 
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff", 
          fontSize: "32px", 
          fontWeight: "500", 
          lineHeight: "32px",
          textShadow: "0 2px 15px rgba(0,0,0,0.8)",
          letterSpacing: "0.5px",
          zIndex: 10,
          textAlign: "center",
          whiteSpace: "nowrap"
        }}
      >
        Tap anywhere to start
      </div>
    </div>
  );
}
