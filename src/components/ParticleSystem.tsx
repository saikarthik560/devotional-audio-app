"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

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

export function ParticleSystem({
  count = 15,
  icons = DEFAULT_ICONS,
  audioIntensity = 0,
  interactive = true,
  layer = "foreground",
}: ParticleSystemProps) {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: count }, (_, i): Particle => ({
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

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouseX.set(clientX / window.innerWidth);
      mouseY.set(clientY / window.innerHeight);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (!interactive) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, [handleMouseMove, interactive]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: layer === "foreground" ? 30 : 5 }}
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
        />
      ))}
    </div>
  );
}

interface ParticleItemProps {
  particle: Particle;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  audioIntensity: number;
  interactive: boolean;
  layer: "foreground" | "background";
}

function ParticleItem({
  particle,
  springX,
  springY,
  audioIntensity,
  interactive,
  layer,
}: ParticleItemProps) {
  const influence = layer === "foreground" ? 100 : 50;

  const tx = useTransform(springX, [0, 1], [influence, -influence]);
  const ty = useTransform(springY, [0, 1], [influence, -influence]);

  const scaleBase = 1 + audioIntensity * 0.3;
  const glowIntensity = audioIntensity * 0.5;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${particle.initialX}%`,
        x: interactive ? tx : 0,
        y: interactive ? ty : 0,
        width: particle.size,
        height: particle.size,
      }}
      initial={{ opacity: 0, top: "-10vh" }}
      animate={{
        opacity: [0, particle.opacity, particle.opacity, 0],
        top: ["-10vh", "110vh"],
        rotate: [0, 360],
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
    >
      <div
        className="relative w-full h-full"
        style={{
          filter: `drop-shadow(0 0 ${4 + glowIntensity * 8}px rgba(255, 200, 100, ${0.3 + glowIntensity}))`,
        }}
      >
        <Image src={particle.icon} alt="" fill className="object-contain" style={{ opacity: 0.8 }} />
      </div>
    </motion.div>
  );
}
