"use client";

import SimpleSidebar from "@/components/SimpleSidebar";
import { Card, CardContent } from "@/components/ui/card";

export default function CommentsPage() {
  return (
    <SimpleSidebar>
      <div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              My Comments
            </h1>
            <p className="text-muted-foreground">
              Your thoughtful responses to confessions
            </p>
          </div>
          
          <Card className="glass-surface">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No comments yet
              </h3>
              <p className="text-muted-foreground">
                Start engaging with the community by commenting on confessions!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleSidebar>
  );
}