"use client";

import { Sidebar } from './Sidebar';
import { MainFeed } from './MainFeed';
import { RightPanel } from './RightPanel';

export function TwitterLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <MainFeed />
      <RightPanel />
    </div>
  );
}