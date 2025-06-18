"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import ConfessionCard from "./ConfessionCard";

export default function ConfessionList() {
  const confessions = useQuery(api.confessions.getConfessions);

  if (confessions === undefined) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-white/10 p-6 animate-pulse"
          >
            <div className="space-y-3">
              <div className="h-4 bg-white/20 dark:bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/20 dark:bg-white/10 rounded w-1/2"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-3 bg-white/20 dark:bg-white/10 rounded w-20"></div>
                <div className="h-3 bg-white/20 dark:bg-white/10 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (confessions.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <div className="backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-white/10 p-8">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No confessions yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Be the first to share an anonymous confession!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
          Recent Confessions
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
          {confessions.length} {confessions.length === 1 ? 'confession' : 'confessions'} shared
        </p>
      </div>
      
      <div className="space-y-6">
        {confessions.map((confession) => (
          <ConfessionCard
            key={confession._id}
            content={confession.content}
            createdAt={confession.createdAt}
          />
        ))}
      </div>
    </div>
  );
}