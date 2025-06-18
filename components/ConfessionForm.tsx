"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

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
    <div className="w-full max-w-2xl mx-auto">
      <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 rounded-2xl border border-white/30 dark:border-white/10 shadow-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="Share your anonymous confession..."
              className="w-full h-32 p-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-xl border border-white/40 dark:border-white/20 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              maxLength={280}
              disabled={isSubmitting}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
              {remainingChars} characters left
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className={`text-sm ${remainingChars < 0 ? 'text-red-500' : remainingChars < 20 ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
              {confession.length}/280
            </div>
            
            <button
              type="submit"
              disabled={!confession.trim() || remainingChars < 0 || isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg backdrop-blur-sm"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </div>
              ) : (
                "Post Anonymously"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}