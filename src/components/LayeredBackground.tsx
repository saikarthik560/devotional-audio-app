"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

    const handleInteraction = useCallback((clientX: number, clientY: number) => {
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
        containerRef.current.style.setProperty("--mouse-y", `${y * 100}%`);
        containerRef.current.style.setProperty("--offset-x", `${(x - 0.5) * -20 * intensity}px`);
        containerRef.current.style.setProperty("--offset-y", `${(y - 0.5) * -20 * intensity}px`);
      }
    }, [intensity]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    }, [handleInteraction]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
      if (e.touches[0]) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, [handleInteraction]);

    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    }, [handleMouseMove, handleTouchMove]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        "--offset-x": "0px",
        "--offset-y": "0px",
      } as any}
    >
      <div
        className="absolute inset-0 transition-[background] duration-300 ease-out"
        style={{
          background: `radial-gradient(ellipse at var(--mouse-x) var(--mouse-y), 
            rgba(139, 90, 43, 0.15) 0%, 
            rgba(25, 25, 40, 0.95) 50%, 
            rgba(10, 10, 20, 1) 100%)`,
        }}
      />

      {backgroundImage && (
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(var(--offset-x), var(--offset-y))`,
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-[-20px] bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: isMobile ? "none" : "blur(2px) saturate(0.8)", // Disable blur on mobile
            }}
          />
        </div>
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
          willChange: "opacity",
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

      {!isMobile && (
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
            willChange: "background-position",
          }}
        />
      )}
    </div>
  );
}

