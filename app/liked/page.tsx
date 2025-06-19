"use client";

import SimpleSidebar from "@/components/SimpleSidebar";
import { Card, CardContent } from "@/components/ui/card";

export default function LikedPage() {
  return (
    <SimpleSidebar>
      <div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Liked Posts
            </h1>
            <p className="text-muted-foreground">
              Confessions you&apos;ve shown appreciation for
            </p>
          </div>
          
          <Card className="glass-surface">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No liked posts yet
              </h3>
              <p className="text-muted-foreground">
                Like some confessions to see them here!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleSidebar>
  );
}