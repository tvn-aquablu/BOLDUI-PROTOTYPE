import { createContext, useContext } from "react";

export const DARK = {
  bg: "#111", surface: "#1a1a1a", card: "#222", cardHover: "#2a2a2a",
  border: "#333", borderLight: "#444", borderActive: "#888",
  text: "#e0e0e0", textMuted: "#888", textDim: "#555",
  primaryBg: "#e0e0e0", primaryText: "#111",
  nfcBg: "rgba(17,17,17,0.92)",
  badge: "#2a2a2a", badgeBorder: "#444", badgeText: "#aaa",
  // Reserved for design handoff — will be populated from Figma
  accent: null,
  accentText: null,
  boostCard: null,
  flavorCard: null,
  glassStroke: null,
};

export const LIGHT = {
  bg: "#f5f5f5", surface: "#ffffff", card: "#eaeaea", cardHover: "#e0e0e0",
  border: "#d0d0d0", borderLight: "#bbb", borderActive: "#666",
  text: "#1a1a1a", textMuted: "#666", textDim: "#999",
  primaryBg: "#1a1a1a", primaryText: "#f5f5f5",
  nfcBg: "rgba(255,255,255,0.92)",
  badge: "#e8e8e8", badgeBorder: "#ccc", badgeText: "#777",
  // Reserved for design handoff — will be populated from Figma
  accent: null,
  accentText: null,
  boostCard: null,
  flavorCard: null,
  glassStroke: null,
};

export const ThemeContext = createContext(LIGHT);
export function useC() { return useContext(ThemeContext); }

export function ThemeProvider({ children, theme }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
