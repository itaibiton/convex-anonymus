"use client";

import { TabNavigation } from './TabNavigation';

export function FeedHeader() {
  return (
    <div className="sticky top-0 bg-black/80 backdrop-blur border-b border-gray-800 p-4">
      <h1 className="text-xl font-bold mb-4">Home</h1>
      <TabNavigation />
    </div>
  );
}