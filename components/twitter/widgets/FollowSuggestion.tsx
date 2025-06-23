"use client";

import { useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import { User } from '../data/types';

interface FollowSuggestionProps {
  user: User;
}

export function FollowSuggestion({ user }: FollowSuggestionProps) {
  const [isFollowing, setIsFollowing] = useState(user.following || false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <img
          src={user.avatar}
          alt={`${user.name} avatar`}
          className="w-10 h-10 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40x40/1f2937/ffffff?text=' + user.name[0];
          }}
        />
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-white hover:underline cursor-pointer">
              {user.name}
            </span>
            {user.verified && (
              <BadgeCheck className="w-4 h-4 text-blue-500 fill-current" />
            )}
          </div>
          <div className="text-gray-500 text-sm">@{user.handle}</div>
        </div>
      </div>
      
      <button
        onClick={handleFollow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`font-bold py-1 px-4 rounded-full text-sm transition-colors ${
          isFollowing
            ? isHovered
              ? 'bg-red-600 text-white border border-red-600'
              : 'bg-transparent text-white border border-gray-600 hover:bg-red-600 hover:border-red-600'
            : 'bg-white text-black hover:bg-gray-200'
        }`}
      >
        {isFollowing 
          ? isHovered 
            ? 'Unfollow' 
            : 'Following'
          : 'Follow'
        }
      </button>
    </div>
  );
}