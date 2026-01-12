"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useState, useCallback, useRef, useEffect } from "react";

interface LordGaneshaProps {
  size?: number;
}

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export function LordGanesha({ size = 400 }: LordGaneshaProps) {
  const isMobile = useIsMobile();
  const rayCount = isMobile ? 4 : 8;
  const blessingControls = useAnimation();
  const omControls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOm, setShowOm] = useState(false);
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const animationRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const lastTrailSpawnRef = useRef<number>(0);

  const orbitRadius = isMobile ? size * 0.42 : size * 0.48;
  const omSize = isMobile ? 36 : 52;
  
  const appearDuration = 3.0;
  const orbitSpeed = isMobile ? 0.0025 : 0.003;
  const totalRotations = 3;
  const vanishDuration = 4.0;

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleTap = useCallback(async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowOm(true);
    setOrbitAngle(-90);
    setTrailParticles([]);
    animationRef.current++;
    const currentAnimation = animationRef.current;
    lastTrailSpawnRef.current = 0;

    blessingControls.start({
      scale: [1, 1.4],
      opacity: [0, 0.4, 0],
      transition: { duration: 2.5, ease: "easeOut" }
    });

    await omControls.start({
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: appearDuration, ease: "easeInOut" }
    });

    if (currentAnimation !== animationRef.current) return;

    let angle = -90;
    const targetAngle = -90 + 360 * totalRotations;
    
    const animate = (time: number) => {
      if (currentAnimation !== animationRef.current) return;
      
      angle += orbitSpeed * 60;
      setOrbitAngle(angle);

      const currentX = Math.cos(angle * Math.PI / 180) * orbitRadius;
      const currentY = Math.sin(angle * Math.PI / 180) * orbitRadius;

      // Spawn trail particle every 150ms
      if (time - lastTrailSpawnRef.current > 150) {
        lastTrailSpawnRef.current = time;
        setTrailParticles(prev => {
          const newParticle = {
            id: time,
            x: currentX,
            y: currentY,
            size: (isMobile ? 3 : 5) + Math.random() * 4,
            duration: 4.0 + Math.random() * 2.0,
          };
          return [...prev.slice(-30), newParticle];
        });
      }
      
      if (angle < targetAngle) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Return to center and vanish slowly
        omControls.start({
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          transition: { duration: vanishDuration, ease: "easeInOut" }
        }).then(() => {
          if (currentAnimation === animationRef.current) {
            setShowOm(false);
            setTrailParticles([]);
            setIsAnimating(false);
          }
        });
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
  }, [isAnimating, blessingControls, omControls, isMobile, orbitRadius, orbitSpeed]);

  const omX = Math.cos((orbitAngle) * Math.PI / 180) * orbitRadius;
  const omY = Math.sin((orbitAngle) * Math.PI / 180) * orbitRadius;

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

      <motion.div
        className="absolute inset-0 rounded-full border-2 border-amber-400/30 blur-sm pointer-events-none"
        animate={blessingControls}
        initial={{ scale: 1, opacity: 0 }}
      />

      <AnimatePresence>
        {showOm && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            {/* Trail Particles */}
            {trailParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-amber-400"
                style={{
                  width: p.size,
                  height: p.size,
                  x: p.x,
                  y: p.y,
                  background: "radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(251,191,36,0.6) 50%, transparent 100%)",
                  boxShadow: "0 0 10px rgba(251,191,36,0.8), 0 0 20px rgba(251,191,36,0.4)",
                  filter: "blur(0.5px)",
                }}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 0.2 }}
                transition={{ duration: p.duration, ease: "easeOut" }}
              />
            ))}

            {/* Main Om Icon */}
            <motion.div
              style={{ 
                width: omSize, 
                height: omSize,
                x: isAnimating ? omX : 0,
                y: isAnimating ? omY : 0,
              }}
              initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              animate={omControls}
            >
              <motion.div 
                className="relative"
                style={{ 
                  filter: "drop-shadow(0 0 16px rgba(251,191,36,1)) drop-shadow(0 0 32px rgba(251,191,36,0.7))",
                }}
                animate={{ rotate: orbitAngle + 90 }}
                transition={{ duration: 0 }}
              >
                <Image src="/icons/om.svg" alt="Om" width={omSize} height={omSize} priority />
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
