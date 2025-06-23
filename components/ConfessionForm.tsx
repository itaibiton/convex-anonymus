"use client";

import { useState } from "react";
import { useMutation, useConvexAuth } from "convex/react";
import { api } from "../convex/_generated/api";
import { Image, Smile, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConfessionForm() {
  const [confession, setConfession] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const addConfession = useMutation(api.confessions.addConfession);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confession.trim() || isSubmitting || !isAuthenticated) return;

    setIsSubmitting(true);
    try {
      await addConfession({ content: confession.trim() });
      setConfession("");
    } catch (error) {
      console.error("Failed to submit confession:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  // Show loading skeleton while auth is loading
  if (authLoading) {
    return (
      <div className="twitter-border border-b p-4">
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
          <div className="flex-1">
            <div className="h-20 bg-muted rounded animate-pulse mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-muted rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="twitter-border border-b p-4">
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-base">?</span>
          </div>
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center">
              <p className="twitter-muted text-lg mb-4">Want to share your confession?</p>
              <Link href="/signin">
                <Button size="lg" className="rounded-full">
                  Sign In to Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="twitter-border border-b p-4">
      <div className="flex space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-semibold text-base">A</span>
        </div>
        <div className="flex-1">
          <textarea
            value={confession}
            onChange={(e) => setConfession(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-2xl placeholder:text-muted-foreground resize-none border-none outline-none min-h-[80px] text-foreground leading-relaxed"
            maxLength={280}
            disabled={isSubmitting}
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4 text-primary">
              <button className="hover:bg-primary/10 p-2 rounded-full transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="hover:bg-primary/10 p-2 rounded-full transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="hover:bg-primary/10 p-2 rounded-full transition-colors">
                <Calendar className="w-5 h-5" />
              </button>
              <button className="hover:bg-primary/10 p-2 rounded-full transition-colors">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              {confession.length > 0 && (
                <span className={`text-base font-medium ${
                  confession.length > 252 
                    ? 'text-destructive' 
                    : confession.length > 224 
                    ? 'text-yellow-500' 
                    : 'text-muted-foreground'
                }`}>
                  {280 - confession.length}
                </span>
              )}
              <Button
                onClick={handleSubmit}
                disabled={!confession.trim() || confession.length > 280 || isSubmitting}
                size="lg"
                className="rounded-full"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}