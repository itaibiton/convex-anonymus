"use client";

import { FeedHeader } from '../header/FeedHeader';
import { TweetComposer } from '../tweets/TweetComposer';
import { TweetCard } from '../tweets/TweetCard';
import { sampleTweets } from '../data/sampleTweets';

export function MainFeed() {
  return (
    <div className="flex-1 max-w-2xl border-r border-gray-800">
      <FeedHeader />
      <TweetComposer />
      <div>
        {sampleTweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}