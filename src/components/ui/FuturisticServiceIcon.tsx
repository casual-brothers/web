"use client";

import React from "react";

interface FuturisticServiceIconProps {
  iconName: string;
  className?: string;
}

export default function FuturisticServiceIcon({ iconName, className = "w-14 h-14 md:w-16 md:h-16" }: FuturisticServiceIconProps) {
  if (iconName === "Users") {
    // Co-desarrollo: Dual cyber profile VR headsets linked by double-helix synchronization stream
    return (
      <svg className={`${className} overflow-visible`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">


        {/* Technical framing calibration corners */}
        <path d="M 6 12 L 6 6 L 12 6 M 58 12 L 58 6 L 52 6 M 6 52 L 6 58 L 12 58 M 58 52 L 58 58 L 52 58" stroke="rgba(124, 255, 0, 0.3)" strokeWidth="0.8" />

        {/* Technical grids and rings */}
        <circle cx="32" cy="32" r="30" stroke="rgba(124, 255, 0, 0.08)" strokeWidth="0.8" strokeDasharray="3 6" />
        <circle cx="32" cy="32" r="25" stroke="rgba(124, 255, 0, 0.05)" strokeWidth="0.5" />
        
        {/* Double Helix Active Data Sync Bridge */}
        <path d="M 18 32 Q 25 22 32 32 T 46 32" stroke="#7cff00" strokeWidth="1" strokeDasharray="3 3" className="opacity-45 group-hover:opacity-90 animate-[helix-flow_1.5s_linear_infinite]" />
        <path d="M 18 32 Q 25 42 32 32 T 46 32" stroke="#7cff00" strokeWidth="1" strokeDasharray="3 3" className="opacity-45 group-hover:opacity-90 animate-[helix-flow_1.5s_linear_infinite]" style={{ animationDelay: '0.75s' }} />
        
        {/* Left VR Helmet Node */}
        <g className="group-hover:translate-x-[2px] transition-transform duration-500" transform="translate(18, 32)">
          {/* Orbital Tech Ring */}
          <circle cx="0" cy="0" r="14" stroke="rgba(124, 255, 0, 0.2)" strokeWidth="0.8" strokeDasharray="4 4" className="animate-[sync-spin-left_8s_linear_infinite]" style={{ transformOrigin: '0px 0px' }} />
          {/* Outer contour */}
          <path d="M -8 -8 C -8 -13, 8 -13, 8 -8 C 8 -3, 6 6, 0 8 C -6 6, -8 -3, -8 -8 Z" fill="#12131b" stroke="#7cff00" strokeWidth="1.2" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
          {/* Glowing Visor */}
          <path d="M -6 -7 H 6 V -3 H -6 Z" fill="#7cff00" className="animate-pulse" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
          {/* Circuit connection point */}
          <line x1="0" y1="8" x2="0" y2="12" stroke="#7cff00" strokeWidth="0.8" />
          <circle cx="0" cy="12" r="1" fill="#7cff00" />
        </g>

        {/* Right VR Helmet Node */}
        <g className="group-hover:-translate-x-[2px] transition-transform duration-500" transform="translate(46, 32)">
          {/* Orbital Tech Ring */}
          <circle cx="0" cy="0" r="14" stroke="rgba(124, 255, 0, 0.2)" strokeWidth="0.8" strokeDasharray="4 4" className="animate-[sync-spin-right_8s_linear_infinite]" style={{ transformOrigin: '0px 0px' }} />
          {/* Outer contour */}
          <path d="M -8 -8 C -8 -13, 8 -13, 8 -8 C 8 -3, 6 6, 0 8 C -6 6, -8 -3, -8 -8 Z" fill="#12131b" stroke="#7cff00" strokeWidth="1.2" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
          {/* Glowing Visor */}
          <path d="M -6 -7 H 6 V -3 H -6 Z" fill="#7cff00" className="animate-pulse" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
          <line x1="0" y1="8" x2="0" y2="12" stroke="#7cff00" strokeWidth="0.8" />
          <circle cx="0" cy="12" r="1" fill="#7cff00" />
        </g>
        
        {/* Technical overlay text */}
        <text x="32" y="11" fill="rgba(124, 255, 0, 0.5)" fontSize="5.5" fontWeight="bold" textAnchor="middle" className="font-display tracking-widest">NET_SYNC: 99.8%</text>
        <text x="32" y="55" fill="rgba(124, 255, 0, 0.25)" fontSize="5.5" textAnchor="middle" className="font-display tracking-widest">CORE_LINK: ESTABLISHED</text>
        
        {/* Connection core node */}
        <circle cx="32" cy="32" r="3.5" fill="#7cff00" className="animate-ping" style={{ animationDuration: '2s' }} />
        <circle cx="32" cy="32" r="2.5" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
      </svg>
    );
  }

  if (iconName === "MonitorSmartphone") {
    // Porting y Plataformas: Widescreen curved gaming screen overlapping phone with orbital platform badges
    return (
      <svg className={`${className} overflow-visible`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">


        {/* Rotating technical indicators */}
        <circle cx="32" cy="32" r="29" stroke="rgba(124, 255, 0, 0.08)" strokeWidth="0.8" strokeDasharray="6 12" />
        
        {/* Monitor Screen Frame */}
        <g className="group-hover:-translate-y-[1px] transition-transform duration-500" transform="translate(10, 12)">
          <rect x="0" y="0" width="36" height="22" rx="2" fill="#12131b" stroke="#7cff00" strokeWidth="1.2" style={{ filter: "drop-shadow(0px 0px 5px #7cff00)" }} />
          <path d="M 18 22 L 15 27 H 21 Z" fill="#7cff00" />
          
          {/* 3D Wireframe Perspective Grid inside screen */}
          <svg x="2" y="2" width="32" height="18" viewBox="0 0 32 18" className="overflow-hidden">
            <g style={{ animation: 'terrain-slide 1.5s linear infinite' }}>
              <path d="M 0 10 L 16 2 L 32 10 M 0 14 L 16 6 L 32 14 M 0 18 L 16 10 L 32 18" stroke="rgba(124, 255, 0, 0.35)" strokeWidth="0.5" fill="none" />
              <line x1="16" y1="2" x2="16" y2="18" stroke="rgba(124, 255, 0, 0.35)" strokeWidth="0.5" />
              <line x1="8" y1="6" x2="4" y2="18" stroke="rgba(124, 255, 0, 0.35)" strokeWidth="0.5" />
              <line x1="24" y1="6" x2="28" y2="18" stroke="rgba(124, 255, 0, 0.35)" strokeWidth="0.5" />
            </g>
          </svg>
        </g>
        
        {/* Smartphone Frame (overlapping) */}
        <g className="group-hover:translate-y-[1px] transition-transform duration-500" transform="translate(38, 22)">
          <rect x="0" y="0" width="14" height="24" rx="2" fill="#12131b" stroke="#7cff00" strokeWidth="1.2" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
          <line x1="4" y1="2" x2="10" y2="2" stroke="rgba(124, 255, 0, 0.5)" strokeWidth="0.8" />
          <circle cx="7" cy="21" r="1.2" fill="#7cff00" />
          <rect x="3" y="5" width="8" height="12" fill="none" stroke="rgba(124, 255, 0, 0.15)" strokeWidth="0.5" />
          <rect x="4" y="7" width="6" height="4" fill="#7cff00" rx="0.5" className="animate-pulse" />
        </g>

        {/* Orbiting Platform Badges representing deployment targets */}
        <g className="animate-[sync-spin-left_12s_linear_infinite]" style={{ transformOrigin: '32px 32px' }}>
          {/* Console Satellite Symbol */}
          <circle cx="32" cy="5" r="3.5" fill="#12131b" stroke="#7cff00" strokeWidth="1" />
          <path d="M 30.5 4.5 H 33.5 M 32 3 V 6" stroke="#7cff00" strokeWidth="0.5" />
        </g>
        
        <g className="animate-[sync-spin-left_12s_linear_infinite]" style={{ transformOrigin: '32px 32px', animationDelay: '-6s' }}>
          {/* PC Satellite Symbol */}
          <circle cx="32" cy="5" r="3.5" fill="#12131b" stroke="#7cff00" strokeWidth="1" />
          <rect x="30.5" y="3.5" width="3" height="2.2" stroke="#7cff00" strokeWidth="0.5" fill="none" />
        </g>

        {/* Active cross-platform compiling lasers */}
        <path d="M 28 30 Q 33 24 38 30" stroke="#7cff00" strokeWidth="1" strokeDasharray="3 3" className="animate-[code-stream_1s_linear_infinite]" />
        
        {/* Technical text metrics */}
        <text x="32" y="9" fill="rgba(124, 255, 0, 0.5)" fontSize="5.5" fontWeight="bold" textAnchor="middle" className="font-display tracking-widest">PORTING_ENGINE</text>
        <text x="32" y="58" fill="rgba(124, 255, 0, 0.25)" fontSize="5.5" textAnchor="middle" className="font-display tracking-widest">COMPILER_ACTIVE</text>
      </svg>
    );
  }

  if (iconName === "Headset") {
    // Live Ops y Crecimiento: Revolving 3D globe core with degree tick sonar and growing chart line
    return (
      <svg className={`${className} overflow-visible`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">


        {/* Outer technical radar lines and degree ticks */}
        <circle cx="32" cy="32" r="30" stroke="rgba(124, 255, 0, 0.05)" strokeWidth="0.5" />
        <circle cx="32" cy="32" r="28" stroke="rgba(124, 255, 0, 0.08)" strokeWidth="0.8" strokeDasharray="3 9" />
        <circle cx="32" cy="32" r="22" stroke="rgba(124, 255, 0, 0.05)" strokeWidth="0.5" />
        
        {/* Pulsing signal indicators sweeping around */}
        <line x1="32" y1="32" x2="54" y2="18" stroke="rgba(124, 255, 0, 0.25)" strokeWidth="1.2" strokeLinecap="round" className="origin-center animate-spin" style={{ animationDuration: '4s' }} />
        <line x1="32" y1="32" x2="10" y2="46" stroke="rgba(124, 255, 0, 0.15)" strokeWidth="1" strokeLinecap="round" className="origin-center animate-spin" style={{ animationDuration: '4s', animationDelay: '-2s' }} />

        {/* Technical Cross Grid */}
        <line x1="32" y1="2" x2="32" y2="62" stroke="rgba(124, 255, 0, 0.06)" strokeWidth="0.5" />
        <line x1="2" y1="32" x2="62" y2="32" stroke="rgba(124, 255, 0, 0.06)" strokeWidth="0.5" />

        {/* Revolving 3D Globe Core representing global live service */}
        <g className="group-hover:scale-[1.03] origin-center transition-transform duration-500" transform="translate(32, 32)">
          <circle cx="0" cy="0" r="14" fill="#12131b" stroke="#7cff00" strokeWidth="1" style={{ filter: "drop-shadow(0px 0px 5px #7cff00)", opacity: 0.85 }} />
          {/* Spinning grid lines */}
          <g className="animate-[sync-spin-left_12s_linear_infinite]" style={{ transformOrigin: '0px 0px' }}>
            <ellipse cx="0" cy="0" rx="6" ry="14" stroke="rgba(124, 255, 0, 0.5)" strokeWidth="0.8" fill="none" />
            <ellipse cx="0" cy="0" rx="14" ry="5" stroke="rgba(124, 255, 0, 0.5)" strokeWidth="0.8" fill="none" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="rgba(124, 255, 0, 0.3)" strokeWidth="0.5" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="rgba(124, 255, 0, 0.3)" strokeWidth="0.5" />
          </g>
        </g>
 
        {/* Escalating tech growth chart representing live game operations */}
        <path d="M 6 48 L 18 42 L 28 44 L 42 22 L 52 12" stroke="#7cff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
        {/* Growing data nodes */}
        <circle cx="6" cy="48" r="1.5" fill="#7cff00" />
        <circle cx="18" cy="42" r="1.5" fill="#7cff00" />
        <circle cx="28" cy="44" r="1.5" fill="#7cff00" />
        <circle cx="42" cy="22" r="1.5" fill="#7cff00" />
        <circle cx="52" cy="12" r="2.5" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
        
        {/* Sonar Radar sweep ping expanding from top active node */}
        <circle cx="52" cy="12" r="1" stroke="#7cff00" strokeWidth="0.8" fill="none" className="animate-[ping-expand_2s_linear_infinite]" />
        
        {/* Technical indicators */}
        <text x="6" y="11" fill="rgba(124, 255, 0, 0.6)" fontSize="5.5" fontWeight="bold" className="font-display tracking-wider">LIVE_OPS</text>
        <text x="58" y="55" fill="rgba(124, 255, 0, 0.25)" fontSize="5.5" textAnchor="end" className="font-display tracking-widest">ONLINE: 1.4M</text>
      </svg>
    );
  }

  if (iconName === "Palette") {
    // Arte y Tech: Majestic rotating 3D wireframe mesh asset with sweeping laser scan line
    return (
      <svg className={`${className} overflow-visible`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">


        {/* Technical framing lines */}
        <path d="M 6 12 L 6 6 L 12 6 M 58 12 L 58 6 L 52 6 M 6 52 L 6 58 L 12 58 M 58 52 L 58 58 L 52 58" stroke="rgba(124, 255, 0, 0.25)" strokeWidth="0.8" />

        {/* 3D Wireframe geometric triangulation mesh asset */}
        <g className="group-hover:rotate-[25deg] origin-center transition-transform duration-1000">
          <g transform="translate(32, 32)">
            {/* The outer wireframe edges */}
            <polygon points="0,-20 16,-8 16,8 0,20 -16,8 -16,-8" fill="none" stroke="#7cff00" strokeWidth="1.2" style={{ filter: "drop-shadow(0px 0px 5px #7cff00)" }} />
            {/* Inner triangulation links */}
            <polygon points="0,-20 0,0 -16,-8" fill="none" stroke="rgba(124, 255, 0, 0.45)" strokeWidth="0.8" />
            <polygon points="0,-20 0,0 16,-8" fill="none" stroke="rgba(124, 255, 0, 0.45)" strokeWidth="0.8" />
            <polygon points="16,-8 0,0 16,8" fill="none" stroke="rgba(124, 255, 0, 0.45)" strokeWidth="0.8" />
            <polygon points="16,8 0,0 0,20" fill="none" stroke="rgba(124, 255, 0, 0.45)" strokeWidth="0.8" />
            <polygon points="0,20 0,0 -16,8" fill="none" stroke="rgba(124, 255, 0, 0.45)" strokeWidth="0.8" />
            <polygon points="-16,8 0,0 -16,-8" fill="none" stroke="rgba(124, 255, 0, 0.45)" strokeWidth="0.8" />
            
            {/* Rotating core technical dashboard ring */}
            <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(124, 255, 0, 0.3)" strokeWidth="0.8" strokeDasharray="3 3" className="animate-[sync-spin-left_6s_linear_infinite]" style={{ transformOrigin: '0px 0px' }} />
            
            {/* Interactive key vertices */}
            <circle cx="0" cy="-20" r="2.2" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
            <circle cx="16" cy="-8" r="1.5" fill="#7cff00" />
            <circle cx="16" cy="8" r="1.5" fill="#7cff00" />
            <circle cx="0" cy="20" r="2.2" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
            <circle cx="-16" cy="8" r="1.5" fill="#7cff00" />
            <circle cx="-16" cy="-8" r="1.5" fill="#7cff00" />
            <circle cx="0" cy="0" r="2" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
          </g>
        </g>
 
        {/* Sweeping Laser Scan Line (Mesh print representation) */}
        <line x1="8" y1="0" x2="56" y2="0" stroke="#7cff00" strokeWidth="1.5" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} className="animate-[laser-sweep_3.5s_ease-in-out_infinite]" />
        
        {/* Technical drafting calibration tags */}
        <line x1="48" y1="24" x2="58" y2="24" stroke="rgba(124, 255, 0, 0.15)" strokeWidth="0.8" />
        <line x1="58" y1="24" x2="58" y2="18" stroke="rgba(124, 255, 0, 0.15)" strokeWidth="0.8" />
        <text x="59" y="15" fill="rgba(124, 255, 0, 0.5)" fontSize="5.5" fontWeight="bold" className="font-display">Z: 3.42</text>
        
        <line x1="16" y1="40" x2="6" y2="40" stroke="rgba(124, 255, 0, 0.15)" strokeWidth="0.8" />
        <line x1="6" y1="40" x2="6" y2="46" stroke="rgba(124, 255, 0, 0.15)" strokeWidth="0.8" />
        <text x="5" y="52" fill="rgba(124, 255, 0, 0.5)" fontSize="5.5" fontWeight="bold" className="font-display">Y: 0.88</text>
      </svg>
    );
  }

  // Fallback: Custom Gaming Gamepad HUD icon
  return (
    <svg className={`${className} overflow-visible`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="29" stroke="rgba(124, 255, 0, 0.1)" strokeWidth="0.6" strokeDasharray="4 8" className="animate-spin-slow" />
      
      <g className="group-hover:scale-105 origin-center transition-transform duration-500">
        <path
          d="M 22 22 C 18 18, 14 22, 12 26 C 8 34, 10 46, 16 48 C 20 49, 22 45, 26 43 C 28 42, 36 42, 38 43 C 42 45, 44 49, 48 48 C 54 46, 56 34, 52 26 C 50 22, 46 18, 42 22 C 38 26, 36 27, 32 27 C 28 27, 26 26, 22 22 Z"
          stroke="#7cff00"
          strokeWidth="1.2"
          style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }}
        />
        <path d="M 18 29 L 18 35 M 15 32 L 21 32" stroke="#7cff00" strokeWidth="0.8" />
        <circle cx="44" cy="30" r="1" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
        <circle cx="48" cy="33" r="1" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
        <circle cx="40" cy="33" r="1" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
        <circle cx="44" cy="36" r="1" fill="#7cff00" style={{ filter: "drop-shadow(0px 0px 3px #7cff00)" }} />
        <circle cx="25" cy="37" r="2" stroke="rgba(124, 255, 0, 0.5)" strokeWidth="0.8" />
        <circle cx="39" cy="37" r="2" stroke="rgba(124, 255, 0, 0.5)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
