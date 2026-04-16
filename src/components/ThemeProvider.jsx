import { createContext, useContext } from "react";

export const AURA_THEME = {
  // Primary Colors
  brand: "#1EDCF8",      // Aura Blue
  deep: "#16243E",       // Dark Blue
  white: "#FFFFFF",
  black: "#000000",
  
  // Greyscale
  text: "#16243E",
  textDim: "#626573",
  textMuted: "#9699A3",
  surface: "#F8F9FC",    // Aura Background
  border: "#E1E4EB",     // Light Grey 1
  borderLight: "#F4F6FA",
  
  // Functional/Status
  success: "#13C763",
  warning: "#F04923",    // Contrast Orange
  highlight: "#BBF4FC",  // Aura Blue - 5
  
  // Typography Constants
  fontHeadline: "'Futura Now Headline', system-ui, sans-serif",
  fontText: "'Futura Now Text', system-ui, sans-serif",
  fontDetail: "'Inter', system-ui, sans-serif"
};

const ThemeContext = createContext(AURA_THEME);

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={AURA_THEME}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useC = () => useContext(ThemeContext);
