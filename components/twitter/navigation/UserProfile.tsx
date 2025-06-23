"use client";

import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

export function UserProfile() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`flex items-center space-x-3 p-3 rounded-full cursor-pointer transition-colors ${
        isHovered ? 'bg-gray-900' : 'hover:bg-gray-900'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://pbs.twimg.com/profile_images/1234567890123456789/default_400x400.jpg"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40x40/1f2937/ffffff?text=U';
        }}
      />
      <div className="flex-1 hidden lg:block">
        <div className="font-bold text-white">You</div>
        <div className="text-gray-500 text-sm">@yourhandle</div>
      </div>
      <MoreHorizontal className="w-4 h-4 text-gray-500 hidden lg:block" />
    </div>
  );
}