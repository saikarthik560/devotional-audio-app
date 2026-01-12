"use client";

import { motion, useAnimation } from "framer-motion";
import { ReactNode } from "react";

interface SacredButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function SacredButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: SacredButtonProps) {
  const controls = useAnimation();

  const baseStyles = "relative overflow-hidden rounded-full font-serif tracking-wider transition-all duration-500 active:scale-95 touch-manipulation";
  
    const variantStyles = {
      primary: "bg-gradient-to-r from-amber-600/80 via-amber-500/70 to-amber-600/80 border-2 border-amber-400/50 text-amber-50 shadow-[0_0_20px_rgba(218,165,32,0.2)]",
      secondary: "bg-gradient-to-r from-slate-700/80 via-slate-600/70 to-slate-700/80 border-2 border-slate-400/50 text-white shadow-[0_0_20px_rgba(70,130,180,0.1)]",
      ghost: "bg-transparent border-2 border-amber-400/40 text-amber-100 font-bold",
    };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  const handleTap = async () => {
    await controls.start({
      boxShadow: [
        "0 0 20px rgba(218, 165, 32, 0.2)",
        "0 0 80px rgba(218, 165, 32, 0.8)",
        "0 0 20px rgba(218, 165, 32, 0.2)",
      ],
      scale: [1, 0.9, 1],
      transition: { duration: 0.3 }
    });
    if (onClick) onClick();
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onTap={handleTap}
      disabled={disabled}
      whileHover={isMobile ? {} : { scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={controls}
        initial={{
          boxShadow: "0 0 20px rgba(218, 165, 32, 0.1), inset 0 0 20px rgba(218, 165, 32, 0.05)",
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "0 0 15px rgba(218, 165, 32, 0.1)",
            "0 0 25px rgba(218, 165, 32, 0.2)",
            "0 0 15px rgba(218, 165, 32, 0.1)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
