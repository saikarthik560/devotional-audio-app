"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useState } from "react";

interface LordGaneshaProps {
  size?: number;
}

export function LordGanesha({ size = 400 }: LordGaneshaProps) {
  const isMobile = useIsMobile();
  const rayCount = isMobile ? 4 : 8;
  const blessingControls = useAnimation();
  const [isBlessing, setIsBlessing] = useState(false);

  const handleTap = async () => {
    if (isBlessing) return;
    setIsBlessing(true);
    
    // Trigger blessing ripple
    await blessingControls.start({
      scale: [1, 2],
      opacity: [0, 0.5, 0],
      transition: { duration: 1, ease: "easeOut" }
    });
    
    setIsBlessing(false);
  };

  return (
    <motion.div
      className="relative flex items-center justify-center cursor-pointer touch-manipulation"
      style={{ width: size, height: size, willChange: "transform, opacity" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
      onTap={handleTap}
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

      {/* Blessing Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-amber-400/30 blur-sm pointer-events-none"
        animate={blessingControls}
        initial={{ scale: 1, opacity: 0 }}
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

