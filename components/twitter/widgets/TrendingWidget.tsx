"use client";

import { TrendingItem } from './TrendingItem';
import { trendingTopics } from '../data/navigationData';

export function TrendingWidget() {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 mb-4">
      <h2 className="text-xl font-bold mb-3">What&apos;s happening</h2>
      <div className="space-y-0">
        {trendingTopics.map((topic, index) => (
          <TrendingItem key={index} topic={topic} />
        ))}
      </div>
      <button className="text-blue-500 hover:underline text-sm mt-3">
        Show more
      </button>
    </div>
  );
}