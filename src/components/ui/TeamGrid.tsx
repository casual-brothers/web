"use client";

import { useState } from "react";
import { assetPath } from "@/lib/basePath";
import { motion, AnimatePresence } from "framer-motion";
import type { TeamMember } from "@/data/team";

/* ─── RPG Gaming Stats Configuration for Team Members ─── */
interface RpgStats {
  classEs: string;
  classEn: string;
  stats: { nameEs: string; nameEn: string; value: number }[];
  ultimateEs: string;
  ultimateEn: string;
  quoteEs: string;
  quoteEn: string;
  specialtyEs: string;
  specialtyEn: string;
  caffeine: number;
  gamerScore: number;
  funLevel: number;
}

const rpgStatsMap: Record<string, RpgStats> = {
  "belen-jimenez": {
    classEs: "CLASE // LÍDER PALADÍN [LVL. 99]",
    classEn: "CLASS // PALADIN LEADER [LVL. 99]",
    stats: [
      { nameEs: "CARISMA", nameEn: "CHARISMA", value: 99 },
      { nameEs: "VISIÓN", nameEn: "VISION", value: 95 },
      { nameEs: "RECURSOS", nameEn: "FUNDING", value: 100 }
    ],
    ultimateEs: "Definitiva: Adquisición Estratégica",
    ultimateEn: "Ultimate: Strategic Acquisition",
    quoteEs: "El presupuesto no es un límite, es un reto. ¡A liderar!",
    quoteEn: "Budget is not a limit, it's a challenge. Let's lead!",
    specialtyEs: "💰 ARCAS INFINITAS: Inmune a las limitaciones de presupuesto.",
    specialtyEn: "💰 INFINITE FUNDS: Immune to budget limitations.",
    caffeine: 95,
    gamerScore: 99990,
    funLevel: 100
  },
  "hernan-castillo": {
    classEs: "CLASE // ESTRATEGA GUERRERO [LVL. 95]",
    classEn: "CLASS // TACTICIAN WARRIOR [LVL. 95]",
    stats: [
      { nameEs: "LIDERAZGO", nameEn: "LEADERSHIP", value: 98 },
      { nameEs: "DIPLOMACIA", nameEn: "DIPLOMACY", value: 95 },
      { nameEs: "STAMINA", nameEn: "STAMINA", value: 90 }
    ],
    ultimateEs: "Definitiva: Pacto de Publisher",
    ultimateEn: "Ultimate: Publisher Covenant",
    quoteEs: "¿15 títulos lanzados? El próximo será el mejor. ¡Adelante!",
    quoteEn: "15 titles launched? The next one will be the best. Forward!",
    specialtyEs: "🤝 CONJURO EDITORIAL: Consigue contratos con publishers sin pestañear.",
    specialtyEn: "🤝 PUBLISHER CONJURING: Signs deals with publishers without blinking.",
    caffeine: 88,
    gamerScore: 85000,
    funLevel: 100
  },
  "xavi-espejo": {
    classEs: "CLASE // CRONOMANTE PÍCARO [LVL. 92]",
    classEn: "CLASS // CHRONOMANCER ROGUE [LVL. 92]",
    stats: [
      { nameEs: "PIPELINES", nameEn: "PIPELINES", value: 99 },
      { nameEs: "SPRINT CONTROL", nameEn: "SPRINT CTRL", value: 95 },
      { nameEs: "AGILIDAD", nameEn: "AGILITY", value: 92 }
    ],
    ultimateEs: "Definitiva: Cero Crunch",
    ultimateEn: "Ultimate: Zero Crunch",
    quoteEs: "El crunch es para novatos. Nosotros hacemos magia puntual.",
    quoteEn: "Crunch is for amateurs. We deliver magic right on time.",
    specialtyEs: "⏳ FLUJO TEMPORAL: Multiplica por 1.5 la velocidad sin generar crunch.",
    specialtyEn: "⏳ TIME FLOW: Multiplies speed by 1.5 without creating crunch.",
    caffeine: 120,
    gamerScore: 92400,
    funLevel: 100
  },
  "israel-fernandez": {
    classEs: "CLASE // MAGO ILUSIONISTA [LVL. 96]",
    classEn: "CLASS // ART MAGE [LVL. 96]",
    stats: [
      { nameEs: "CREATIVIDAD", nameEn: "CREATIVITY", value: 99 },
      { nameEs: "TEORÍA COLOR", nameEn: "COLOR THEORY", value: 98 },
      { nameEs: "PIXEL PERFECT", nameEn: "PIXEL PERFECT", value: 96 }
    ],
    ultimateEs: "Definitiva: Lienzo Sagrado",
    ultimateEn: "Ultimate: Holy Canvas",
    quoteEs: "Si un juego no tiene luces de neón, no está terminado.",
    quoteEn: "If a game doesn't have neon neons, it's not finished.",
    specialtyEs: "🎨 OJO CROMÁTICO: Detecta píxeles incorrectos a 10 kilómetros.",
    specialtyEn: "🎨 CHROMATIC VISION: Detects bad pixels from 10 kilometers away.",
    caffeine: 90,
    gamerScore: 96200,
    funLevel: 100
  },
  "jose-manuel-vilchez": {
    classEs: "CLASE // MATE-MAGO TÉCNICO [LVL. 98]",
    classEn: "CLASS // TECH WIZARD [LVL. 98]",
    stats: [
      { nameEs: "DEPURACIÓN", nameEn: "DEBUGGING", value: 99 },
      { nameEs: "HECHIZO C#", nameEn: "C# SPELLS", value: 97 },
      { nameEs: "ARQUITECTURA", nameEn: "ARCHITECTURE", value: 96 }
    ],
    ultimateEs: "Definitiva: Compilación Perfecta",
    ultimateEn: "Ultimate: Clean Build",
    quoteEs: "Compila en mi máquina, por lo tanto compila en producción.",
    quoteEn: "It compiles on my machine, therefore it compiles in production.",
    specialtyEs: "💻 MAGIA NEGRA C#: Su código no falla, solo se adapta al entorno.",
    specialtyEn: "💻 C# BLACK MAGIC: His code doesn't fail, it adapts to the environment.",
    caffeine: 150,
    gamerScore: 98900,
    funLevel: 100
  }
};

