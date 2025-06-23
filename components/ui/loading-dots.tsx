"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const LoadingDots = ({
  className,
  dotClassName,
  size = "md",
}: {
  className?: string;
  dotClassName?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  const containerAnimation = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  const dotAnimation = {
    animate: {
      y: [0, -8, 0],
    },
  };

  const dotTransition = {
    duration: 0.6,
    ease: "easeInOut" as const,
  };

  return (
    <motion.div
      className={cn("flex items-center justify-center space-x-1", className)}
      variants={containerAnimation}
      animate="animate"
    >
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "rounded-full bg-primary",
            sizeClasses[size],
            dotClassName
          )}
          variants={dotAnimation}
          transition={dotTransition}
        />
      ))}
    </motion.div>
  );
};