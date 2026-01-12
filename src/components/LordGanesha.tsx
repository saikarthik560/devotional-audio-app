"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useState, useCallback, useRef, useEffect, memo } from "react";

interface LordGaneshaProps {
  size?: number;
}

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  opacity: number;
}

const Particle = memo(({ p }: { p: TrailParticle }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: p.size,
      height: p.size,
      left: "50%",
      top: "50%",
      marginLeft: -p.size / 2,
      marginTop: -p.size / 2,
      background: "radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(251,191,36,0.6) 50%, transparent 100%)",
      boxShadow: "0 0 10px rgba(251,191,36,0.8), 0 0 20px rgba(251,191,36,0.4)",
      willChange: "transform, opacity",
    }}
    initial={{ x: p.x, y: p.y, opacity: p.opacity, scale: 1 }}
    animate={{ opacity: 0, scale: 0.1 }}
    transition={{ duration: p.duration, ease: "easeOut" }}
  />
));

Particle.displayName = "Particle";

export function LordGanesha({ size = 400 }: LordGaneshaProps) {
  const isMobile = useIsMobile();
  const rayCount = isMobile ? 4 : 8;
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOm, setShowOm] = useState(false);
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  
  // Motion values for smooth animation without re-renders
  const orbitAngle = useMotionValue(-90);
  const omOpacity = useMotionValue(0);
  const omScale = useMotionValue(0);
  
  const orbitRadius = isMobile ? size * 0.42 : size * 0.48;
  const omSize = isMobile ? 36 : 52;
  
    // Speed increased by 25% from previous values (0.60 -> 0.75, 0.73 -> 0.91)
    const orbitSpeed = isMobile ? 0.75 : 0.91;
    const totalRotations = 3;
  
    const animationRef = useRef<number>(0);
    const frameRef = useRef<number>(0);
    const lastTrailSpawnRef = useRef<number>(0);
  
    // Transform for Om rotation (set to 0 for stiff rotation)
    const omRotation = 0;
  const omX = useTransform(orbitAngle, (angle) => Math.cos(angle * Math.PI / 180) * orbitRadius);
  const omY = useTransform(orbitAngle, (angle) => Math.sin(angle * Math.PI / 180) * orbitRadius);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleTap = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowOm(true);
    orbitAngle.set(-90);
    omOpacity.set(0);
    omScale.set(0);
    setTrailParticles([]);
    animationRef.current++;
    const currentAnimation = animationRef.current;
    lastTrailSpawnRef.current = 0;

    let angle = -90;
    const targetAngle = -90 + 360 * totalRotations;
    let phase: "appear" | "orbit" | "vanish" = "appear";
    let phaseProgress = 0;
    const appearDuration = 60;
    const vanishDuration = 45;
    
    const animate = (time: number) => {
      if (currentAnimation !== animationRef.current) return;

      if (phase === "appear") {
        phaseProgress++;
        const progress = Math.min(phaseProgress / appearDuration, 1);
        omOpacity.set(progress);
        omScale.set(progress);
        if (progress >= 1) {
          phase = "orbit";
          phaseProgress = 0;
        }
      } else if (phase === "orbit") {
        angle += orbitSpeed;
        orbitAngle.set(angle);

        const currentX = Math.cos(angle * Math.PI / 180) * orbitRadius;
        const currentY = Math.sin(angle * Math.PI / 180) * orbitRadius;

        if (time - lastTrailSpawnRef.current > (isMobile ? 16 : 10)) {
          lastTrailSpawnRef.current = time;
          setTrailParticles(prev => {
            const maxParticles = isMobile ? 120 : 200;
            const newParticle = {
              id: performance.now() + Math.random(),
              x: currentX + (Math.random() - 0.5) * 15,
              y: currentY + (Math.random() - 0.5) * 15,
              size: (isMobile ? 2 : 4) + Math.random() * 6,
              duration: 1.2 + Math.random() * 1.2, // Slightly shorter duration for snappier feel
              opacity: 0.4 + Math.random() * 0.6,
            };
            return [...prev.slice(-(maxParticles - 1)), newParticle];
          });
        }
        
        if (angle >= targetAngle) {
          phase = "vanish";
          phaseProgress = 0;
        }
      } else if (phase === "vanish") {
        phaseProgress++;
        const progress = Math.min(phaseProgress / vanishDuration, 1);
        omOpacity.set(1 - progress);
        omScale.set(1 - progress);
        if (progress >= 1) {
          setShowOm(false);
          setTrailParticles([]);
          setIsAnimating(false);
          return;
        }
      }
      
      if (phase !== "vanish" || phaseProgress < vanishDuration) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
  }, [isAnimating, isMobile, orbitRadius, orbitSpeed, totalRotations, orbitAngle, omOpacity, omScale]);

  return (
    <motion.div
      className="relative flex items-center justify-center cursor-pointer touch-manipulation select-none"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      onTap={handleTap}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-amber-500/10 blur-[80px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence>
        {showOm && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 200 }}>
            {trailParticles.map((p) => (
              <Particle key={p.id} p={p} />
            ))}

            <motion.div
              style={{ 
                position: "absolute",
                width: omSize, 
                height: omSize,
                left: "50%",
                top: "50%",
                marginLeft: -omSize / 2,
                marginTop: -omSize / 2,
                x: omX,
                y: omY,
                rotate: 0,
                opacity: omOpacity,
                scale: omScale,
                zIndex: 201,
                filter: "drop-shadow(0 0 20px rgba(251,191,36,1)) drop-shadow(0 0 40px rgba(251,191,36,0.8))",
                willChange: "transform, opacity",
              }}
            >
              <motion.div 
                style={{ 
                  width: "100%", 
                  height: "100%",
                  rotate: 0,
                }}
              >
                <Image 
                  src="/icons/om.svg" 
                  alt="Om" 
                  width={omSize} 
                  height={omSize} 
                  priority 
                />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="https://pngimg.com/uploads/ganesha/ganesha_PNG34.png"
          alt="Lord Ganesha"
          fill
          className="object-contain"
          style={{ filter: isMobile ? "none" : "drop-shadow(0 0 30px rgba(255,191,0,0.3))" }}
          priority
        />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(rayCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/5 to-transparent origin-center"
            style={{ rotate: `${i * (360 / rayCount)}deg` }}
            animate={{ opacity: [0, 0.5, 0], scaleX: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
