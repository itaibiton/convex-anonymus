"use client";

import SimpleSidebar from "@/components/SimpleSidebar";
import { Card, CardContent } from "@/components/ui/card";

export default function RepostsPage() {
  return (
    <SimpleSidebar>
      <div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              My Reposts
            </h1>
            <p className="text-muted-foreground">
              Confessions you&apos;ve shared with your own thoughts
            </p>
          </div>
          
          <Card className="glass-surface">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No reposts yet
              </h3>
              <p className="text-muted-foreground">
                Repost confessions to share them with your own commentary!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleSidebar>
  );
}