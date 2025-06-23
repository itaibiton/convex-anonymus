"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
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
      return "now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="p-6 twitter-border border-b twitter-hover cursor-pointer">
      <div className="flex space-x-4">
        {/* Anonymous Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-semibold text-base">A</span>
        </div>
        
        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-bold text-foreground text-base">Anonymous</span>
            <span className="twitter-muted text-base">@anonymous</span>
            <span className="twitter-muted">·</span>
            <span className="twitter-muted text-base">{formatDate(createdAt)}</span>
          </div>
          
          {/* Confession Content */}
          <div className="card-content text-foreground text-lg leading-7 mb-4">
            {content}
          </div>
          
          {/* Actions */}
          <div className="flex justify-between max-w-md mt-4 twitter-muted">
            {/* Reply */}
            <button className="flex items-center space-x-2 hover:text-primary transition-colors group">
              <div className="group-hover:bg-primary/10 p-1 rounded-full transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-base">{formatCount(commentsCount)}</span>
            </button>

            {/* Repost */}
            <button 
              onClick={handleRepost}
              disabled={!isAuthenticated}
              className={`flex items-center space-x-2 transition-colors group ${
                isReposted ? 'text-emerald-500' : 'hover:text-emerald-500'
              } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`p-1 rounded-full transition-colors ${
                isReposted 
                  ? 'bg-emerald-500/10' 
                  : 'group-hover:bg-emerald-500/10'
              }`}>
                <Repeat2 className="w-5 h-5" />
              </div>
              <span className="text-base">{formatCount(repostsCount)}</span>
            </button>

            {/* Like */}
            <button 
              onClick={handleLike}
              disabled={!isAuthenticated}
              className={`flex items-center space-x-2 transition-colors group ${
                isLiked ? 'text-rose-500' : 'hover:text-rose-500'
              } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`p-1 rounded-full transition-colors ${
                isLiked 
                  ? 'bg-rose-500/10' 
                  : 'group-hover:bg-rose-500/10'
              }`}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-base">{formatCount(likesCount)}</span>
            </button>

            {/* Share */}
            <button className="flex items-center space-x-2 hover:text-primary transition-colors group">
              <div className="group-hover:bg-primary/10 p-1 rounded-full transition-colors">
                <Share className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}