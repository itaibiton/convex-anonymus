"use client";

import ConfessionForm from './ConfessionForm';
import ConfessionList from './ConfessionList';
import { TrendingConfessions } from './widgets/TrendingConfessions';
import { StatsWidget } from './widgets/StatsWidget';
import { ActiveUsers } from './widgets/ActiveUsers';

export function TwitterFeedLayout() {
  return (
    <div className="flex h-full bg-background text-foreground">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl twitter-border border-r flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur twitter-border border-b p-4 z-10 shrink-0">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Confessions</h1>
          <div className="flex space-x-8">
            <button className="text-foreground text-lg font-semibold border-b-2 border-primary pb-3">
              Recent
            </button>
            <button className="twitter-muted text-lg font-semibold pb-3 hover:text-foreground transition-colors">
              Trending
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Composer */}
          <ConfessionForm />

          {/* Feed */}
          <ConfessionList />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-80 p-4 hidden lg:block h-full overflow-y-auto bg-background">
        <div className="flex h-full flex-col">
          <div className="flex-1">
            {/* <StatsWidget /> */}
          </div>
          <div className="flex-1">
            <TrendingConfessions />
          </div>
          <div className="flex-1">
            <ActiveUsers />
          </div>
        </div>
      </div>
    </div>
  );
}