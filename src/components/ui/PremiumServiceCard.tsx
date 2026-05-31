"use client";

import { motion } from "framer-motion";
import { Gamepad2, Users, MonitorSmartphone, Headset, Palette, type LucideIcon } from "lucide-react";
import FuturisticServiceIcon from "./FuturisticServiceIcon";

const iconMap: Record<string, LucideIcon> = {
  Gamepad2,
  Users,
  MonitorSmartphone,
  Headset,
  Palette,
};

interface PremiumServiceCardProps {
  iconName: string;
  title: string;
  description: string;
  index: number;
}

export default function PremiumServiceCard({ iconName, title, description, index }: PremiumServiceCardProps) {
  const Icon = iconMap[iconName] || Gamepad2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden glass-card border border-white/5 hover:border-brand/20 transition-colors duration-500"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
      <div className="absolute inset-0 group-hover:opacity-100 opacity-0 transition-opacity duration-500" style={{ background: 'rgba(124,255,0,0.03)' }} />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:animate-shimmer" />
      </div>

      <div className="relative p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-stretch h-full">
        {/* Glowing Icon Area (Left side) */}
        <div className="w-32 h-32 md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] shrink-0 rounded-xl border border-white/5 group-hover:border-brand/15 flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] transition-colors duration-500" style={{ background: 'rgba(14,14,14,0.8)' }}>
          
          {/* Radial glow behind icon */}
          <div
            className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
            style={{ background: 'radial-gradient(circle at center, rgba(124,255,0,0.12) 0%, transparent 60%)' }}
          />

          {/* Animated outer ring */}
          <div className="absolute inset-6 md:inset-8">
            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="48"
                fill="none"
                stroke="rgba(124,255,0,0.15)"
                strokeWidth="0.5"
                strokeDasharray="8 20"
                strokeLinecap="round"
                className="group-hover:stroke-brand/40 transition-colors duration-700"
              />
            </svg>
          </div>

          {/* Second counter-rotating ring */}
          <div className="absolute inset-10 md:inset-14">
            <svg className="w-full h-full" viewBox="0 0 100 100" style={{ animation: 'spin 25s linear infinite reverse' }}>
              <circle
                cx="50" cy="50" r="48"
                fill="none"
                stroke="rgba(124,255,0,0.1)"
                strokeWidth="0.5"
                strokeDasharray="15 35"
                strokeLinecap="round"
                className="group-hover:stroke-brand/30 transition-colors duration-700"
              />
            </svg>
          </div>

          {/* The Icon — large with bloom */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: index * 0.12 + 0.2 }}
            className="relative z-10 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center"
          >
            <FuturisticServiceIcon iconName={iconName} className="w-24 h-24 md:w-28 md:h-28" />
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-brand/20 group-hover:border-brand/50 rounded-tl transition-colors duration-500" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-brand/20 group-hover:border-brand/50 rounded-br transition-colors duration-500" />

          {/* Pulsing Active Status LED (Cyber HUD unification) */}
          <div className="absolute top-3 right-3 flex items-center justify-center z-20">
            <div
              className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse shadow-[0_0_6px_#7cff00]"
              style={{ animationDuration: "2s" }}
            />
          </div>
        </div>

        {/* Content Area (Right side) */}
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left justify-center">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-8 h-px group-hover:w-12 group-hover:bg-brand transition-all duration-300" style={{ background: 'rgba(124,255,0,0.3)' }} />
            <Icon className="w-4 h-4 group-hover:text-brand transition-colors duration-300" style={{ color: 'rgba(124,255,0,0.7)' }} />
            <span className="font-display text-[6.5px] font-extrabold tracking-[0.2em] text-white/20 group-hover:text-brand/50 transition-colors duration-300 select-none uppercase">
              CORE // CB-SRV-0{index + 1}
            </span>
          </div>
          
          <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-brand transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-white/50 leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
