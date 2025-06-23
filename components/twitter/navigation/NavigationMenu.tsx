"use client";

import { NavigationItem } from './NavigationItem';
import { navigationItems } from '../data/navigationData';

export function NavigationMenu() {
  return (
    <nav className="space-y-1">
      {navigationItems.map((item, index) => (
        <NavigationItem
          key={index}
          icon={item.icon}
          label={item.label}
          active={item.active}
          badge={item.badge}
        />
      ))}
    </nav>
  );
}