"use client";

import { motion } from "framer-motion";
import { LayeredBackground } from "@/components/LayeredBackground";
import { ParticleSystem } from "@/components/ParticleSystem";
import { GlowLayer } from "@/components/GlowLayer";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a14]">
      <LayeredBackground intensity={1} />
      <ParticleSystem count={15} layer="background" interactive />
      <GlowLayer intensity={0.8} color="gold" />
      <ParticleSystem count={10} layer="foreground" interactive />

      <div className="relative z-20 min-h-screen px-4 py-8 md:px-8">
        <motion.header
          className="max-w-3xl mx-auto mb-12"
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
              href="/library"
              className="text-amber-400/40 hover:text-amber-300/60 transition-colors duration-500 text-sm font-serif"
            >
              Library
            </Link>
          </div>
        </motion.header>

        <main className="max-w-3xl mx-auto pb-16">
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative w-24 h-24"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 30px 15px rgba(218, 165, 32, 0.2)",
                    "0 0 40px 20px rgba(218, 165, 32, 0.3)",
                    "0 0 30px 15px rgba(218, 165, 32, 0.2)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Image
                src="/icons/om.svg"
                alt="Om"
                fill
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(218, 165, 32, 0.4))",
                }}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            className="font-serif text-3xl md:text-4xl text-amber-100 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textShadow: "0 0 30px rgba(218, 165, 32, 0.2)",
            }}
          >
            About This Sacred Space
          </motion.h1>

          <motion.div
            className="space-y-8 text-amber-200/70 font-serif leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900/40 to-slate-950/50 border border-amber-800/15">
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-50"
                animate={{
                  boxShadow: [
                    "inset 0 0 20px rgba(218, 165, 32, 0.05)",
                    "inset 0 0 30px rgba(218, 165, 32, 0.08)",
                    "inset 0 0 20px rgba(218, 165, 32, 0.05)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <p className="relative text-lg">
                This digital temple was created with deep reverence to preserve and share the 
                devotional poetry sung by our beloved grandfather. Each verse carries decades 
                of spiritual practice, faith, and love.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900/40 to-slate-950/50 border border-amber-800/15">
              <h2 className="text-xl text-amber-100 mb-4">A Living Archive</h2>
              <p className="mb-4">
                The recordings here represent a lifetime of devotion. These are not 
                performances but prayers — intimate moments of connection with the divine, 
                shared with family and now preserved for generations to come.
              </p>
              <p>
                Every bhajan, stotram, and kavacham was sung with the same love and devotion 
                that grandfather brought to his daily puja. This space honors that tradition.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900/40 to-slate-950/50 border border-amber-800/15">
              <h2 className="text-xl text-amber-100 mb-4">How to Experience</h2>
              <ul className="space-y-3 list-none">
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-amber-500/60 mt-1">●</span>
                  <span>Visit the Sacred Library to browse all available devotional recordings</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-amber-500/60 mt-1">●</span>
                  <span>Filter by deity or mood to find the right verse for your contemplation</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-amber-500/60 mt-1">●</span>
                  <span>Enter Sacred Mode for an immersive, distraction-free listening experience</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <span className="text-amber-500/60 mt-1">●</span>
                  <span>Allow the gentle animations to guide your mind into peaceful contemplation</span>
                </motion.li>
              </ul>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900/40 to-slate-950/50 border border-amber-800/15">
              <h2 className="text-xl text-amber-100 mb-4">Adding New Devotions</h2>
              <p className="mb-4">
                This sacred space grows organically. To add new recordings, simply place them 
                in the poems folder following the established structure. Each poem folder 
                contains the audio recording, deity image, background, and a meta.json file 
                with the details.
              </p>
              <p className="text-amber-400/50 text-sm">
                The application automatically discovers and displays new content — no code 
                changes required. This ensures the archive can grow naturally over time.
              </p>
            </div>

            <motion.div
              className="text-center pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-amber-400/40 text-sm italic">
                &quot;In devotion, we find peace. In preservation, we honor those who came before.&quot;
              </p>
            </motion.div>
          </motion.div>
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
