"use client";

import { motion } from "framer-motion";
import { Poem } from "@/lib/poems";
import Image from "next/image";
import Link from "next/link";

interface SacredCardProps {
  poem: Poem;
  index: number;
}

export function SacredCard({ poem, index }: SacredCardProps) {
  return (
    <Link href={`/poem/${poem.id}`} className="touch-none">
      <motion.div
        className="relative group cursor-pointer active:scale-95 transition-transform duration-300"
        initial={{ opacity: 0, y: 30, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          rotateX: -5,
          rotateY: 5,
        }}
        whileTap={{ scale: 0.94, rotateX: 0, rotateY: 0 }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-amber-50 to-white border-2 border-amber-400/60 shadow-xl shadow-black/20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
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

          <motion.div
            className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.4) 0%, transparent 60%)",
            }}
          />

          <div className="relative p-6">
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 flex-shrink-0">
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
                    className="object-cover rounded-full border-2 border-amber-600/40"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center border-2 border-amber-600/40">
                    <Image
                      src="/icons/om.svg"
                      alt="Om"
                      width={48}
                      height={48}
                      className="opacity-90 grayscale contrast-125"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <motion.h3
                  className="font-serif text-2xl text-amber-950 mb-1 truncate tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {poem.title}
                </motion.h3>
                
                  <p className="text-amber-900/80 text-sm mb-3 font-serif font-medium">
                    {poem.deity} • {poem.mood}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-amber-800/70 font-sans font-bold">
                    <span>{poem.language}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600/40" />
                    <span>{poem.duration}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600/40" />
                    <span>{poem.recorded_year}</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <span className="text-amber-900/60 text-xs font-serif italic font-semibold">
                  Sung by {poem.recorded_by}
                </span>
              
              <motion.div
                className="flex items-center gap-2 text-amber-700 font-serif font-bold"
                whileHover={{ x: 3 }}
              >
                {poem.hasAudio ? (
                  <>
                    <span>Begin Devotion</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </>
                ) : (
                  <span className="text-amber-600/40 font-bold">Preparing...</span>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(218, 165, 32, 0.2) 0%, transparent 50%, rgba(70, 130, 180, 0.15) 100%)",
            filter: "blur(15px)",
          }}
        />
      </motion.div>
    </Link>
  );
}