const defaultRpg: RpgStats = {
  classEs: "CLASE // DESARROLLADOR DE JUEGOS [LVL. 90]",
  classEn: "CLASS // GAME DEV [LVL. 90]",
  stats: [
    { nameEs: "DIVERSIÓN", nameEn: "FUN", value: 95 },
    { nameEs: "PASIÓN", nameEn: "PASSION", value: 95 },
    { nameEs: "ESFUERZO", nameEn: "EFFORT", value: 95 }
  ],
  ultimateEs: "Definitiva: Creatividad Pura",
  ultimateEn: "Ultimate: Pure Creativity",
  quoteEs: "Creando diversión para el mundo.",
  quoteEn: "Creating fun for the world.",
  specialtyEs: "👾 GAMER: Amante de los videojuegos de corazón.",
  specialtyEn: "👾 GAMER: Videogame lover by heart.",
  caffeine: 80,
  gamerScore: 50000,
  funLevel: 100
};

/* ─── Shared Web Audio API Context (GPU-friendly Single Instance to bypass browser locks) ─── */
let sharedCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedCtx) {
      const audioWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
      const AudioContextClass = window.AudioContext || audioWindow.webkitAudioContext;
      if (AudioContextClass) {
        sharedCtx = new AudioContextClass();
      }
    }
    // Synchronously resume if suspended (standard browser security restriction lifter)
    if (sharedCtx && sharedCtx.state === "suspended") {
      sharedCtx.resume();
    }
  } catch (e) {
    console.error("Failed to initialize or resume AudioContext:", e);
  }
  return sharedCtx;
};

