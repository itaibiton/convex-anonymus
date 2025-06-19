"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function ConfessionForm() {
  const [confession, setConfession] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addConfession = useMutation(api.confessions.addConfession);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confession.trim() || isSubmitting) return;

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

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-surface shadow-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                value={confession}
                onChange={(e) => setConfession(e.target.value)}
                placeholder="Share your anonymous confession..."
                className="h-32 glass-surface border-[hsl(var(--color-border))] placeholder:text-[hsl(var(--color-muted-foreground))] resize-none focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:border-transparent transition-all duration-200"
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
                    <div className="w-4 h-4 border-2 border-[hsl(var(--color-primary-foreground))]/30 border-t-[hsl(var(--color-primary-foreground))] rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </div>
                ) : (
                  "Post Anonymously"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}