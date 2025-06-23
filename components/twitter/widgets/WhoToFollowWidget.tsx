"use client";

import { FollowSuggestion } from './FollowSuggestion';
import { sampleUsers } from '../data/sampleTweets';

export function WhoToFollowWidget() {
  // Use some of the sample users as follow suggestions
  const followSuggestions = sampleUsers.slice(3, 6); // Take Shadowed News, Eugene, and NASA

  return (
    <div className="bg-gray-900 rounded-2xl p-4 mb-4">
      <h2 className="text-xl font-bold mb-3">Who to follow</h2>
      <div className="space-y-0">
        {followSuggestions.map((user) => (
          <FollowSuggestion key={user.id} user={user} />
        ))}
      </div>
      <button className="text-blue-500 hover:underline text-sm mt-3">
        Show more
      </button>
    </div>
  );
}