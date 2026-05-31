"use client";

import { motion } from "framer-motion";
import FuturisticServiceIcon from "./FuturisticServiceIcon";

interface ServiceCardProps {
  iconName: string;
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ iconName, title, description, index }: ServiceCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card rounded-lg p-6 text-center flex flex-col items-center gap-5"
    >
      {/* Glowing Icon */}
      <div className="relative w-[120px] h-[120px] flex items-center justify-center">
        {/* Outer glow ring - pulses */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(124,255,0,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Animated ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          className="absolute inset-2 rounded-full border border-brand/20 group-hover:border-brand/40 transition-colors duration-500"
        >
          {/* Spinning dash accent */}
          <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="48"
              fill="none"
              stroke="rgba(124,255,0,0.4)"
              strokeWidth="1"
              strokeDasharray="12 88"
              strokeLinecap="round"
              className="group-hover:stroke-brand transition-colors duration-500"
            />
          </svg>
        </motion.div>

        {/* Inner hexagonal bg */}
        <div
          className="absolute inset-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-brand/20 group-hover:bg-brand/[0.03] transition-all duration-500"
        />

        {/* The Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 + 0.2 }}
          className="relative z-10 group-hover:scale-110 transition-transform duration-500"
        >
          <FuturisticServiceIcon iconName={iconName} className="w-16 h-16" />
        </motion.div>
      </div>

      <h3 className="font-display text-sm font-bold uppercase tracking-wider leading-tight whitespace-pre-line text-white">
        {title}
      </h3>
      <p className="text-xs text-white/50 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
