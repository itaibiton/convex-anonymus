"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

interface ConfessionCardProps {
  content: string;
  createdAt: number;
}

export default function ConfessionCard({ content, createdAt }: ConfessionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="glass-surface shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--color-primary))]/5 to-[hsl(var(--color-destructive))]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={{
            background: isHovered
              ? "linear-gradient(135deg, hsl(var(--color-primary) / 0.1), hsl(var(--color-destructive) / 0.1))"
              : "linear-gradient(135deg, hsl(var(--color-primary) / 0.05), hsl(var(--color-destructive) / 0.05))"
          }}
          transition={{ duration: 0.3 }}
        />
        
        <CardContent className="p-6 relative z-10">
          <p className="text-foreground leading-relaxed text-sm sm:text-base">
            {content}
          </p>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0 relative z-10">
          <div className="flex items-center justify-between w-full pt-2 border-t border-[hsl(var(--color-border))]">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <motion.div 
                className="w-2 h-2 bg-[hsl(var(--color-muted-foreground))] rounded-full"
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>Anonymous</span>
            </div>
            
            <time className="text-xs text-muted-foreground">
              {formatDate(createdAt)}
            </time>
          </div>
        </CardFooter>

        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, hsl(var(--color-primary) / 0.2) 0%, transparent 50%)",
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </Card>
    </motion.div>
  );
}