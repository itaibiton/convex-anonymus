"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const FloatingButton = ({
  children,
  onClick,
  className,
  position = "bottom-right",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}) => {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <motion.button
      className={cn(
        "fixed z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300",
        positionClasses[position],
        className
      )}
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.button>
  );
};