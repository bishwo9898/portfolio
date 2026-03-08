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

  return (
    <div className="fixed -top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none isolate">
      {/* Realistic ambient light below bulb in light mode */}
      {isLightMode && (
        <>
          <div
            className="absolute left-1/2 -translate-x-1/2 w-28 h-28 pointer-events-none"
            style={{
              top: "112px",
              background:
                "radial-gradient(circle, rgba(255, 240, 180, 0.85) 0%, rgba(255, 215, 120, 0.45) 38%, rgba(255, 190, 90, 0) 72%)",
              filter: "blur(10px)",
              animation: "bulbPulse 2.8s ease-in-out infinite",
            }}
          ></div>
          <div
            className="absolute left-1/2 -translate-x-1/2 w-72 h-[22rem] pointer-events-none"
            style={{
              top: "150px",
              background:
                "linear-gradient(to bottom, rgba(255, 214, 120, 0.3) 0%, rgba(255, 201, 102, 0.2) 30%, rgba(255, 180, 80, 0.1) 55%, rgba(255, 170, 60, 0) 100%)",
              clipPath: "polygon(50% 0%, 82% 100%, 18% 100%)",
              filter: "blur(18px)",
              animation: "beamBreath 3.4s ease-in-out infinite",
            }}
          ></div>
          <div
            className="absolute left-1/2 -translate-x-1/2 w-80 h-24 pointer-events-none"
            style={{
              top: "430px",
              background:
                "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(255, 214, 120, 0.35) 0%, rgba(255, 200, 95, 0.16) 45%, rgba(255, 180, 80, 0) 78%)",
              filter: "blur(16px)",
              animation: "ambientDrift 4.2s ease-in-out infinite",
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
            <stop offset="0%" stopColor="#FFEB99" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#FFD876" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFC850" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beamCore" x1="0" y1="170" x2="0" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE4A0" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#FFD174" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFBE5C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beamSoft" x1="0" y1="166" x2="0" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE8AE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFCC6B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {isLightMode && (
          <g style={{ animation: "beamBreath 3.4s ease-in-out infinite" }}>
            <path d="M 50 166 L 88 294 L 12 294 Z" fill="url(#beamSoft)" opacity="0.55" />
            <path d="M 50 170 L 80 282 L 20 282 Z" fill="url(#beamCore)" opacity="0.7" />
            <ellipse cx="50" cy="286" rx="32" ry="8" fill="#FFD98D" opacity="0.28" />
          </g>
        )}

        {/* String - thin elegant thread */}
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="122"
          stroke={isLightMode ? "#B8860B" : "#666"}
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Socket/Bulb Base */}
        <g>
          {/* Metal socket */}
          <rect
            x="42"
            y="122"
            width="16"
            height="12"
            fill={isLightMode ? "#D4AF6A" : "#555"}
            rx="2"
          />
          {/* Socket threads detail */}
          <line
            x1="42"
            y1="128"
            x2="58"
            y2="128"
            stroke={isLightMode ? "#B8860B" : "#444"}
            strokeWidth="0.5"
            opacity="0.6"
          />
          <line
            x1="42"
            y1="131"
            x2="58"
            y2="131"
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
            d="M 38 134 Q 38 117 50 107 Q 62 117 62 134"
            fill={isLightMode ? "#FFF9E6" : "#0d0d0d"}
            stroke={isLightMode ? "#D4AF6A" : "#444"}
            strokeWidth="1.5"
          />

          {/* Bulb main sphere */}
          <circle
            cx="50"
            cy="154"
            r="18"
            fill={isLightMode ? "#FFFACD" : "#0a0a0a"}
            stroke={isLightMode ? "#D4AF6A" : "#333"}
            strokeWidth="1.5"
            opacity={isLightMode ? "0.95" : "0.7"}
            style={{
              animation: isAnimating
                ? "toggleFlash 0.6s ease-out"
                : isLightMode
                  ? "bulbPulse 2.8s ease-in-out infinite"
                  : "none",
            }}
          />

          {/* Inner glow - light mode */}
          {isLightMode && (
            <circle cx="50" cy="154" r="18" fill="url(#bulbInnerGlow)" />
          )}

          {/* Filament visible in light mode */}
          {isLightMode && (
            <path
              d="M 45 148 Q 50 143 55 148"
              stroke="#FFA500"
              strokeWidth="1"
              fill="none"
              opacity="0.8"
            />
          )}

          {/* Bulb base (metal contact) */}
          <ellipse
            cx="50"
            cy="174"
            rx="10"
            ry="5"
            fill={isLightMode ? "#C4964A" : "#444"}
            stroke={isLightMode ? "#B8860B" : "#333"}
            strokeWidth="1"
          />
          <ellipse
            cx="50"
            cy="172"
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
            opacity: 0.88;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes ambientDrift {
          0%,
          100% {
            opacity: 0.8;
            transform: translateX(-50%) scale(0.98);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.03);
          }
        }
        @keyframes bulbPulse {
          0%,
          100% {
            opacity: 0.92;
            filter: brightness(1);
          }
          50% {
            opacity: 1;
            filter: brightness(1.08);
          }
        }
        @keyframes toggleFlash {
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
  );
}
