"use client";

import { useTheme } from "./theme-context";
import { useState } from "react";

export function LampToggle() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTheme(theme === "light" ? "dark" : "light");
    setTimeout(() => setIsAnimating(false), 600);
  };

  const isLightMode = theme === "light";
  const bulbScreenY = 136;

  return (
    <>
      {/* Dark overlay above bulb - only in light mode */}
      {isLightMode && (
        <div
          className="fixed inset-x-0 top-0 pointer-events-none"
          style={{
            height: `${bulbScreenY}px`,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.78) 20%, rgba(0,0,0,0.68) 35%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.38) 65%, rgba(0,0,0,0.2) 78%, rgba(0,0,0,0.08) 88%, rgba(0,0,0,0) 100%)",
            mixBlendMode: "multiply",
            zIndex: 45,
          }}
        ></div>
      )}

      <div className="fixed -top-12 left-[calc(50%-28px)] z-40 pointer-events-none isolate">
        {/* Light exists only in light mode and is sourced from bulb center */}
        {isLightMode && (
          <>
            <div
              className="fixed left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                top: `${bulbScreenY + 12}px`,
                width: "min(94vw, 1280px)",
                height: "84vh",
                background:
                  "radial-gradient(ellipse 54% 88% at 50% 0%, rgba(255,243,192,0.58) 0%, rgba(255,224,155,0.36) 16%, rgba(255,205,125,0.2) 38%, rgba(255,192,102,0.1) 58%, rgba(255,180,92,0) 100%)",
                filter: "blur(16px)",
                animation: "beamBreath 3.1s ease-in-out infinite",
              }}
            ></div>
          </>
        )}

        {/* Smooth curved cone light - only in dark mode */}
        {!isLightMode && (
          <>
            <div
              className="fixed left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                top: `${bulbScreenY + 14}px`,
                width: "min(124vw, 3000px)",
                height: "80vh",
                background:
                  "radial-gradient(ellipse 80% 176% at 50% 0%, rgba(255,242,190,0.34) 0%, rgba(255,222,148,0.22) 24%, rgba(255,202,116,0.11) 48%, rgba(255,186,96,0.03) 66%, rgba(255,186,96,0) 100%)",
                filter: "blur(16px)",
                animation: "none",
              }}
            ></div>
            <div
              className="fixed left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                top: `${bulbScreenY + 20}px`,
                width: "min(84vw, 1800px)",
                height: "76vh",
                background:
                  "radial-gradient(ellipse 70% 166% at 50% 0%, rgba(255,238,180,0.28) 0%, rgba(255,216,140,0.17) 30%, rgba(255,198,114,0.07) 56%, rgba(255,186,96,0) 100%)",
                filter: "blur(12px)",
                animation: "none",
              }}
            ></div>
          </>
        )}

        {/* Hanging string from top */}
        <svg
          viewBox="0 0 100 300"
          className="w-14 h-80 relative z-10"
          style={{
            filter: isLightMode
              ? "drop-shadow(0 0 8px rgba(255, 200, 80, 0.3))"
              : "none",
          }}
        >
          <defs>
            <radialGradient id="bulbInnerGlow" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#FFEB99" stopOpacity="0.76" />
              <stop offset="56%" stopColor="#FFD36A" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFC850" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* String - thin elegant thread */}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="152"
            stroke={isLightMode ? "#B8860B" : "#666"}
            strokeWidth="1.2"
            opacity="0.8"
          />

          {/* Socket/Bulb Base */}
          <g>
            {/* Metal socket */}
            <rect
              x="42"
              y="152"
              width="16"
              height="12"
              fill={isLightMode ? "#D4AF6A" : "#555"}
              rx="2"
            />
            {/* Socket threads detail */}
            <line
              x1="42"
              y1="158"
              x2="58"
              y2="158"
              stroke={isLightMode ? "#B8860B" : "#444"}
              strokeWidth="0.5"
              opacity="0.6"
            />
            <line
              x1="42"
              y1="161"
              x2="58"
              y2="161"
              stroke={isLightMode ? "#B8860B" : "#444"}
              strokeWidth="0.5"
              opacity="0.6"
            />
          </g>

          {/* Light Bulb - main shape */}
          <g
            className="cursor-pointer"
            onClick={handleToggle}
            style={{ pointerEvents: "auto" }}
          >
            {/* Bulb top (curved) */}
            <path
              d="M 38 164 Q 38 147 50 137 Q 62 147 62 164"
              fill={isLightMode ? "#FFF9E6" : "#0d0d0d"}
              stroke={isLightMode ? "#D4AF6A" : "#444"}
              strokeWidth="1.5"
            />

            {/* Bulb main sphere */}
            <circle
              cx="50"
              cy="184"
              r="18"
              fill={isLightMode ? "#FFFACD" : "#0a0a0a"}
              stroke={isLightMode ? "#D4AF6A" : "#333"}
              strokeWidth="1.5"
              opacity={isLightMode ? "0.95" : "0.7"}
              style={{
                animation: isAnimating
                  ? "animate-flicker-bulb 0.6s ease-out"
                  : isLightMode
                    ? "bulbPulse 2.4s ease-in-out infinite"
                    : "none",
              }}
            />

            {/* Inner glow - light mode */}
            {isLightMode && (
              <circle cx="50" cy="184" r="18" fill="url(#bulbInnerGlow)" />
            )}

            {/* Filament visible in light mode */}
            {isLightMode && (
              <path
                d="M 45 178 Q 50 173 55 178"
                stroke="#FFA500"
                strokeWidth="1"
                fill="none"
                opacity="0.8"
              />
            )}

            {/* Bulb base (metal contact) */}
            <ellipse
              cx="50"
              cy="204"
              rx="10"
              ry="5"
              fill={isLightMode ? "#C4964A" : "#444"}
              stroke={isLightMode ? "#B8860B" : "#333"}
              strokeWidth="1"
            />
            <ellipse
              cx="50"
              cy="202"
              rx="8"
              ry="3"
              fill={isLightMode ? "#D4AF6A" : "#555"}
              opacity="0.6"
            />
          </g>
        </svg>

        <style jsx>{`
          @keyframes beamBreath {
            0%,
            100% {
              opacity: 0.9;
            }
            50% {
              opacity: 1;
            }
          }
          @keyframes bulbPulse {
            0%,
            100% {
              opacity: 0.94;
              filter: brightness(1);
            }
            50% {
              opacity: 1;
              filter: brightness(1.09);
            }
          }
          @keyframes animate-flicker-bulb {
            0%,
            100% {
              opacity: 0.95;
            }
            25% {
              opacity: 0.85;
            }
            50% {
              opacity: 0.92;
            }
            75% {
              opacity: 0.88;
            }
          }
        `}</style>
      </div>
    </>
  );
}
