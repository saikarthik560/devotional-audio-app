"use client";

import { motion } from "framer-motion";
import { LayeredBackground } from "@/components/LayeredBackground";
import { ParticleSystem } from "@/components/ParticleSystem";
import { GlowLayer } from "@/components/GlowLayer";
import { Diya } from "@/components/Diya";
import { SacredButton } from "@/components/SacredButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a14]">
      <LayeredBackground intensity={1.2} />
      <ParticleSystem count={20} layer="background" interactive />
      <GlowLayer intensity={1} color="gold" />
      <ParticleSystem count={15} layer="foreground" interactive />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12"
        >
          <Diya size={140} glowIntensity={1.2} />
        </motion.div>

        <motion.h1
          className="font-serif text-4xl md:text-5xl text-amber-100 text-center mb-4 tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            textShadow: "0 0 40px rgba(218, 165, 32, 0.3), 0 0 80px rgba(218, 165, 32, 0.1)",
          }}
        >
          Sacred Devotions
        </motion.h1>

        <motion.p
          className="font-serif text-amber-300/60 text-center mb-12 max-w-md text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          A sacred space preserving grandfather&apos;s devotional poetry
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <SacredButton
            size="lg"
            onClick={() => router.push("/library")}
          >
            Enter Sacred Library
          </SacredButton>
        </motion.div>

        <motion.nav
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link
            href="/about"
            className="text-amber-400/40 hover:text-amber-300/60 transition-colors duration-500 text-sm font-serif tracking-wide"
          >
            About
          </Link>
        </motion.nav>
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
