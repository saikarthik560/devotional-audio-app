"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayeredBackground } from "@/components/LayeredBackground";
import { ParticleSystem } from "@/components/ParticleSystem";
import { GlowLayer } from "@/components/GlowLayer";
import { Poem } from "@/lib/poems";
import { useAudioAnalyzer } from "@/hooks/useAudioAnalyzer";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface PoemClientProps {
  poem: Poem;
}

export function PoemClient({ poem }: PoemClientProps) {
  const [sacredMode, setSacredMode] = useState(false);
  const showControls = !sacredMode;
  const seekRef = useRef<HTMLDivElement>(null);

  const {
    audioLevel,
    isPlaying,
    currentTime,
    duration,
    toggle,
    seek,
    load,
  } = useAudioAnalyzer();

  useEffect(() => {
    if (poem?.hasAudio) {
      load(poem.audioUrl);
    }
  }, [poem, load]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && sacredMode) {
      setSacredMode(false);
    }
    if (e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }, [sacredMode, toggle]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (sacredMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sacredMode]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent | React.TouchEvent) => {
    if (!seekRef.current) return;
    const rect = seekRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    seek(percent * duration);
  };

  return (
    <div
      className="relative min-h-screen bg-[#0a0a14] overflow-x-hidden"
      onClick={() => sacredMode && setSacredMode(false)}
    >
      <LayeredBackground backgroundImage={poem.hasBackground ? poem.backgroundUrl : undefined} intensity={1.2 + audioLevel * 0.5} />
      <ParticleSystem count={18} layer="background" audioIntensity={audioLevel} interactive={!sacredMode} />
      <GlowLayer intensity={1 + audioLevel * 0.8} audioReactive audioLevel={audioLevel} color="gold" />
      <ParticleSystem count={12} layer="foreground" audioIntensity={audioLevel} interactive={!sacredMode} />

      <AnimatePresence>
        {sacredMode && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, 
                  transparent 20%, 
                  rgba(0, 0, 0, 0.6) 60%, 
                  rgba(0, 0, 0, 0.95) 100%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!sacredMode && showControls && (
          <motion.div
            className="relative z-30 min-h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="p-6 md:p-8">
              <div className="flex items-center justify-between">
                <Link
                  href="/library"
                  className="flex items-center gap-3 text-amber-400/60 hover:text-amber-300 transition-colors duration-500 p-2"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-serif text-base">Library</span>
                </Link>

                <motion.button
                  onClick={() => setSacredMode(true)}
                  className="flex items-center gap-2 text-amber-400/50 hover:text-amber-300 transition-colors duration-500 font-serif text-sm p-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Sacred Mode</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </motion.button>
              </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
              <motion.div
                className="relative mb-10"
                animate={{
                  scale: 1 + audioLevel * 0.08,
                }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      `0 0 ${40 + audioLevel * 60}px ${20 + audioLevel * 30}px rgba(218, 165, 32, ${0.15 + audioLevel * 0.2})`,
                      `0 0 ${60 + audioLevel * 80}px ${30 + audioLevel * 40}px rgba(218, 165, 32, ${0.25 + audioLevel * 0.3})`,
                      `0 0 ${40 + audioLevel * 60}px ${20 + audioLevel * 30}px rgba(218, 165, 32, ${0.15 + audioLevel * 0.2})`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-amber-600/30">
                  {poem.hasDeityImage ? (
                    <Image src={poem.deityImageUrl} alt={poem.deity} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-900/40 to-slate-900/60 flex items-center justify-center">
                      <Image src="/icons/om.svg" alt="Om" width={100} height={100} className="opacity-50" />
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.h1
                className="font-serif text-3xl md:text-4xl text-amber-100 text-center mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ textShadow: `0 0 ${20 + audioLevel * 30}px rgba(218, 165, 32, ${0.4 + audioLevel * 0.3})` }}
              >
                {poem.title}
              </motion.h1>

              <motion.p
                className="font-serif text-xl text-amber-300/60 text-center mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {poem.deity} • {poem.mood}
              </motion.p>

              <motion.p
                className="font-serif text-amber-400/40 text-sm text-center mb-10 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Sung by {poem.recorded_by} • {poem.recorded_year}
              </motion.p>

              {poem.hasAudio ? (
                <div className="w-full max-w-md">
                  <motion.button
                    onClick={toggle}
                    className="mx-auto mb-10 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-800/50 to-amber-900/70 border border-amber-500/40 shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    animate={{
                      boxShadow: isPlaying
                        ? `0 0 ${40 + audioLevel * 50}px rgba(218, 165, 32, ${0.4 + audioLevel * 0.4})`
                        : "0 0 25px rgba(218, 165, 32, 0.2)",
                    }}
                  >
                    {isPlaying ? (
                      <svg className="w-10 h-10 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg className="w-10 h-10 text-amber-100 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </motion.button>

                  <div
                    ref={seekRef}
                    className="relative h-4 bg-amber-950/40 rounded-full cursor-pointer mb-2 touch-none"
                    onMouseDown={handleSeek}
                    onTouchStart={handleSeek}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                      animate={{
                        boxShadow: isPlaying ? `0 0 ${15 + audioLevel * 15}px rgba(218, 165, 32, 0.6)` : "none",
                      }}
                    />
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-amber-100 rounded-full border-2 border-amber-600 shadow-lg"
                      style={{ left: `calc(${(currentTime / duration) * 100 || 0}% - 12px)` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm text-amber-400/60 font-serif tracking-widest">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration) || poem.duration}</span>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="text-center py-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="font-serif text-amber-300/40 mb-2 italic">Audio preparing with devotion</p>
                  <p className="font-serif text-amber-500/30 text-xs tracking-widest uppercase">Arrival imminent</p>
                </motion.div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {sacredMode && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="mb-8"
            animate={{ scale: 1 + audioLevel * 0.1 }}
          >
            <Image src="/icons/lotus.svg" alt="Lotus" width={120} height={120} className="opacity-20" />
          </motion.div>
          <motion.p
            className="font-serif text-amber-400/20 text-sm tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Tap to exit Sacred Mode
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
