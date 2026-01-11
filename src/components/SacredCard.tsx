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
        className="relative group cursor-pointer"
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
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900/60 to-slate-950/80 border border-amber-800/20 backdrop-blur-sm">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"
            animate={{
              x: ["-200%", "200%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.1) 0%, transparent 60%)",
            }}
          />

          <div className="relative p-6">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(218, 165, 32, 0.2)",
                      "0 0 30px rgba(218, 165, 32, 0.3)",
                      "0 0 20px rgba(218, 165, 32, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {poem.hasDeityImage ? (
                  <Image
                    src={poem.deityImageUrl}
                    alt={poem.deity}
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-600/30 to-amber-900/30 flex items-center justify-center">
                    <Image
                      src="/icons/om.svg"
                      alt="Om"
                      width={40}
                      height={40}
                      className="opacity-60"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <motion.h3
                  className="font-serif text-xl text-amber-100 mb-1 truncate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {poem.title}
                </motion.h3>
                
                <p className="text-amber-300/60 text-sm mb-3">
                  {poem.deity} • {poem.mood}
                </p>

                <div className="flex items-center gap-3 text-xs text-amber-200/40">
                  <span>{poem.language}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-500/30" />
                  <span>{poem.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-500/30" />
                  <span>{poem.recorded_year}</span>
                </div>
              </div>
            </div>

            <motion.div
              className="mt-4 pt-4 border-t border-amber-800/20 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <span className="text-amber-200/50 text-xs font-serif">
                Sung by {poem.recorded_by}
              </span>
              
              <motion.div
                className="flex items-center gap-2 text-amber-400/60 text-xs"
                whileHover={{ x: 3 }}
              >
                {poem.hasAudio ? (
                  <>
                    <span>Listen</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </>
                ) : (
                  <span className="text-amber-500/40">Coming soon</span>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(218, 165, 32, 0.1) 0%, transparent 50%, rgba(70, 130, 180, 0.1) 100%)",
            filter: "blur(10px)",
          }}
        />
      </motion.div>
    </Link>
  );
}
