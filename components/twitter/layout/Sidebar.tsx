"use client";

import { NavigationMenu } from '../navigation/NavigationMenu';
import { UserProfile } from '../navigation/UserProfile';

export function Sidebar() {
  return (
    <div className="w-64 p-4 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="mb-8 px-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-xl">𝕏</span>
        </div>
      </div>

      {/* Navigation */}
      <NavigationMenu />

      {/* Tweet Button */}
      <div className="my-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors w-full">
          Post
        </button>
      </div>

      {/* User Profile */}
      <div className="mt-auto">
        <UserProfile />
      </div>
    </div>
  );
}