/* ─── Programmatic 8-bit Audio Synthesizer (Web Audio API) ─── */
const playSound = (type: string, isSoundMuted: boolean) => {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    if (type === "hover") {
      // Short retro high-tech scanning blip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "belen-jimenez") {
      // Golden paladin arpeggio (C4 -> E4 -> G4 -> C5)
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.22);
      });
    } else if (type === "hernan-castillo") {
      // Deep strategical cyber sweep
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(330, ctx.currentTime + 0.35);
      
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(180, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.35);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "xavi-espejo") {
      // Accelerated temporal ticks (tack-tack laser)
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq * 1.3, ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.02, ctx.currentTime + i * 0.04);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + i * 0.04 + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + i * 0.04 + 0.1);
      });
    } else if (type === "israel-fernandez") {
      // Colorful illusion wave sweep
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.setValueAtTime(290, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(580, ctx.currentTime + 0.28);
      osc2.frequency.setValueAtTime(293, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(583, ctx.currentTime + 0.28);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.32);
      osc2.stop(ctx.currentTime + 0.32);
    } else if (type === "jose-manuel-vilchez") {
      // Glitchy compute byte notes (rapid retro CPU calculation)
      const freqs = [523, 659, 784, 988, 1175, 1318];
      for (let i = 0; i < 7; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        const note = freqs[Math.floor(Math.random() * freqs.length)];
        osc.frequency.setValueAtTime(note, ctx.currentTime + i * 0.035);
        gain.gain.setValueAtTime(0.025, ctx.currentTime + i * 0.035);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + i * 0.035 + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.035);
        osc.stop(ctx.currentTime + i * 0.035 + 0.05);
      }
    } else if (type === "lock") {
      // Heavy satisfaction coin power-up sound
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = "square";
      osc2.type = "triangle";
      
      osc1.frequency.setValueAtTime(330, ctx.currentTime);
      osc1.frequency.setValueAtTime(660, ctx.currentTime + 0.08);
      osc2.frequency.setValueAtTime(165, ctx.currentTime);
      osc2.frequency.setValueAtTime(330, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.22);
      osc2.stop(ctx.currentTime + 0.22);
    }
  } catch (e) {
    console.error("Audio playback error inside synthesized helper:", e);
  }
};

