"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayeredBackground } from "@/components/LayeredBackground";
import { ParticleSystem } from "@/components/ParticleSystem";
import { GlowLayer } from "@/components/GlowLayer";
import { SacredCard } from "@/components/SacredCard";
import { getAllPoems, getUniqueDeities, getUniqueMoods, Poem } from "@/lib/poems";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LibraryPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeity, setSelectedDeity] = useState<string>("all");
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [deities, setDeities] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);

  useEffect(() => {
    async function loadPoems() {
      const loadedPoems = await getAllPoems();
      setPoems(loadedPoems);
      setFilteredPoems(loadedPoems);
      setDeities(getUniqueDeities(loadedPoems));
      setMoods(getUniqueMoods(loadedPoems));
      setLoading(false);
    }
    loadPoems();
  }, []);

  useEffect(() => {
    let filtered = poems;
    if (selectedDeity !== "all") {
      filtered = filtered.filter((p) => p.deity === selectedDeity);
    }
    if (selectedMood !== "all") {
      filtered = filtered.filter((p) => p.mood === selectedMood);
    }
    setFilteredPoems(filtered);
  }, [selectedDeity, selectedMood, poems]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a14]">
      <LayeredBackground intensity={1} />
      <ParticleSystem count={15} layer="background" interactive />
      <GlowLayer intensity={0.8} color="gold" />
      <ParticleSystem count={10} layer="foreground" interactive />

        <div className="relative z-[60] min-h-screen px-4 py-8 md:px-8">
          <motion.header
            className="max-w-5xl mx-auto mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-amber-400/60 hover:text-amber-300 transition-colors duration-500"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-serif text-sm">Return Home</span>
            </Link>
            
            <Link
              href="/about"
              className="text-amber-400/40 hover:text-amber-300/60 transition-colors duration-500 text-sm font-serif"
            >
              About
            </Link>
          </div>

          <motion.h1
            className="font-serif text-3xl md:text-4xl text-amber-100 text-center mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textShadow: "0 0 30px rgba(218, 165, 32, 0.2)",
            }}
          >
            Sacred Library
          </motion.h1>
          
            <motion.p
              className="font-serif text-amber-100/90 text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Devotional poetry sung with love
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-3 md:gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-200/60 text-[10px] md:text-xs font-serif font-medium uppercase tracking-wider">Deity</span>
                <select
                  value={selectedDeity}
                  onChange={(e) => setSelectedDeity(e.target.value)}
                  className="bg-amber-950/40 border border-amber-500/20 rounded-lg px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm text-amber-50 focus:outline-none focus:border-amber-400/60 font-serif transition-colors"
                >
                  <option value="all">All</option>
                  {deities.map((deity) => (
                    <option key={deity} value={deity}>{deity}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-amber-200/60 text-[10px] md:text-xs font-serif font-medium uppercase tracking-wider">Mood</span>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="bg-amber-950/40 border border-amber-500/20 rounded-lg px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm text-amber-50 focus:outline-none focus:border-amber-400/60 font-serif transition-colors"
                >
                  <option value="all">All</option>
                  {moods.map((mood) => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
            </motion.div>

        </motion.header>

        <main className="max-w-5xl mx-auto pb-16">
          {loading ? (
            <motion.div
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-16 h-16 mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Image
                  src="/icons/om.svg"
                  alt="Loading"
                  width={64}
                  height={64}
                  className="opacity-40"
                />
              </motion.div>
              <p className="font-serif text-amber-300/40">Gathering sacred verses...</p>
            </motion.div>
          ) : filteredPoems.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="w-20 h-20 mb-6"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/icons/lotus.svg"
                  alt="Lotus"
                  width={80}
                  height={80}
                  className="opacity-40"
                />
              </motion.div>
              <p className="font-serif text-xl text-amber-200/60 mb-2">
                New devotions coming soon
              </p>
              <p className="font-serif text-amber-400/40 text-sm">
                The sacred verses are being prepared with love
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-6 md:grid-cols-2"
            >
              <AnimatePresence>
                {filteredPoems.map((poem, index) => (
                  <SacredCard key={poem.id} poem={poem} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10, 10, 20, 0.9) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
