"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ActiveUsers() {
  const activeUsers = [
    { name: 'Anonymous User', handle: 'user_2847', lastActive: '2m', isOnline: true },
    { name: 'Night Owl', handle: 'user_1923', lastActive: '5m', isOnline: true },
    { name: 'Silent Thoughts', handle: 'user_4567', lastActive: '12m', isOnline: false },
  ];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-2xl">Recently Active</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {activeUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-base">
                    {user.name.charAt(0)}
                  </span>
                </div>
                {user.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-card"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground hover:underline cursor-pointer text-base">
                  {user.name}
                </div>
                <div className="twitter-muted text-base">@{user.handle}</div>
              </div>
            </div>
            <div className="twitter-muted text-base">
              {user.lastActive}
            </div>
          </div>
        ))}
        <Button variant="ghost" className="text-primary hover:underline text-base mt-4 p-0 h-auto font-medium">
          View all
        </Button>
      </CardContent>
    </Card>
  );
}