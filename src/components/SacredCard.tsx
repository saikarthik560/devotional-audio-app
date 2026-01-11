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
    <Link href={`/poem/${poem.id}`}>
      <motion.div
        className="relative group cursor-pointer active:scale-95 transition-transform duration-300 will-change-transform"
        initial={{ opacity: 0, y: 30, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: "easeOut",
        }}
        whileHover={{ 
          y: -10, 
          scale: 1.03,
          rotateX: -2,
          rotateY: 2,
        }}
        whileTap={{ scale: 0.96 }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-300 via-amber-200 to-amber-100 border-2 border-amber-500 shadow-2xl shadow-black/60">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            animate={{
              x: ["-200%", "200%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.5) 0%, transparent 70%)",
            }}
          />

          <div className="relative p-6">
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 flex-shrink-0">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(218, 165, 32, 0.5)",
                      "0 0 40px rgba(218, 165, 32, 0.7)",
                      "0 0 20px rgba(218, 165, 32, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
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
                      width={48}
                      height={48}
                      className="opacity-100 contrast-150 brightness-75"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <motion.h3
                  className="font-serif text-2xl text-amber-950 font-bold mb-1 truncate tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  {poem.title}
                </motion.h3>
                
                  <p className="text-amber-900 text-sm mb-3 font-serif font-bold">
                    {poem.deity} • {poem.mood}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-amber-900 font-sans font-black">
                    <span>{poem.language}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>{poem.duration}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>{poem.recorded_year}</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-6 pt-4 border-t border-amber-300 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
              >
                <span className="text-amber-950 text-xs font-serif italic font-bold">
                  Sung by {poem.recorded_by}
                </span>
              
              <motion.div
                className="flex items-center gap-2 text-amber-800 font-serif font-black"
                whileHover={{ x: 5 }}
              >
                {poem.hasAudio ? (
                  <>
                    <span>Begin Devotion</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </>
                ) : (
                  <span className="text-amber-600 font-bold">Preparing...</span>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(218, 165, 32, 0.4) 0%, transparent 50%, rgba(218, 165, 32, 0.4) 100%)",
            filter: "blur(20px)",
          }}
        />
      </motion.div>
    </Link>
  );
}
