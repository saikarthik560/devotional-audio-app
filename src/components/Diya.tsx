"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface DiyaProps {
  size?: number;
  glowIntensity?: number;
  audioLevel?: number;
}

export function Diya({ size = 120, glowIntensity = 1, audioLevel = 0 }: DiyaProps) {
  const [isTouched, setIsTouched] = useState(false);
  const controls = useAnimation();
  const isMobile = useIsMobile();
  const effectiveGlow = (glowIntensity + audioLevel * 0.5) * (isTouched ? 1.5 : 1);

  useEffect(() => {
    const flicker = async () => {
      await controls.start({
        scaleY: [1, 1.1, 0.95, 1.05, 1],
        scaleX: [1, 0.95, 1.05, 0.98, 1],
        skewX: isMobile ? 0 : [0, 2, -1, 1, 0], // Simplify skew on mobile
        transition: {
          duration: isTouched ? 0.3 : 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    };
    flicker();
  }, [controls, isTouched, isMobile]);

  const handleTouch = async () => {
    setIsTouched(true);
    // Flare effect
    await controls.start({
      scale: [1, 1.5, 1],
      opacity: [0.8, 1, 0.8],
      transition: { duration: 0.3, ease: "easeOut" }
    });
    setTimeout(() => setIsTouched(false), 2000);
  };

  const glowStyle = useMemo(() => {
    if (isMobile) {
      return {
        background: `radial-gradient(circle, rgba(255, 180, 50, ${0.4 * effectiveGlow}) 0%, transparent 70%)`,
        filter: "blur(20px)",
      };
    }
    return {};
  }, [isMobile, effectiveGlow]);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ width: size, height: size, willChange: "transform" }}
      whileTap={{ scale: 0.95 }}
      onTap={handleTouch}
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Ambient Glow Layers */}
      {isMobile ? (
        <motion.div
          className="absolute inset-[-50%] rounded-full"
          style={{ ...glowStyle, opacity: 0.6, willChange: "opacity" }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              `0 0 ${40 * effectiveGlow}px ${20 * effectiveGlow}px rgba(255, 180, 50, 0.3), 
               0 0 ${80 * effectiveGlow}px ${40 * effectiveGlow}px rgba(255, 140, 0, 0.2)`,
              `0 0 ${60 * effectiveGlow}px ${30 * effectiveGlow}px rgba(255, 180, 50, 0.4), 
               0 0 ${100 * effectiveGlow}px ${50 * effectiveGlow}px rgba(255, 140, 0, 0.25)`,
              `0 0 ${40 * effectiveGlow}px ${20 * effectiveGlow}px rgba(255, 180, 50, 0.3), 
               0 0 ${80 * effectiveGlow}px ${40 * effectiveGlow}px rgba(255, 140, 0, 0.2)`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: "box-shadow" }}
        />
      )}

      {/* The Flame */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[30%] h-[50%] flex items-end justify-center pointer-events-none">
        <motion.div
          animate={controls}
          className="absolute w-full h-full bg-gradient-to-t from-orange-600 via-orange-400 to-transparent blur-[4px] rounded-full"
          style={{
            clipPath: "ellipse(50% 50% at 50% 50%)",
            opacity: 0.8,
            willChange: "transform",
          }}
        />
        
        <motion.div
          animate={controls}
          className="absolute w-[70%] h-[80%] bg-gradient-to-t from-orange-400 via-yellow-300 to-transparent blur-[2px] rounded-full"
          style={{
            clipPath: "ellipse(50% 50% at 50% 50%)",
            opacity: 0.9,
            willChange: "transform",
          }}
        />

        <motion.div
          animate={controls}
          className="absolute w-[40%] h-[60%] bg-white blur-[1px] rounded-full shadow-[0_0_10px_#fff]"
          style={{
            clipPath: "ellipse(50% 50% at 50% 50%)",
            willChange: "transform",
          }}
        />

        {!isMobile && (
          <motion.div
            animate={{
              y: [-10, -30],
              opacity: [0, 0.5, 0],
              scale: [1, 1.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute w-full h-full bg-white/10 blur-xl rounded-full"
            style={{ willChange: "transform, opacity" }}
          />
        )}
      </div>

      {/* Diya Body */}
      <div className="relative w-full h-full">
        <Image
          src="/icons/diya.svg"
          alt="Sacred Diya"
          fill
          className="object-contain"
          style={{
            filter: isMobile ? "none" : `drop-shadow(0 0 15px rgba(255, 180, 50, ${0.4 * effectiveGlow}))`,
          }}
        />
      </div>
    </motion.div>
  );
}

