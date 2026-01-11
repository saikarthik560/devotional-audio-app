"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LordGaneshaProps {
  size?: number;
}

export function LordGanesha({ size = 400 }: LordGaneshaProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Divine Aura / Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-amber-500/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="https://pngimg.com/uploads/ganesha/ganesha_PNG34.png"
          alt="Lord Ganesha"
          fill
          className="object-contain drop-shadow-[0_0_30px_rgba(255,191,0,0.3)]"
          priority
        />
      </div>

      {/* Additional subtle spiritual rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/5 to-transparent origin-center"
            style={{ rotate: `${i * 45}deg` }}
            animate={{
              opacity: [0, 0.5, 0],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
