import { Theme } from "./theme-context";
import { getThemeConfig } from "./theme-config";

export function getThemeClasses(theme: Theme) {
  const config = getThemeConfig(theme);

  return {
    // Main backgrounds
    mainBg: `bg-gradient-to-br ${config.bgGradient}`,
    navBg: config.navBg,
    navBorder: config.navBorder,

    // Hero badges
    badge1: `${config.heroBadge1} text-white`,
    badge2: `${config.heroBadge2} text-white`,
    badge3: `${config.heroBadge3} text-white`,

    // Gradients
    primaryGradient: `bg-gradient-to-r ${config.primaryGradient}`,
    primaryGradientText: `bg-gradient-to-r ${config.primaryGradient} bg-clip-text text-transparent`,
    secondaryGradient: `from-${config.secondaryGradient.split('-')[1]}-300 to-${config.secondaryGradient.split('-')[3]}`,

    // Text colors
    textPrimary: config.textPrimary,
    textSecondary: config.textSecondary,

    // Theme-specific section backgrounds
    lightSection: getThemeLightSectionBg(theme),
    darkSection: getThemeDarkSectionBg(theme),

    // Card styles
    cardBg: getThemeCardBg(theme),
    cardBorder: getThemeCardBorder(theme),
  };
}

function getThemeLightSectionBg(theme: Theme): string {
  switch (theme) {
    case "colorful":
      return "bg-gradient-to-br from-white to-pink-50";
    case "light":
      return "bg-gradient-to-br from-blue-50 to-cyan-50";
    case "dark":
      return "bg-gradient-to-br from-slate-800 to-gray-800";
    case "elegant":
      return "bg-gradient-to-br from-white to-amber-50";
  }
}

function getThemeDarkSectionBg(theme: Theme): string {
  switch (theme) {
    case "colorful":
      return "bg-gradient-to-br from-purple-50 to-blue-50";
    case "light":
      return "bg-gradient-to-br from-cyan-50 to-sky-50";
    case "dark":
      return "bg-gradient-to-br from-slate-900 to-gray-900";
    case "elegant":
      return "bg-gradient-to-br from-amber-50 to-orange-50";
  }
}

function getThemeCardBg(theme: Theme): string {
  switch (theme) {
    case "colorful":
      return "bg-gradient-to-br from-yellow-100 to-orange-100";
    case "light":
      return "bg-gradient-to-br from-blue-100 to-cyan-100";
    case "dark":
      return "bg-slate-700/50";
    case "elegant":
      return "bg-gradient-to-br from-amber-100 to-yellow-100";
  }
}

function getThemeCardBorder(theme: Theme): string {
  switch (theme) {
    case "colorful":
      return "border-4 border-yellow-300";
    case "light":
      return "border-2 border-blue-200";
    case "dark":
      return "border border-cyan-500/30";
    case "elegant":
      return "border-2 border-amber-200";
  }
}
