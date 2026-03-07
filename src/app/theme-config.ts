import { Theme } from "./theme-context";

type ThemeConfigEntry = {
  name: string;
  fontFamily: string;
  bgGradient: string;
  navBg: string;
  navBorder: string;
  heroBadge1: string;
  heroBadge2: string;
  heroBadge3: string;
  primaryGradient: string;
  secondaryGradient: string;
  textPrimary: string;
  textSecondary: string;
  watermark: "minimal";
  watermarkOpacity: string;
};

export const THEME_CONFIGS = {
  light: {
    name: "Light",
    fontFamily: "font-geist-sans",
    bgGradient: "from-white via-gray-50 to-white",
    navBg: "bg-white/80",
    navBorder: "border-b border-gray-200/50",
    heroBadge1: "bg-stone-900",
    heroBadge2: "bg-gray-800",
    heroBadge3: "bg-zinc-800",
    primaryGradient: "from-stone-900 to-gray-900",
    secondaryGradient: "from-gray-600 to-gray-800",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
    watermark: "minimal",
    watermarkOpacity: "opacity-2",
  },
  dark: {
    name: "Dark",
    fontFamily: "font-geist-sans",
    bgGradient: "from-black via-zinc-950 to-black",
    navBg: "bg-black/80",
    navBorder: "border-b border-white/5",
    heroBadge1: "bg-white",
    heroBadge2: "bg-gray-200",
    heroBadge3: "bg-gray-300",
    primaryGradient: "from-white to-gray-200",
    secondaryGradient: "from-gray-200 to-gray-400",
    textPrimary: "text-white",
    textSecondary: "text-gray-400",
    watermark: "minimal",
    watermarkOpacity: "opacity-5",
  },
} as const satisfies Record<Theme, ThemeConfigEntry>;

export type ThemeConfig = (typeof THEME_CONFIGS)[Theme];

export function getThemeConfig(theme: Theme): ThemeConfig {
  return THEME_CONFIGS[theme];
}

// Watermark SVG patterns (minimal design)
export const WATERMARKS = {
  minimal: `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="40" x2="60" y2="40" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="140" y1="80" x2="160" y2="80" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="80" y1="140" x2="100" y2="140" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    </svg>
  `,
};
