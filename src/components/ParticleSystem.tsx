"use client";

import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";
import { useEffect, useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface Particle {
  id: number;
  icon: string;
  initialX: number;
  initialY: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface ParticleSystemProps {
  count?: number;
  icons?: string[];
  audioIntensity?: number;
  interactive?: boolean;
  layer?: "foreground" | "background";
}

const DEFAULT_ICONS = ["/icons/lotus.svg", "/icons/om.svg", "/icons/star.svg", "/icons/bell.svg"];

interface ParticleItemProps {
  particle: Particle;
  springX: any;
  springY: any;
  audioIntensity: number;
  interactive: boolean;
  layer: "foreground" | "background";
  isMobile: boolean;
}

const ParticleItem = memo(({
  particle,
  springX,
  springY,
  audioIntensity,
  interactive,
  layer,
  isMobile,
}: ParticleItemProps) => {
    const influence = layer === "foreground" ? 100 : 50;
    const controls = useAnimation();
    
    const tx = useTransform(springX, [0, 1], [influence, -influence]);
    const ty = useTransform(springY, [0, 1], [influence, -influence]);

    const scaleBase = 1 + audioIntensity * 0.3;
    const glowIntensity = audioIntensity * 0.5;

    const handleInteraction = useCallback(async () => {
      if (!interactive) return;
      await controls.start({
        scale: scaleBase * 1.5,
        opacity: 1,
        filter: "brightness(2) blur(2px)",
        transition: { duration: 0.3, ease: "easeOut" }
      });
      await controls.start({
        scale: scaleBase,
        opacity: particle.opacity,
        filter: "brightness(1) blur(0px)",
        transition: { duration: 0.8, ease: "easeInOut" }
      });
    }, [controls, interactive, scaleBase, particle.opacity]);

    return (
      <motion.div
        className="absolute cursor-pointer pointer-events-auto"
        style={{
          left: `${particle.initialX}%`,
          x: interactive ? tx : 0,
          y: interactive ? ty : 0,
          width: particle.size,
          height: particle.size,
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, top: "-10vh" }}
        animate={{
          opacity: [0, particle.opacity, particle.opacity, 0],
          top: ["-10vh", "110vh"],
          rotate: isMobile ? 0 : [0, 360],
          scale: [scaleBase, scaleBase * 1.1, scaleBase],
        }}
        transition={{
          top: {
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: -particle.delay,
          },
          opacity: {
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: -particle.delay,
          },
          rotate: {
            duration: particle.duration * 1.5,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        onTap={handleInteraction}
        whileHover={isMobile ? {} : { scale: scaleBase * 1.2, opacity: 1 }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={controls}
          style={{
            filter: isMobile ? "none" : `drop-shadow(0 0 ${4 + glowIntensity * 8}px rgba(255, 200, 100, ${0.3 + glowIntensity}))`,
            willChange: "transform, opacity, filter",
          }}
        >
          <Image
            src={particle.icon}
            alt=""
            fill
            className="object-contain"
            style={{ opacity: 0.8 }}
          />
        </motion.div>
      </motion.div>
    );
});

ParticleItem.displayName = "ParticleItem";

export function ParticleSystem({
  count: propCount,
  icons = DEFAULT_ICONS,
  audioIntensity = 0,
  interactive = true,
  layer = "foreground",
}: ParticleSystemProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  
  const count = useMemo(() => {
    const baseCount = propCount || (layer === "foreground" ? 15 : 20);
    return isMobile ? Math.floor(baseCount * 0.4) : baseCount;
  }, [propCount, isMobile, layer]);

  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      size: layer === "foreground" ? 20 + Math.random() * 20 : 10 + Math.random() * 15,
      delay: Math.random() * 30,
      duration: layer === "foreground" ? 20 + Math.random() * 15 : 30 + Math.random() * 20,
      opacity: layer === "foreground" ? 0.3 + Math.random() * 0.4 : 0.1 + Math.random() * 0.2,
    }));
    setParticles(newParticles);
  }, [count, icons, layer]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (isMobile) return;
    const clientX = "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = "touches" in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
    mouseX.set(clientX / window.innerWidth);
    mouseY.set(clientY / window.innerHeight);
  }, [mouseX, mouseY, isMobile]);

  useEffect(() => {
    if (!interactive || isMobile) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, interactive, isMobile]);

  return !mounted ? null : (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: layer === "foreground" ? 70 : 5 }}
    >
      {particles.map((particle) => (
        <ParticleItem
          key={particle.id}
          particle={particle}
          springX={springX}
          springY={springY}
          audioIntensity={audioIntensity}
          interactive={interactive}
          layer={layer}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