export default function TeamGrid({ members, locale }: { members: TeamMember[]; locale: string }) {
  const [hoveredMember, setHoveredMember] = useState<TeamMember | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Muted by default to comply with accessibility

  // Sound and Shake logic on select
  const handleSelect = (member: TeamMember) => {
    setSelectedMember(member);
    setClickedId(member.id);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);

    // Initialize/resume context SYNCHRONOUSLY during user click gesture to lift browser autoplay block
    getAudioContext();

    // Play character-specific selection sound and lock-in tone
    playSound(member.id, isMuted);
    if (!isMuted) {
      setTimeout(() => playSound("lock", false), 150);
    }
  };

  const activeMember = hoveredMember || selectedMember;
  const activeRpg = activeMember ? (rpgStatsMap[activeMember.id] || defaultRpg) : null;

  return (
    <div className="space-y-12">
      {/* Mobile-first roster: make it immediately clear this is a team, not one profile. */}
      <div className="rounded-xl border border-white/10 bg-black/30 p-3 md:hidden">
        <div className="mb-3 flex items-center justify-between gap-3 text-[8px] font-display font-bold uppercase tracking-[0.14em]">
          <span className="text-brand">
            {locale === "es" ? "Equipo // perfiles" : "Team // profiles"}
          </span>
          <span className="text-white/45">
            {locale === "es" ? "Toca un perfil" : "Tap a profile"}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {members.map((member) => {
            const isSelected = selectedMember?.id === member.id;

            return (
              <button
                key={member.id}
                type="button"
                onClick={() => handleSelect(member)}
                aria-pressed={isSelected}
                aria-label={`${locale === "es" ? "Ver perfil de" : "View profile for"} ${member.name}`}
                className={`flex min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-1.5 transition-colors ${
                  isSelected
                    ? "bg-brand/10 text-brand"
                    : "text-white/55 active:bg-white/5"
                }`}
              >
                <span className={`h-11 w-11 overflow-hidden rounded-full border transition-colors ${
                  isSelected ? "border-brand shadow-[0_0_10px_rgba(124,255,0,0.3)]" : "border-white/15"
                }`}>
                  <img
                    src={assetPath(member.avatar)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="w-full truncate text-center text-[7px] font-bold uppercase tracking-wide">
                  {member.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 1. ARCADE CHARACTER SELECTION HUD DASHBOARD ─── */}
      <motion.div
        animate={isShaking ? {
          x: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0],
          y: [0, 4, -4, 3, -3, 2, -2, 1, -1, 0],
          transition: { duration: 0.45, ease: "easeInOut" }
        } : {}}
        className="w-full glass-panel border border-brand-20 hover:border-brand-50 rounded-2xl p-6 relative overflow-hidden transition-colors duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.5)] max-w-4xl mx-auto"
      >
        {/* Corner Telemetry Tech Callouts */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-brand/50" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-brand/50" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-brand/50" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-brand/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand/[0.015] via-transparent to-brand/[0.015] pointer-events-none" />

        {/* Dashboard Status Bar */}
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4 text-[9px] font-mono text-white/40 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <span className="font-display font-bold text-white/60">
              {locale === "es" ? "CABINA ARCADE // SELECCIÓN DE HÉROES" : "ARCADE COCKPIT // HERO SELECTION MODULE"}
            </span>
          </div>

          {/* Cyber Mute/Unmute Toggle */}
          <button
            onClick={() => {
              const newMuted = !isMuted;
              setIsMuted(newMuted);
              // Initialize & resume shared AudioContext synchronously inside click gesture to permanently unlock audio
              getAudioContext();
              
              if (!newMuted) {
                // Play immediate confirmation chime synchronously
                playSound("lock", false);
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all duration-300 font-bold select-none cursor-pointer ${
              !isMuted
                ? "bg-brand/10 border-brand/50 text-brand shadow-[0_0_10px_rgba(124,255,0,0.15)] animate-pulse"
                : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"
            }`}
          >
            <span>{!isMuted ? "🔊" : "🔇"}</span>
            <span className="text-[7.5px] font-display font-black tracking-widest">
              {locale === "es"
                ? `SONIDO: ${!isMuted ? "ACTIVO" : "MUTADO"}`
                : `AUDIO: ${!isMuted ? "ON" : "MUTED"}`}
            </span>
          </button>
        </div>

        {/* Dynamic Display Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[140px]">
          {/* Section A: Active Character Hologram Scanner */}
          <div className="md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 pr-0 md:pr-4 py-2 relative">
            <AnimatePresence mode="wait">
              {activeMember ? (
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.85, rotateY: -90 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative text-center"
                >
                  {/* Digital Hologram scanning target overlay */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand/40 relative shadow-[0_0_20px_rgba(124,255,0,0.15)] mx-auto">
                    <img
                      src={assetPath(activeMember.avatar)}
                      alt={activeMember.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-brand/5 mix-blend-color-dodge pointer-events-none" />
                    {/* Hologram scan line */}
                    <div className="absolute inset-x-0 h-0.5 bg-brand/60 shadow-[0_0_6px_#7cff00] animate-[shimmer_2s_infinite] top-0 pointer-events-none" />
                  </div>
                  <div className="mt-2 text-[7px] font-mono text-brand font-black tracking-wider animate-pulse uppercase">
                    👾 {locale === "es" ? "CONEXIÓN ESTABLE" : "LINK ESTABLISHED"}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle-scanner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center space-y-2 py-4"
                >
                  <div className="w-24 h-24 rounded-full border border-dashed border-white/10 flex items-center justify-center relative">
                    <svg className="w-10 h-10 text-white/15 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div className="absolute inset-0 rounded-full border border-brand/5 animate-pulse" />
                  </div>
                  <span className="text-[7.5px] font-mono text-white/20 uppercase tracking-widest">
                    {locale === "es" ? "HUÉSPED AUSENTE" : "IDLE SYSTEM SCAN"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section B: Hero Details Screen */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-2 py-2">
            <AnimatePresence mode="wait">
              {activeMember && activeRpg ? (
                <motion.div
                  key={`details-${activeMember.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2 text-left"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-display text-lg md:text-xl font-black uppercase text-white tracking-wide leading-none">
                      {activeMember.name}
                    </h3>
                    <span className="text-[7.5px] font-mono text-brand font-black px-1.5 py-0.5 rounded bg-brand/10 border border-brand/20 select-none animate-pulse">
                      {selectedMember?.id === activeMember.id ? "P1 LOCKED" : "SELECT READY"}
                    </span>
                  </div>

                  <div className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-brand">
                    {locale === "es" ? activeRpg.classEs : activeRpg.classEn}
                  </div>

                  <p className="text-[10px] text-white/60 leading-relaxed font-sans italic font-medium">
                    &ldquo;{locale === "es" ? activeRpg.quoteEs : activeRpg.quoteEn}&rdquo;
                  </p>

                  <div className="text-[9.5px] font-bold text-brand-hover tracking-wide pt-1">
                    {locale === "es" ? activeRpg.specialtyEs : activeRpg.specialtyEn}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2 text-center md:text-left py-4"
                >
                  <h3 className="font-display text-xl font-extrabold uppercase text-white tracking-widest leading-none select-none flex items-center justify-center md:justify-start gap-2">
                    <span className="text-brand animate-pulse font-mono">[</span> 
                    <span className="animate-[pulse_1.5s_infinite]">{locale === "es" ? "INSERTE MONEDA" : "INSERT COIN"}</span>
                    <span className="text-brand animate-pulse font-mono">]</span>
                  </h3>
                  <p className="text-[10.5px] font-display font-medium text-white/35 leading-relaxed max-w-sm uppercase tracking-wider">
                    <span className="md:hidden">
                      {locale === "es"
                        ? "Toca un perfil del equipo para ver su rol, experiencia y habilidades."
                        : "Tap a team profile to see their role, experience and abilities."}
                    </span>
                    <span className="hidden md:inline">
                      {locale === "es"
                        ? "Activa el sonido, pasa el cursor sobre un miembro o haz clic para bloquear tu personaje y activar su habilidad definitiva."
                        : "Turn audio ON, hover over a team member or click to lock your character and trigger their ultimate ability."}
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section C: Telemetry Stats Cards */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 pl-0 md:pl-6 flex flex-col justify-center space-y-3">
            <AnimatePresence mode="wait">
              {activeMember && activeRpg ? (
                <motion.div
                  key={`telemetry-${activeMember.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5"
                >
                  {/* Stat: Caffeine */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[8px] font-extrabold tracking-wider text-white/45 uppercase select-none">
                      <span>☕ {locale === "es" ? "NIVEL DE CAFEÍNA" : "CAFFEINE INTAKE"}</span>
                      <span className={`${activeRpg.caffeine >= 120 ? "text-red-500 font-bold" : "text-brand"}`}>
                        {activeRpg.caffeine}% {activeRpg.caffeine >= 120 && "⚠️"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        className={`h-full rounded-full relative ${
                          activeRpg.caffeine >= 120 ? "bg-red-500" : "bg-brand"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(activeRpg.caffeine, 100)}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          boxShadow: activeRpg.caffeine >= 120 ? "0 0 5px #ff0055" : "0 0 5px #7cff00",
                        }}
                      />
                    </div>
                  </div>

                  {/* Stat: Gamer Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[8px] font-extrabold tracking-wider text-white/45 uppercase select-none">
                      <span>🏆 {locale === "es" ? "PUNTUACIÓN GAMER" : "GAMER SCORE"}</span>
                      <span className="text-brand font-black">{activeRpg.gamerScore.toLocaleString()} G</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-brand rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeRpg.gamerScore / 100000) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          boxShadow: "0 0 5px #7cff00",
                        }}
                      />
                    </div>
                  </div>

                  {/* Stat: Pure Fun */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[8px] font-extrabold tracking-wider text-white/45 uppercase select-none">
                      <span>🎮 {locale === "es" ? "DIVERSIÓN PURA" : "FUN FACTOR"}</span>
                      <span className="text-brand font-black">{activeRpg.funLevel}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-brand rounded-full relative animate-pulse"
                        initial={{ width: 0 }}
                        animate={{ width: `${activeRpg.funLevel}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          boxShadow: "0 0 5px #7cff00",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle-telemetry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2 py-4 text-center select-none"
                >
                  <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] leading-normal">
                    {locale === "es"
                      ? "TELEMETRÍA EN ESPERA"
                      : "TELEMETRY STANDBY"}
                  </div>
                  <div className="flex gap-1 justify-center">
                    <div className="w-2 h-1 bg-white/5 animate-[pulse_0.8s_infinite]" />
                    <div className="w-2 h-1 bg-white/5 animate-[pulse_0.8s_infinite_0.2s]" />
                    <div className="w-2 h-1 bg-white/5 animate-[pulse_0.8s_infinite_0.4s]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Ultimate Banner Ticker */}
        <AnimatePresence>
          {activeMember && activeRpg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 pt-3 border-t border-white/5 overflow-hidden"
            >
              <div className="bg-brand/10 border border-brand/30 rounded px-3 py-1.5 flex items-center justify-between animate-pulse">
                <span className="text-[8.5px] font-display font-black tracking-widest text-brand uppercase">
                  💥 {locale === "es" ? activeRpg.ultimateEs : activeRpg.ultimateEn}
                </span>
                <span className="text-[7.5px] font-mono text-white/50 uppercase tracking-widest">
                  {selectedMember?.id === activeMember.id ? "ULTIMATE TRIGGERED!" : "READY TO UNLEASH"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ─── 2. THE TEAM CARDS GRID ─── */}
      <div className="hidden flex-wrap justify-center gap-x-12 gap-y-14 md:flex">
        {members.map((member, i) => {
          const rpg = rpgStatsMap[member.id] || defaultRpg;
          const isSelected = selectedMember?.id === member.id;
          const isHovered = hoveredMember?.id === member.id;

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onMouseEnter={() => {
                setHoveredMember(member);
                // Hover sounds play only if the user has unmuted the cockpit
                playSound("hover", isMuted);
              }}
              onMouseLeave={() => setHoveredMember(null)}
              onClick={() => handleSelect(member)}
              className="group relative text-center w-[200px] cursor-pointer"
            >
              {/* Avatar Frame with custom selection Crosshair */}
              <div
                className={`relative mx-auto w-28 h-28 md:w-32 md:h-32 mb-4 rounded-full overflow-hidden border-2 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.4)] ${
                  isSelected
                    ? "border-brand glow-brand scale-105"
                    : isHovered
                    ? "border-brand/50 shadow-[0_0_15px_rgba(124,255,0,0.2)]"
                    : "border-white/10"
                }`}
              >
                <img
                  src={assetPath(member.avatar)}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Expanding pulse animation on click */}
                {clickedId === member.id && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.85 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    onAnimationComplete={() => setClickedId(null)}
                    className="absolute inset-0 rounded-full border-2 border-brand pointer-events-none z-30"
                  />
                )}

                {/* Inner glowing edge shadow on hover/select */}
                <div className={`absolute inset-0 rounded-full transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(124,255,0,0.35)] z-10 pointer-events-none ${
                  isSelected || isHovered ? "opacity-100" : "opacity-0"
                }`} />

                {/* High-tech selection reticle around avatar on hover (Cyber character screen) */}
                <div className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none scale-90 group-hover:scale-100 flex items-center justify-center z-15 ${
                  isSelected || isHovered ? "opacity-100" : "opacity-0"
                }`}>
                  <svg className="w-full h-full animate-[spin-slow_15s_linear_infinite] absolute inset-0 text-brand/35" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 14" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 6" className="opacity-50" />
                  </svg>
                </div>
              </div>

              {/* Name */}
              <h3 className={`font-display text-sm md:text-base font-bold uppercase tracking-wide transition-colors duration-300 ${
                isSelected ? "text-brand" : "text-white group-hover:text-brand"
              }`}>
                {member.name}
              </h3>

              {/* Role / Job Title */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand mt-1 select-none">
                {locale === "es" ? member.roleEs : member.role}
              </p>

              {/* Card Body Morphing Container (Biography -> RPG HUD stats on hover) */}
              <div className="relative mt-2 min-h-[96px] w-full overflow-visible">
                {/* Biography Text (Smoothly fades out on hover) */}
                <div className="transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:translate-y-3 group-hover:pointer-events-none text-center">
                  <p className="text-[11px] text-white/35 leading-relaxed">
                    {locale === "es" ? member.descriptionEs : member.description}
                  </p>
                </div>

                {/* RPG HUD Stats Panel (Smoothly fades and slides up in its place) */}
                <div className="absolute inset-0 opacity-0 scale-95 translate-y-[-5px] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none border border-white/0 group-hover:border-brand/20 group-hover:bg-black/75 rounded-xl px-2.5 py-2.5 text-left z-20">
                  {/* Corner calibrations for cockpit HUD style */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-brand/40" />
                  <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-brand/40" />
                  
                  {/* Class Title */}
                  <div className="font-display text-[6.5px] font-black tracking-[0.15em] text-brand/85 uppercase select-none">
                    {locale === "es" ? rpg.classEs : rpg.classEn}
                  </div>

                  {/* Stats progress bars */}
                  <div className="space-y-1.5 mt-2">
                    {rpg.stats.map((st) => (
                      <div key={st.nameEn} className="flex flex-col gap-0.5">
                        <div className="flex justify-between font-display text-[5px] font-extrabold tracking-wider text-white/50">
                          <span>{locale === "es" ? st.nameEs : st.nameEn}</span>
                          <span className="text-brand/85">{st.value}%</span>
                        </div>
                        {/* Glowing stat bar background */}
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-full bg-brand rounded-full relative animate-pulse"
                            style={{
                              boxShadow: "0 0 4px #7cff00",
                              width: `${st.value}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ultimate ability */}
                  <div className="mt-2 text-[4.5px] font-extrabold tracking-[0.08em] text-white/40 uppercase text-center truncate select-none">
                    💥 {locale === "es" ? rpg.ultimateEs : rpg.ultimateEn}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
