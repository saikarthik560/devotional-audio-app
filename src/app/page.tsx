"use client";

import { motion } from "framer-motion";
import { LayeredBackground } from "@/components/LayeredBackground";
import { ParticleSystem } from "@/components/ParticleSystem";
import { GlowLayer } from "@/components/GlowLayer";
import { LordGanesha } from "@/components/LordGanesha";
import { Diya } from "@/components/Diya";
import { SacredButton } from "@/components/SacredButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Info } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a14]">
      <LayeredBackground intensity={1.2} />
      <ParticleSystem count={20} layer="background" interactive />
      <GlowLayer intensity={1} color="gold" />
      <ParticleSystem count={15} layer="foreground" interactive />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="relative flex flex-col items-center mb-12">
          {/* Lord Ganesha */}
          <LordGanesha size={320} />
          
          {/* Diya at his feet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute -bottom-28 z-30"
          >
            <Diya size={120} glowIntensity={1.5} />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1
            className="font-serif text-4xl md:text-6xl text-amber-100 mb-4 tracking-wider"
            style={{
              textShadow: "0 0 40px rgba(218, 165, 32, 0.3), 0 0 80px rgba(218, 165, 32, 0.1)",
            }}
          >
            Sacred Devotions
          </h1>

          <p className="font-serif text-amber-300/60 mb-12 max-w-md mx-auto text-lg leading-relaxed">
            A sacred space preserving grandfather&apos;s devotional poetry
          </p>

          <SacredButton
            size="lg"
            onClick={() => router.push("/library")}
          >
            Enter Sacred Library
          </SacredButton>
        </motion.div>

        <motion.div
          className="fixed top-8 right-8 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link
            href="/about"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-400/40 hover:text-amber-300/80 hover:border-amber-300/40 hover:bg-amber-400/10 transition-all duration-500"
            aria-label="About"
          >
            <Info size={20} />
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10, 10, 20, 0.8) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
