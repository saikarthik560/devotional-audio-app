"use client";

import { motion, useAnimation } from "framer-motion";
import { Poem } from "@/lib/poems";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useState, useEffect } from "react";

interface SacredCardProps {
  poem: Poem;
  index: number;
}

export function SacredCard({ poem, index }: SacredCardProps) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple animation variants to avoid hydration/isMobile flip issues
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: Math.min(index * 0.1, 0.8),
        ease: "easeOut"
      }
    }
  };

  const glowControls = useAnimation();
  const rippleControls = useAnimation();

  const handleTap = async () => {
    // Divine glow effect on tap
    await Promise.all([
      glowControls.start({
        opacity: [0, 1, 0],
        scale: [0.9, 1.4],
        transition: { duration: 0.5, ease: "easeOut" }
      }),
      rippleControls.start({
        opacity: [0, 0.5, 0],
        scale: [0.8, 2],
        transition: { duration: 0.6 }
      })
    ]);
  };

  return !mounted ? (
    <div className="h-[160px] rounded-2xl bg-amber-200/20 border-2 border-amber-500/20" />
  ) : (
    <Link href={`/poem/${poem.id}`} className="block">
      <motion.div
        className="relative group cursor-pointer active:scale-[0.98] transition-all duration-300 will-change-transform"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={isMobile ? {} : { 
          y: -8, 
          scale: 1.02,
        }}
        whileTap={{ scale: 0.96 }}
        onTap={handleTap}
        style={{
          touchAction: "pan-y",
        }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-white to-amber-50 border-2 border-amber-400 shadow-xl shadow-amber-900/20 group-hover:border-amber-300 transition-colors duration-500">
          {/* Divine Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-amber-400/50 pointer-events-none blur-3xl rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={glowControls}
          />
          
          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 bg-white/60 pointer-events-none rounded-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={rippleControls}
          />
          
          {/* Shine effect - Reduced for mobile performance */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          )}

          <div className="relative p-5 md:p-6">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(218, 165, 32, 0.4)",
                      "0 0 30px rgba(218, 165, 32, 0.6)",
                      "0 0 15px rgba(218, 165, 32, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {poem.hasDeityImage ? (
                  <Image
                    src={poem.deityImageUrl}
                    alt={poem.deity}
                    fill
                    className="object-cover rounded-full border-2 border-amber-600 shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-300 to-amber-100 flex items-center justify-center border-2 border-amber-600 shadow-md">
                    <Image
                      src="/icons/om.svg"
                      alt="Om"
                      width={40}
                      height={40}
                      className="opacity-80 contrast-125"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl md:text-2xl text-amber-950 font-bold mb-1 truncate tracking-wide">
                  {poem.title}
                </h3>
                
                <p className="text-amber-900/80 text-xs md:text-sm mb-2 md:mb-3 font-serif font-bold">
                  {poem.deity} • {poem.mood}
                </p>

                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[9px] md:text-[10px] uppercase tracking-widest text-amber-900/70 font-sans font-bold">
                  <span>{poem.language}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-600/40" />
                  <span>{poem.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-600/40" />
                  <span>{poem.recorded_year}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 md:mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between">
              <span className="text-amber-950/70 text-[10px] md:text-xs font-serif italic font-medium">
                Sung by {poem.recorded_by}
              </span>
            
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-xs md:text-sm">
                {poem.hasAudio ? (
                  <>
                    <span>Begin Devotion</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </>
                ) : (
                  <span className="text-amber-600">Preparing...</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Outer Glow */}
        <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-40 -z-10 transition-opacity duration-500 bg-amber-500/30 blur-xl" />
      </motion.div>
    </Link>
  );
}
