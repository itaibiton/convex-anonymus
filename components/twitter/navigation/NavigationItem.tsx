"use client";

import { useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface NavigationItemProps {
  icon: string;
  label: string;
  active?: boolean;
  badge?: string;
}

export function NavigationItem({ icon, label, active = false, badge }: NavigationItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the icon component from Lucide
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{className?: string}>>)[icon];

  const baseClasses = "flex items-center space-x-4 p-3 rounded-full cursor-pointer transition-colors";
  const stateClasses = active 
    ? "bg-gray-900" 
    : isHovered 
    ? "bg-gray-900" 
    : "hover:bg-gray-900";

  return (
    <div 
      className={`${baseClasses} ${stateClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {IconComponent && <IconComponent className="w-6 h-6" />}
      <span className="text-xl font-normal hidden lg:block">{label}</span>
      {badge && (
        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-auto">
          {badge}
        </span>
      )}
    </div>
  );
}