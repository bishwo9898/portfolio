import { Theme } from "./theme-context";

export const THEME_CONFIGS = {
  colorful: {
    name: "Colorful",
    fontFamily: "font-fredoka", // Playful, rounded font
    bgGradient: "from-amber-50 via-pink-50 to-purple-50",
    navBg: "bg-white/95",
    navBorder: "border-b-4 border-gradient-to-r from-pink-300 to-purple-300",
    heroBadge1: "bg-gradient-to-r from-yellow-300 to-orange-400",
    heroBadge2: "bg-gradient-to-r from-pink-400 to-rose-400",
    heroBadge3: "bg-gradient-to-r from-purple-400 to-indigo-500",
    primaryGradient: "from-pink-500 to-purple-600",
    secondaryGradient: "from-pink-300 to-purple-300",
    textPrimary: "text-purple-900",
    textSecondary: "text-purple-800",
    watermark: "paw-prints",
    watermarkOpacity: "opacity-5",
  },
  light: {
    name: "Light",
    fontFamily: "font-poppins", // Modern, clean font
    bgGradient: "from-blue-50 via-cyan-50 to-sky-50",
    navBg: "bg-white/98",
    navBorder: "border-b-2 border-blue-200",
    heroBadge1: "bg-gradient-to-r from-blue-400 to-cyan-400",
    heroBadge2: "bg-gradient-to-r from-cyan-400 to-teal-400",
    heroBadge3: "bg-gradient-to-r from-teal-400 to-emerald-400",
    primaryGradient: "from-blue-500 to-cyan-500",
    secondaryGradient: "from-blue-300 to-cyan-300",
    textPrimary: "text-blue-900",
    textSecondary: "text-blue-800",
    watermark: "bubbles",
    watermarkOpacity: "opacity-3",
  },
  dark: {
    name: "Dark",
    fontFamily: "font-inter", // Sleek, modern font
    bgGradient: "from-slate-900 via-gray-900 to-slate-900",
    navBg: "bg-slate-800/80",
    navBorder: "border-b border-cyan-500/30",
    heroBadge1: "bg-gradient-to-r from-cyan-500 to-blue-600",
    heroBadge2: "bg-gradient-to-r from-purple-500 to-pink-600",
    heroBadge3: "bg-gradient-to-r from-green-500 to-cyan-500",
    primaryGradient: "from-cyan-400 to-blue-500",
    secondaryGradient: "from-cyan-500 to-blue-600",
    textPrimary: "text-gray-100",
    textSecondary: "text-gray-300",
    watermark: "stars",
    watermarkOpacity: "opacity-10",
  },
  elegant: {
    name: "Elegant",
    fontFamily: "font-cormorant", // Sophisticated serif font
    bgGradient: "from-amber-50 via-yellow-50 to-orange-50",
    navBg: "bg-white/90",
    navBorder: "border-b border-amber-200",
    heroBadge1: "bg-gradient-to-r from-amber-600 to-yellow-600",
    heroBadge2: "bg-gradient-to-r from-yellow-600 to-orange-600",
    heroBadge3: "bg-gradient-to-r from-orange-600 to-red-600",
    primaryGradient: "from-amber-700 to-yellow-700",
    secondaryGradient: "from-amber-600 to-yellow-600",
    textPrimary: "text-amber-900",
    textSecondary: "text-amber-800",
    watermark: "art-deco",
    watermarkOpacity: "opacity-8",
  },
} as const satisfies Record<Theme, any>;

export type ThemeConfig = (typeof THEME_CONFIGS)[Theme];

export function getThemeConfig(theme: Theme): ThemeConfig {
  return THEME_CONFIGS[theme];
}

// Watermark SVG patterns
export const WATERMARKS = {
  "paw-prints": `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="80" r="15" fill="currentColor"/>
      <circle cx="70" cy="110" r="12" fill="currentColor"/>
      <circle cx="100" cy="125" r="12" fill="currentColor"/>
      <circle cx="130" cy="110" r="12" fill="currentColor"/>
      <circle cx="100" cy="160" r="10" fill="currentColor"/>
    </svg>
  `,
  bubbles: `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="130" cy="90" r="35" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="100" cy="150" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="50" cy="140" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  `,
  stars: `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 20 L110 50 L140 50 L120 70 L130 100 L100 80 L70 100 L80 70 L60 50 L90 50 Z" fill="currentColor"/>
      <path d="M50 120 L55 135 L72 135 L60 145 L65 160 L50 150 L35 160 L40 145 L28 135 L45 135 Z" fill="currentColor"/>
      <path d="M160 150 L163 160 L175 160 L168 167 L170 177 L160 170 L150 177 L152 167 L145 160 L157 160 Z" fill="currentColor"/>
    </svg>
  `,
  "art-deco": `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 50 L100 50 L150 100 L100 150 L50 150 L0 100 Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="50" y1="50" x2="150" y2="150" stroke="currentColor" stroke-width="1"/>
      <line x1="150" y1="50" x2="50" y2="150" stroke="currentColor" stroke-width="1"/>
      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" stroke-width="1"/>
    </svg>
  `,
};
