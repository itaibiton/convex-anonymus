"use client";

import { TrendingTopic } from '../data/types';

interface TrendingItemProps {
  topic: TrendingTopic;
}

export function TrendingItem({ topic }: TrendingItemProps) {

  return (
    <div className="py-2 hover:bg-gray-800 -mx-2 px-2 rounded cursor-pointer transition-colors">
      <div className="text-gray-500 text-sm">{topic.category}</div>
      <div className="font-bold text-white">{topic.title}</div>
      {topic.posts && (
        <div className="text-gray-500 text-sm">{topic.posts}</div>
      )}
    </div>
  );
}