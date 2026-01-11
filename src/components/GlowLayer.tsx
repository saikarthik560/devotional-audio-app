"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface GlowLayerProps {
  intensity?: number;
  audioReactive?: boolean;
  audioLevel?: number;
  color?: "gold" | "saffron" | "blue";
}

const colorMap = {
  gold: { r: 255, g: 200, b: 100 },
  saffron: { r: 255, g: 140, b: 0 },
  blue: { r: 70, g: 130, b: 180 },
};

export function GlowLayer({
  intensity = 1,
  audioReactive = false,
  audioLevel = 0,
  color = "gold",
}: GlowLayerProps) {
  const isMobile = useIsMobile();
  const { r, g, b } = colorMap[color];
  const effectiveIntensity = audioReactive ? intensity + audioLevel * 0.5 : intensity;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [
            0.03 * effectiveIntensity,
            0.06 * effectiveIntensity,
            0.03 * effectiveIntensity,
          ],
        }}
        transition={{
          duration: audioReactive ? 0.5 + (1 - audioLevel) * 3 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(ellipse at 50% 40%, 
            rgba(${r}, ${g}, ${b}, 0.15) 0%, 
            transparent 50%)`,
          willChange: "opacity",
        }}
      />

      {!isMobile && (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(circle at 30% 70%, 
                rgba(${r}, ${g}, ${b}, 0.1) 0%, 
                transparent 40%)`,
              willChange: "transform, opacity",
            }}
          />

          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1.05, 1, 1.05],
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{
              background: `radial-gradient(circle at 70% 30%, 
                rgba(70, 130, 180, 0.08) 0%, 
                transparent 40%)`,
              willChange: "transform, opacity",
            }}
          />
        </>
      )}

      {audioReactive && audioLevel > 0.1 && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: audioLevel * 0.15,
            scale: 1 + audioLevel * 0.1,
          }}
          transition={{ duration: 0.1 }}
          style={{
            background: `radial-gradient(ellipse at 50% 50%, 
              rgba(${r}, ${g}, ${b}, 0.2) 0%, 
              transparent 60%)`,
            willChange: "transform, opacity",
          }}
        />
      )}
    </div>
  );
}

