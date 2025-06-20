"use client";

import { useState } from "react";
import { useMutation, useConvexAuth } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Link from "next/link";

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

  const remainingChars = 280 - confession.length;

  // Show loading skeleton while auth is loading
  if (authLoading) {
    return (
      <motion.div
        className="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4">
          <div className="space-y-4">
            <div className="h-24 bg-muted/50 rounded-md animate-pulse" />
            <div className="flex justify-between items-center">
              <div className="h-4 w-16 bg-muted/50 rounded animate-pulse" />
              <div className="h-10 w-32 bg-muted/50 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.div
        className="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4">
          <div className="space-y-4 text-center">
            <div className="text-muted-foreground">
              Want to share your confession?
            </div>
            <Link href="/signin">
              <Button variant="gradient" size="lg" className="rounded-xl backdrop-blur-sm">
                Sign In to Post
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                value={confession}
                onChange={(e) => setConfession(e.target.value)}
                placeholder="Share your anonymous confession..."
                className="h-24 border-border placeholder:text-muted-foreground resize-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 bg-background"
                maxLength={280}
                disabled={isSubmitting}
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {remainingChars} characters left
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className={`text-sm ${remainingChars < 0 ? 'text-destructive' : remainingChars < 20 ? 'text-primary' : 'text-muted-foreground'}`}>
                {confession.length}/280
              </div>

              <Button
                type="submit"
                disabled={!confession.trim() || remainingChars < 0 || isSubmitting}
                variant="gradient"
                size="lg"
                className="rounded-xl backdrop-blur-sm"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </div>
                ) : (
                  "Post Anonymously"
                )}
              </Button>
            </div>
          </form>
      </div>
    </motion.div>
  );
}