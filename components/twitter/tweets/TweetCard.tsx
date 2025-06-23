"use client";

import { BadgeCheck } from 'lucide-react';
import { Tweet } from '../data/types';
import { TweetActions } from './TweetActions';

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {

  return (
    <div className="p-4 border-b border-gray-800 hover:bg-gray-950/50 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        <img
          src={tweet.user.avatar}
          alt={`${tweet.user.name} avatar`}
          className="w-10 h-10 rounded-full flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40x40/1f2937/ffffff?text=' + tweet.user.name[0];
          }}
        />

        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="flex items-center space-x-1 mb-1">
            <span className="font-bold text-white hover:underline cursor-pointer">
              {tweet.user.name}
            </span>
            {tweet.user.verified && (
              <BadgeCheck className="w-4 h-4 text-blue-500 fill-current" />
            )}
            <span className="text-gray-500">@{tweet.user.handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{tweet.timestamp}</span>
          </div>

          {/* Tweet Content */}
          <div className="text-white text-[15px] leading-5 mb-3">
            {tweet.content}
          </div>

          {/* Image Content */}
          {tweet.image && (
            <div className="rounded-2xl overflow-hidden mb-3 max-w-full">
              <img
                src={tweet.image}
                alt="Tweet media"
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Actions */}
          <TweetActions tweet={tweet} />
        </div>
      </div>
    </div>
  );
}