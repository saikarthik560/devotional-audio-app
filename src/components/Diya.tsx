"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DiyaProps {
  size?: number;
  glowIntensity?: number;
  audioLevel?: number;
}

export function Diya({ size = 120, glowIntensity = 1, audioLevel = 0 }: DiyaProps) {
  const effectiveGlow = glowIntensity + audioLevel * 0.5;

  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.02, 1],
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
            `0 0 ${40 * effectiveGlow}px ${20 * effectiveGlow}px rgba(255, 180, 50, 0.3), 
             0 0 ${80 * effectiveGlow}px ${40 * effectiveGlow}px rgba(255, 140, 0, 0.2), 
             0 0 ${120 * effectiveGlow}px ${60 * effectiveGlow}px rgba(255, 100, 0, 0.1)`,
            `0 0 ${50 * effectiveGlow}px ${25 * effectiveGlow}px rgba(255, 180, 50, 0.4), 
             0 0 ${100 * effectiveGlow}px ${50 * effectiveGlow}px rgba(255, 140, 0, 0.25), 
             0 0 ${150 * effectiveGlow}px ${75 * effectiveGlow}px rgba(255, 100, 0, 0.15)`,
            `0 0 ${40 * effectiveGlow}px ${20 * effectiveGlow}px rgba(255, 180, 50, 0.3), 
             0 0 ${80 * effectiveGlow}px ${40 * effectiveGlow}px rgba(255, 140, 0, 0.2), 
             0 0 ${120 * effectiveGlow}px ${60 * effectiveGlow}px rgba(255, 100, 0, 0.1)`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-8 rounded-full"
        style={{
          background: "linear-gradient(to top, #FF8C00, #FFD700, #FFFFE0)",
          filter: `blur(2px) brightness(${1.2 + audioLevel * 0.3})`,
        }}
        animate={{
          scaleY: [1, 1.2, 0.9, 1.1, 1],
          scaleX: [1, 0.9, 1.1, 0.95, 1],
          y: [0, -2, 1, -1, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full"
        style={{
          background: "linear-gradient(to top, #FFD700, #FFFFFF)",
          filter: "blur(1px)",
        }}
        animate={{
          opacity: [0.6, 1, 0.7, 0.9, 0.6],
          y: [0, -3, 1, -2, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative w-full h-full">
        <Image
          src="/icons/diya.svg"
          alt="Sacred Diya"
          fill
          className="object-contain"
          style={{
            filter: `drop-shadow(0 0 10px rgba(255, 180, 50, ${0.5 * effectiveGlow}))`,
          }}
        />
      </div>
    </motion.div>
  );
}
