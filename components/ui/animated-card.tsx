"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const AnimatedCard = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <motion.div
      className={cn("relative group", containerClassName)}
      // whileHover={{ scale: 1.02 }}
      // whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <div
        className={cn(
          "relative h-full w-full p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/20",
          className
        )}
      >
        {children}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
    </motion.div>
  );
};