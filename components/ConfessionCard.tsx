"use client";

import { motion } from "framer-motion";
import { useConvexAuth, useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

interface ConfessionCardProps {
  _id: Id<"confessions">;
  content: string;
  createdAt: number;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked: boolean;
  isReposted: boolean;
}

export default function ConfessionCard({ _id, content, createdAt, likesCount, commentsCount, repostsCount, isLiked, isReposted }: ConfessionCardProps) {
  const { isAuthenticated } = useConvexAuth();
  const toggleLike = useMutation(api.confessions.toggleLike);
  const toggleRepost = useMutation(api.confessions.toggleRepost);

  const handleLike = async () => {
    if (!isAuthenticated) return;
    try {
      await toggleLike({ confessionId: _id });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleRepost = async () => {
    if (!isAuthenticated) return;
    try {
      await toggleRepost({ confessionId: _id });
    } catch (error) {
      console.error("Error toggling repost:", error);
    }
  };

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
          <div className="flex items-center text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-muted-foreground rounded-full mr-2" />
            <span>Anonymous</span>
          </div>

          <time className="text-xs text-muted-foreground">
            {formatDate(createdAt)}
          </time>
        </div>

        <div className="flex items-center justify-between w-full pt-4 border-t border-border/50">
          <div className="flex items-center space-x-1">
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 px-2 transition-colors ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'}`}
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs">{likesCount}</span>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground/50 cursor-not-allowed" disabled>
                <Heart className="w-4 h-4 mr-1" />
                <span className="text-xs">{likesCount}</span>
              </Button>
            )}

            {isAuthenticated ? (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-primary">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">{commentsCount}</span>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground/50 cursor-not-allowed" disabled>
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">{commentsCount}</span>
              </Button>
            )}

            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 px-2 transition-colors ${isReposted ? 'text-green-500 hover:text-green-600' : 'text-muted-foreground hover:text-green-500'}`}
                onClick={handleRepost}
              >
                <Repeat2 className="w-4 h-4 mr-1" />
                <span className="text-xs">{repostsCount}</span>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground/50 cursor-not-allowed" disabled>
                <Repeat2 className="w-4 h-4 mr-1" />
                <span className="text-xs">{repostsCount}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}