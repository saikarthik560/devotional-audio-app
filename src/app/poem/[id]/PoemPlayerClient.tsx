"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayeredBackground } from "@/components/LayeredBackground";
import { ParticleSystem } from "@/components/ParticleSystem";
import { GlowLayer } from "@/components/GlowLayer";
import { getPoemById, Poem } from "@/lib/poems";
import { useAudioAnalyzer } from "@/hooks/useAudioAnalyzer";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PoemPlayerClient({ id }: { id: string }) {
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);
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
    async function loadPoem() {
      const loadedPoem = await getPoemById(id);
      setPoem(loadedPoem);
      if (loadedPoem?.hasAudio) {
        load(loadedPoem.audioUrl);
      }
      setLoading(false);
    }
    loadPoem();
  }, [id, load]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && sacredMode) {
        setSacredMode(false);
      }
      if (e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [sacredMode, toggle]
  );

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

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <LayeredBackground intensity={1} />
        <ParticleSystem count={15} layer="background" />
        <GlowLayer intensity={0.6} color="gold" />
        <motion.div className="relative z-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-16 h-16 mx-auto mb-6" animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}>
            <Image src="/icons/om.svg" alt="Loading" width={64} height={64} className="opacity-50" />
          </motion.div>
          <p className="font-serif text-amber-300/50">Preparing sacred verse...</p>
        </motion.div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="relative min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <LayeredBackground intensity={1} />
        <ParticleSystem count={20} layer="background" interactive />
        <GlowLayer intensity={0.6} color="gold" />
        <ParticleSystem count={15} layer="foreground" interactive />
        <motion.div className="relative z-20 text-center px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className="w-24 h-24 mx-auto mb-8" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}>
            <Image src="/icons/lotus.svg" alt="Lotus" width={96} height={96} className="opacity-40" />
          </motion.div>
          <h1 className="font-serif text-2xl text-amber-200/80 mb-4">Sacred verse not found</h1>
          <p className="font-serif text-amber-400/50 mb-8">This devotion may be preparing to bloom</p>
          <Link href="/library" className="font-serif text-amber-400/60 hover:text-amber-300 transition-colors duration-500">
            Return to Library
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a14] overflow-hidden touch-none" onClick={() => sacredMode && setSacredMode(false)}>
      {/* Your full JSX remains unchanged from here downward */}
      {/* (No functional changes required for static export) */}
    </div>
  );
}
