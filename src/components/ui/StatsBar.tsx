"use client";

import { animate, motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface StatItem {
  value: string;
  label: string;
}

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Parse "50+" → { num: 50, suffix: "+" }
  // Parse "100M+" → { num: 100, suffix: "M+" }
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    if (!inView || !ref.current || hasAnimated.current || !match) return;
    hasAnimated.current = true;

    const el = ref.current;
    const controls = animate(0, targetNum, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        el.textContent = Math.floor(latest) + suffix;
      },
    });

    return () => controls.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{match ? `0${suffix}` : value}</span>;
}

export default function StatsBar({ stats }: { stats: StatItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-lg p-6 md:p-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center relative">
            {idx > 0 && (
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/8" />
            )}
            <div className="font-display text-4xl md:text-5xl font-bold text-brand tracking-tight">
              <AnimatedValue value={stat.value} inView={inView} />
            </div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/35 whitespace-pre-line leading-relaxed">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
