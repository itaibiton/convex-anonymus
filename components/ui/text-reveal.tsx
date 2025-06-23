"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export const TextReveal = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};