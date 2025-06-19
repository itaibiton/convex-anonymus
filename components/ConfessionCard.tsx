"use client";

import { motion } from "framer-motion";

interface ConfessionCardProps {
  content: string;
  createdAt: number;
}

export default function ConfessionCard({ content, createdAt }: ConfessionCardProps) {

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
      className="w-full border-b border-border hover:bg-accent/5 transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 min-h-[200px] flex flex-col justify-between">
        <p className="text-foreground leading-relaxed text-sm sm:text-base mb-4">
          {content}
        </p>

        <div className="flex items-center justify-between w-full pt-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-[hsl(var(--color-muted-foreground))] rounded-full" />
            <span>Anonymous</span>
          </div>

          <time className="text-xs text-muted-foreground">
            {formatDate(createdAt)}
          </time>
        </div>
      </div>
    </motion.div>
  );
}