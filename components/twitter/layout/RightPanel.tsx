"use client";

import { TrendingWidget } from '../widgets/TrendingWidget';
import { WhoToFollowWidget } from '../widgets/WhoToFollowWidget';

export function RightPanel() {
  return (
    <div className="w-80 p-4 hidden lg:block">
      <TrendingWidget />
      <WhoToFollowWidget />
    </div>
  );
}