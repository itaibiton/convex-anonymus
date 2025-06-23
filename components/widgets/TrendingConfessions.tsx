"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TrendingConfessions() {
  const trendingTopics = [
    {
      category: 'Life · Trending',
      title: 'Work stress',
      posts: '1.2K confessions',
    },
    {
      category: 'Relationships · Popular',
      title: 'Dating anxiety',
      posts: '892 confessions',
    },
    {
      category: 'Mental Health · Trending',
      title: 'Therapy',
      posts: '654 confessions',
    },
  ];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-2xl">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {trendingTopics.map((topic, index) => (
          <div
            key={index}
            className="py-3 twitter-hover -mx-3 px-3 rounded cursor-pointer"
          >
            <div className="twitter-muted text-base">{topic.category}</div>
            <div className="font-bold text-foreground text-lg">{topic.title}</div>
            <div className="twitter-muted text-base">{topic.posts}</div>
          </div>
        ))}
        <Button variant="ghost" className="text-primary hover:underline text-base mt-4 p-0 h-auto font-medium">
          Show more
        </Button>
      </CardContent>
    </Card>
  );
}