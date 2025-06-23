"use client";

import { useState } from 'react';
import { MessageCircle, Repeat2, Heart, Share } from 'lucide-react';
import { Tweet } from '../data/types';

interface TweetActionsProps {
  tweet: Tweet;
}

export function TweetActions({ tweet }: TweetActionsProps) {
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted);
  const [likeCount, setLikeCount] = useState(tweet.likes);
  const [retweetCount, setRetweetCount] = useState(tweet.retweets);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRetweeted(!isRetweeted);
    setRetweetCount(isRetweeted ? retweetCount - 1 : retweetCount + 1);
  };

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Reply to tweet:', tweet.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Share tweet:', tweet.id);
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
    <div className="flex justify-between max-w-md mt-3 text-gray-500">
      {/* Reply */}
      <button 
        onClick={handleReply}
        className="flex items-center space-x-2 hover:text-blue-500 transition-colors group"
      >
        <div className="group-hover:bg-blue-500/10 p-1 rounded-full transition-colors">
          <MessageCircle className="w-5 h-5" />
        </div>
        <span className="text-sm">{formatCount(tweet.replies)}</span>
      </button>

      {/* Retweet */}
      <button 
        onClick={handleRetweet}
        className={`flex items-center space-x-2 transition-colors group ${
          isRetweeted ? 'text-green-500' : 'hover:text-green-500'
        }`}
      >
        <div className={`p-1 rounded-full transition-colors ${
          isRetweeted 
            ? 'bg-green-500/10' 
            : 'group-hover:bg-green-500/10'
        }`}>
          <Repeat2 className="w-5 h-5" />
        </div>
        <span className="text-sm">{formatCount(retweetCount)}</span>
      </button>

      {/* Like */}
      <button 
        onClick={handleLike}
        className={`flex items-center space-x-2 transition-colors group ${
          isLiked ? 'text-red-500' : 'hover:text-red-500'
        }`}
      >
        <div className={`p-1 rounded-full transition-colors ${
          isLiked 
            ? 'bg-red-500/10' 
            : 'group-hover:bg-red-500/10'
        }`}>
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </div>
        <span className="text-sm">{formatCount(likeCount)}</span>
      </button>

      {/* Share */}
      <button 
        onClick={handleShare}
        className="flex items-center space-x-2 hover:text-blue-500 transition-colors group"
      >
        <div className="group-hover:bg-blue-500/10 p-1 rounded-full transition-colors">
          <Share className="w-5 h-5" />
        </div>
        <span className="text-sm">{formatCount(tweet.shares)}</span>
      </button>
    </div>
  );
}