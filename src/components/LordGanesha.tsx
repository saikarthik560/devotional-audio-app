"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface LordGaneshaProps {
  size?: number;
}

export function LordGanesha({ size = 400 }: LordGaneshaProps) {
  const isMobile = useIsMobile();
  const rayCount = isMobile ? 4 : 8;

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size, willChange: "transform, opacity" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Divine Aura / Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-amber-500/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform, opacity" }}
      />
      
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="https://pngimg.com/uploads/ganesha/ganesha_PNG34.png"
          alt="Lord Ganesha"
          fill
          className="object-contain"
          style={{
            filter: isMobile ? "none" : "drop-shadow(0 0 30px rgba(255,191,0,0.3))",
          }}
          priority
        />
      </div>

      {/* Additional subtle spiritual rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(rayCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/5 to-transparent origin-center"
            style={{ rotate: `${i * (360 / rayCount)}deg`, willChange: "transform, opacity" }}
            animate={{
              opacity: [0, 0.5, 0],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

