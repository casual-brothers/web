"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export default function GamingStudioGraphic() {
  const [isHovered, setIsHovered] = useState(false);

  // Rotation transitions
  const outerRotateTransition = {
    repeat: Infinity,
    ease: "linear" as const,
    duration: isHovered ? 12 : 30,
  };

  const innerRotateTransition = {
    repeat: Infinity,
    ease: "linear" as const,
    duration: isHovered ? 8 : 20,
  };

  return (
    <div
      className="relative w-full max-w-[520px] aspect-[4/3] lg:aspect-square flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Ambient Background Glow ── */}
      <motion.div
        className="absolute w-[70%] h-[70%] rounded-full blur-[80px] pointer-events-none opacity-40 mix-blend-screen transition-colors duration-500"
        animate={{
          background: isHovered
            ? "radial-gradient(circle, rgba(124,255,0,0.22) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(124,255,0,0.12) 0%, transparent 70%)",
          scale: isHovered ? 1.15 : 1.0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* ── Cyber Tech Dotted Grid Background ── */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#7cff00" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" className="rounded-2xl" />
      </svg>

      {/* ── SVG Master Graphic ── */}
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-full overflow-visible"
        animate={{ scale: isHovered ? 1.04 : 1.0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <defs>
          {/* Cyber green neon filter - Expanded region to avoid square glow clipping */}
          <filter id="neonGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense neon glow for laser points - Expanded region to avoid square glow clipping */}
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="blur1" />
            <feGaussianBlur stdDeviation="4" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Linear gradient for tech lines */}
          <linearGradient id="techLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7cff00" stopOpacity="0" />
            <stop offset="50%" stopColor="#7cff00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7cff00" stopOpacity="0" />
          </linearGradient>

          <style>{`
            @keyframes dash-move {
              to { stroke-dashoffset: -20; }
            }
            @keyframes bar-grow-1 {
              0%, 100% { height: 12px; y: 18px; }
              50% { height: 26px; y: 4px; }
            }
            @keyframes bar-grow-2 {
              0%, 100% { height: 25px; y: 5px; }
              50% { height: 10px; y: 20px; }
            }
            @keyframes bar-grow-3 {
              0%, 100% { height: 16px; y: 14px; }
              50% { height: 30px; y: 0px; }
            }
            @keyframes bar-grow-4 {
              0%, 100% { height: 8px; y: 22px; }
              50% { height: 22px; y: 8px; }
            }
            @keyframes wave-flow {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -40; }
            }
          `}</style>
        </defs>

        {/* ── Layer 1: Outer Rotating Tech Dashboard Ring ── */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={outerRotateTransition}
          style={{ originX: "200px", originY: "200px" }}
        >
          {/* Main outer circle */}
          <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          {/* Segmented active brand rings */}
          <circle
            cx="200"
            cy="200"
            r="175"
            fill="none"
            stroke="#7cff00"
            strokeWidth="2.5"
            strokeDasharray="40 160 80 120"
            className="opacity-40 transition-opacity duration-300"
            style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)", opacity: 0.8 } : undefined}
          />
          {/* Outer dotted ticks */}
          <circle
            cx="200"
            cy="200"
            r="185"
            fill="none"
            stroke="rgba(124, 255, 0, 0.15)"
            strokeWidth="2"
            strokeDasharray="2 12"
          />
        </motion.g>

        {/* ── Layer 2: Middle Counter-Rotating Technical HUD Ring ── */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={innerRotateTransition}
          style={{ originX: "200px", originY: "200px" }}
        >
          {/* Angle measurements HUD */}
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="6"
            strokeDasharray="10 4 2 4"
          />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="#7cff00"
            strokeWidth="2"
            strokeDasharray="90 270"
            className="opacity-50"
            style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)", opacity: 0.9 } : undefined}
          />
          {/* Corner brackets inside HUD */}
          <path d="M 90 200 A 110 110 0 0 1 200 90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <path d="M 310 200 A 110 110 0 0 1 200 310" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        </motion.g>

        {/* ── Layer 3: Tech HUD Crosshairs & Grid Accents ── */}
        <g className="opacity-30">
          <line x1="200" y1="10" x2="200" y2="40" stroke="#7cff00" strokeWidth="1.5" />
          <line x1="200" y1="360" x2="200" y2="390" stroke="#7cff00" strokeWidth="1.5" />
          <line x1="10" y1="200" x2="40" y2="200" stroke="#7cff00" strokeWidth="1.5" />
          <line x1="360" y1="200" x2="390" y2="200" stroke="#7cff00" strokeWidth="1.5" />
          
          {/* Corner structural tech marks */}
          <path d="M 50 80 L 80 50 M 50 50 L 50 80 L 80 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <path d="M 350 80 L 320 50 M 350 50 L 350 80 L 320 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <path d="M 50 320 L 80 350 M 50 350 L 50 320 L 80 350" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <path d="M 350 320 L 320 350 M 350 350 L 350 320 L 320 350" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </g>

        {/* ── Layer 4: Vertical Glowing Scanline Scanner ── */}
        <motion.line
          x1="60"
          x2="340"
          stroke="url(#techLineGrad)"
          strokeWidth="3.5"
          animate={{ y: [80, 320, 80] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        />

        {/* ── Layer 4.5: Holographic HUD Side Wings ── */}
        {/* Left HUD Panel */}
        <motion.g
          animate={{
            x: isHovered ? 0 : -30,
            opacity: isHovered ? 0.95 : 0.05,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ originX: "200px", originY: "200px" }}
        >
          <polygon
            points="-65,130 35,130 55,150 55,230 35,250 -65,250"
            fill="rgba(18, 19, 27, 0.82)"
            stroke="rgba(124, 255, 0, 0.45)"
            strokeWidth="1"
            className="transition-colors duration-500"
            style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)" } : undefined}
          />
          <text x="-50" y="146" fill="#7cff00" fontSize="7" fontWeight="bold" className="font-display tracking-widest uppercase">L_SYS_TELEMETRY</text>
          <text x="-50" y="161" fill="rgba(255,255,255,0.4)" fontSize="6.5" className="font-display tracking-wider">ENGINE: R3F_v5.4</text>
          <text x="-50" y="171" fill="rgba(255,255,255,0.4)" fontSize="6.5" className="font-display tracking-wider">FPS: 60 / 60</text>
          <text x="-50" y="181" fill="rgba(255,255,255,0.4)" fontSize="6.5" className="font-display tracking-wider">LATENCY: 2.14 MS</text>
          
          {/* Equalizer bars */}
          <g transform="translate(-50, 195)">
            <rect x="0" y="18" width="3.5" height="12" fill="#7cff00" rx="0.5" className="animate-[bar-grow-1_1.2s_ease-in-out_infinite]" />
            <rect x="7" y="5" width="3.5" height="25" fill="#7cff00" rx="0.5" className="animate-[bar-grow-2_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
            <rect x="14" y="14" width="3.5" height="16" fill="#7cff00" rx="0.5" className="animate-[bar-grow-3_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
            <rect x="21" y="22" width="3.5" height="8" fill="#7cff00" rx="0.5" className="animate-[bar-grow-4_0.8s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }} />
            <rect x="28" y="10" width="3.5" height="20" fill="#7cff00" rx="0.5" className="animate-[bar-grow-2_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }} />
          </g>
          <text x="45" y="242" fill="#7cff00" fontSize="6.5" fontWeight="bold" textAnchor="end" className="font-display">STATUS: ACTIVE</text>
        </motion.g>

        {/* Right HUD Panel */}
        <motion.g
          animate={{
            x: isHovered ? 0 : 30,
            opacity: isHovered ? 0.95 : 0.05,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ originX: "200px", originY: "200px" }}
        >
          <polygon
            points="365,130 465,130 465,250 365,250 345,230 345,150"
            fill="rgba(18, 19, 27, 0.82)"
            stroke="rgba(124, 255, 0, 0.45)"
            strokeWidth="1"
            className="transition-colors duration-500"
            style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)" } : undefined}
          />
          <text x="355" y="146" fill="#7cff00" fontSize="7" fontWeight="bold" className="font-display tracking-widest uppercase">R_SYS_DIAGNOSTICS</text>
          <text x="355" y="161" fill="rgba(255,255,255,0.4)" fontSize="6.5" className="font-display tracking-wider">MEMORY: 16.0 GB</text>
          <text x="355" y="171" fill="rgba(255,255,255,0.4)" fontSize="6.5" className="font-display tracking-wider">GPU: CB_GFX_v3.2</text>
          <text x="355" y="181" fill="rgba(255,255,255,0.4)" fontSize="6.5" className="font-display tracking-wider">SENSITIVITY: MAX</text>
          
          {/* Signal wave */}
          <path
            d="M 355 210 Q 370 190 385 210 T 415 210 T 445 210"
            fill="none"
            stroke="#7cff00"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="animate-[wave-flow_1.5s_linear_infinite]"
            style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)" } : undefined}
          />
          <text x="355" y="242" fill="#7cff00" fontSize="6.5" fontWeight="bold" className="font-display">CORE: ENG_OK</text>
        </motion.g>

        {/* ── Layer 5: Floating Console Gamepad Graphic (preserve-3d) ── */}
        <motion.g
          animate={{
            y: [0, -10, 0],
            rotateX: isHovered ? 4 : 0,
            rotateY: isHovered ? -4 : 0,
          }}
          transition={{
            y: { repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" },
            rotateX: { type: "spring", stiffness: 150, damping: 15 },
            rotateY: { type: "spring", stiffness: 150, damping: 15 }
          }}
          style={{ originX: "200px", originY: "200px" }}
        >
          {/* ── Shadow/Back-glow of Controller ── */}
          <path
            d="M 120 150 C 100 130, 80 150, 70 170 C 50 210, 60 270, 90 290 C 110 300, 130 280, 160 260 C 180 250, 220 250, 240 260 C 270 280, 290 300, 310 290 C 340 270, 350 210, 330 170 C 320 150, 300 130, 280 150 C 260 170, 240 180, 200 180 C 160 180, 140 170, 120 150 Z"
            fill="rgba(124, 255, 0, 0.04)"
            className="transition-opacity duration-300"
            style={{ filter: "drop-shadow(0px 0px 14px #7cff00)", opacity: isHovered ? 0.95 : 0.4 }}
          />

          {/* ── Sleek Circuit Lines & Data Connectors ── */}
          <path
            d="M 120 170 Q 75 160 50 120"
            fill="none"
            stroke="#7cff00"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            className="animate-[dash-move_1s_linear_infinite]"
            style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)", opacity: 0.85 } : { opacity: 0.3 }}
          />
          <path
            d="M 280 170 Q 325 160 350 120"
            fill="none"
            stroke="#7cff00"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            className="animate-[dash-move_1s_linear_infinite]"
            style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)", opacity: 0.85 } : { opacity: 0.3 }}
          />
          
          {/* Circuit traces on gamepad chassis */}
          <path
            d="M 130 220 H 150 L 160 230"
            fill="none"
            stroke="rgba(124, 255, 0, 0.3)"
            strokeWidth="0.8"
          />
          <circle cx="160" cy="230" r="1.2" fill="#7cff00" className="animate-ping" style={{ animationDuration: '3.5s' }} />
          <path
            d="M 270 220 H 250 L 240 230"
            fill="none"
            stroke="rgba(124, 255, 0, 0.3)"
            strokeWidth="0.8"
          />
          <circle cx="240" cy="230" r="1.2" fill="#7cff00" className="animate-ping" style={{ animationDuration: '3s' }} />

          {/* ── Controller Body Path ── */}
          <path
            d="M 120 150 C 100 130, 80 150, 70 170 C 50 210, 60 270, 90 290 C 110 300, 130 280, 160 260 C 180 250, 220 250, 240 260 C 270 280, 290 300, 310 290 C 340 270, 350 210, 330 170 C 320 150, 300 130, 280 150 C 260 170, 240 180, 200 180 C 160 180, 140 170, 120 150 Z"
            fill="#12131b"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3.5"
            className="transition-colors duration-500"
            style={isHovered ? { stroke: "rgba(255,255,255,0.18)" } : undefined}
          />
          
          {/* Subtle brand border accent around body */}
          <path
            d="M 120 150 C 100 130, 80 150, 70 170 C 50 210, 60 270, 90 290 C 110 300, 130 280, 160 260 C 180 250, 220 250, 240 260 C 270 280, 290 300, 310 290 C 340 270, 350 210, 330 170 C 320 150, 300 130, 280 150 C 260 170, 240 180, 200 180 C 160 180, 140 170, 120 150 Z"
            fill="none"
            stroke="#7cff00"
            strokeWidth="1.5"
            strokeDasharray="20 40 80 60"
            className="opacity-45 transition-opacity duration-300"
            style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)", opacity: 0.85 } : undefined}
          />

          {/* ── Left / Right Decorative Tech Grips ── */}
          <path
            d="M 72 190 C 65 220, 68 250, 85 272"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 328 190 C 335 220, 332 250, 315 272"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* ── Left D-PAD (Arrow Cross) ── */}
          <g transform="translate(115, 205)" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
            {/* Background cross plate */}
            <path
              d="M -10 -25 L 10 -25 L 10 -10 L 25 -10 L 25 10 L 10 10 L 10 25 L -10 25 L -10 10 L -25 10 L -25 -10 L -10 -10 Z"
              fill="#1b1c26"
              className="transition-colors duration-300"
              style={isHovered ? { fill: "#232533" } : undefined}
            />
            {/* Glowing active arrow tips */}
            <polygon points="0,-21 -6,-14 6,-14" fill="rgba(255,255,255,0.3)" />
            <polygon points="-21,0 -14,-6 -14,6" fill="rgba(255,255,255,0.3)" />
            <polygon points="21,0 14,-6 14,6" fill="rgba(255,255,255,0.3)" />
            <polygon points="0,21 -6,14 6,14" fill="#7cff00" className="opacity-70" style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)", opacity: 1 } : undefined} />
          </g>

          {/* ── Right Action Buttons (X, Y, A, B) ── */}
          <g transform="translate(285, 205)">
            {/* Button Y (Top) */}
            <circle cx="0" cy="-18" r="8.5" fill="#1b1c26" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="0" y="-14.5" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="bold">Y</text>

            {/* Button X (Left) */}
            <circle cx="-18" cy="0" r="8.5" fill="#1b1c26" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="-18" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="bold">X</text>

            {/* Button B (Right) */}
            <circle cx="18" cy="0" r="8.5" fill="#1b1c26" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="18" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="bold">B</text>

            {/* Button A (Bottom - Pulsing Glowing Green) */}
            <motion.circle
              cx="0"
              cy="18"
              r="8.5"
              fill="#1b1c26"
              stroke="#7cff00"
              strokeWidth="1.5"
              animate={isHovered ? {
                fill: ["#1b1c26", "#7cff00", "#1b1c26"],
                strokeWidth: [1.5, 2.5, 1.5]
              } : undefined}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)" } : undefined}
            />
            <text x="0" y="21.5" textAnchor="middle" fill="#7cff00" fontSize="10" fontWeight="black" style={isHovered ? { filter: "drop-shadow(0px 0px 6px #7cff00)" } : undefined}>A</text>
          </g>

          {/* ── Twin Analog Joysticks ── */}
          {/* Left Joystick */}
          <g transform="translate(160, 245)">
            <circle cx="0" cy="0" r="21" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="17" fill="#15161d" />
            {/* Joystick Cap */}
            <motion.circle
              cx="0"
              cy="0"
              r="14"
              fill="#20222f"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              animate={isHovered ? {
                cx: [-2.5, 0, 2.5, 0, -2.5],
                cy: [0, -2.5, 0, 2.5, 0],
              } : { cx: 0, cy: 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            {/* Inner cross grip */}
            <circle cx="0" cy="0" r="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </g>

          {/* Right Joystick */}
          <g transform="translate(240, 245)">
            <circle cx="0" cy="0" r="21" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="17" fill="#15161d" />
            {/* Joystick Cap */}
            <motion.circle
              cx="0"
              cy="0"
              r="14"
              fill="#20222f"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              animate={isHovered ? {
                cx: [2.5, 0, -2.5, 0, 2.5],
                cy: [0, 2.5, 0, -2.5, 0],
              } : { cx: 0, cy: 0 }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "linear" }}
            />
            <circle cx="0" cy="0" r="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </g>

          {/* ── Twin Center Utility Buttons (Options/Share) ── */}
          <line x1="175" y1="190" x2="185" y2="190" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          <line x1="215" y1="190" x2="225" y2="190" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />

          {/* ── Sleek Curved Light Strip (Center breathing brand glow) ── */}
          <path
            d="M 170 215 Q 200 225 230 215"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <motion.path
            d="M 170 215 Q 200 225 230 215"
            fill="none"
            stroke="#7cff00"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{
              opacity: isHovered ? [0.4, 1.0, 0.4] : [0.15, 0.5, 0.15]
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0px 0px 6px #7cff00)" }}
          />
        </motion.g>

        {/* ── Layer 6: Dynamic Tech Tech Overlay ── */}
        <g className="font-display text-[7px] font-bold fill-white/20 uppercase tracking-[0.2em] pointer-events-none select-none">
          <text x="50" y="360">SYS_STATUS: ACTIVE</text>
          <text x="350" y="360" textAnchor="end">CASUAL_BROTHERS_ENGINE_v2.0</text>
          <text x="200" y="30" textAnchor="middle" fill="#7cff00" className="opacity-40" style={isHovered ? { opacity: 0.8, filter: "drop-shadow(0px 0px 6px #7cff00)" } : undefined}>
            {isHovered ? "SYSTEM OVERRIDE: 100%" : "READY TO SHIP"}
          </text>
        </g>
      </motion.svg>
    </div>
  );
}
