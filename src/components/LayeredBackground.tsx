"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface LayeredBackgroundProps {
  backgroundImage?: string;
  intensity?: number;
  showVignette?: boolean;
}

export function LayeredBackground({
  backgroundImage,
  intensity = 1,
  showVignette = true,
}: LayeredBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(139, 90, 43, 0.15) 0%, 
            rgba(25, 25, 40, 0.95) 50%, 
            rgba(10, 10, 20, 1) 100%)`,
        }}
      />

      {backgroundImage && (
        <motion.div
          className="absolute inset-0"
          animate={{
            x: (mousePosition.x - 0.5) * -20 * intensity,
            y: (mousePosition.y - 0.5) * -20 * intensity,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        >
          <div
            className="absolute inset-[-20px] bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: "blur(2px) saturate(0.8)",
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(ellipse at 50% 30%, 
            rgba(255, 200, 100, ${0.08 * intensity}) 0%, 
            transparent 60%)`,
        }}
      />

      {showVignette && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, 
              transparent 20%, 
              rgba(0, 0, 0, 0.4) 70%, 
              rgba(0, 0, 0, 0.8) 100%)`,
          }}
        />
      )}

      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(218, 165, 32, 0.03) 0%, transparent 40%),
                           radial-gradient(circle at 80% 20%, rgba(70, 130, 180, 0.03) 0%, transparent 40%)`,
          backgroundSize: "200% 200%",
        }}
      />
    </div>
  );
}
