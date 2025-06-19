"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const paths = [
    "M-328.5 0L100 1000",
    "M100 0L-328.5 1000",
    "M528.5 0L900 1000",
    "M900 0L528.5 1000",
    "M-128.5 0L300 1000",
    "M300 0L-128.5 1000",
    "M728.5 0L1100 1000",
    "M1100 0L728.5 1000",
    "M72.5 0L500 1000",
    "M500 0L72.5 1000",
    "M928.5 0L1300 1000",
    "M1300 0L928.5 1000",
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      <svg
        className="z-0 h-full w-full pointer-events-none absolute left-0 top-0"
        width="100%"
        height="100%"
        viewBox="0 0 1200 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "rgba(168, 85, 247, 0.8)" }} />
            <stop offset="50%" style={{ stopColor: "rgba(236, 72, 153, 0.6)" }} />
            <stop offset="100%" style={{ stopColor: "rgba(168, 85, 247, 0.8)" }} />
          </linearGradient>
        </defs>
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke="url(#beam-gradient)"
            strokeOpacity="0.1"
            strokeWidth="0.5"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
};