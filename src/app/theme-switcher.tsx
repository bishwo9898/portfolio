"use client";

import { useTheme, type Theme } from "./theme-context";

const THEMES = [
  { id: "colorful" as Theme, name: "Colorful", icon: "🎨", emoji: "✨" },
  { id: "light" as Theme, name: "Light", icon: "☀️", emoji: "🌸" },
  { id: "dark" as Theme, name: "Dark", icon: "🌙", emoji: "⭐" },
  { id: "elegant" as Theme, name: "Elegant", icon: "💎", emoji: "✨" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-8 left-8 z-[9999] flex flex-col gap-2">
      {/* Theme Label */}
      <div className="text-xs font-bold opacity-70">THEME</div>

      {/* Floating Theme Buttons */}
      <div className="flex flex-col gap-2">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`group relative px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-110 ${
              theme === t.id
                ? "ring-2 ring-offset-2 scale-110 shadow-lg"
                : "hover:shadow-md"
            } ${getThemeButtonStyle(t.id, theme === t.id)}`}
            title={`Switch to ${t.name} theme`}
          >
            <span className="text-lg mr-2">{t.icon}</span>
            <span className="hidden group-hover:inline">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function getThemeButtonStyle(themeId: Theme, isActive: boolean): string {
  const baseStyle = "transition-all duration-300";

  switch (themeId) {
    case "colorful":
      return `${baseStyle} ${
        isActive
          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white ring-pink-300"
          : "bg-gradient-to-r from-yellow-300 to-orange-400 text-white hover:from-yellow-400 hover:to-orange-500"
      }`;

    case "light":
      return `${baseStyle} ${
        isActive
          ? "bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 ring-blue-200"
          : "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 hover:from-blue-200 hover:to-cyan-200"
      }`;

    case "dark":
      return `${baseStyle} ${
        isActive
          ? "bg-gradient-to-r from-slate-800 to-gray-900 text-cyan-300 ring-cyan-400"
          : "bg-gradient-to-r from-slate-700 to-gray-800 text-gray-300 hover:from-slate-600 hover:to-gray-700"
      }`;

    case "elegant":
      return `${baseStyle} ${
        isActive
          ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white ring-amber-300"
          : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600"
      }`;

    default:
      return baseStyle;
  }
}
