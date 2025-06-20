"use client";

import { usePaginatedQuery, useConvexAuth } from "convex/react";
import { api } from "../convex/_generated/api";
import ConfessionCard from "./ConfessionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ConfessionList() {
  const { isLoading: authLoading } = useConvexAuth();
  const [mounted, setMounted] = useState(false);
  const { results: confessions, status, loadMore } = usePaginatedQuery(
    api.confessions.getConfessions,
    { paginationOpts: { cursor: null, numItems: 10 } },
    { initialNumItems: 10 }
  );
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          loadMore(5);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [status, loadMore]);

  // Show loading skeleton while auth is loading, component is mounting, confessions are undefined, or query is loading
  const isLoading = !mounted || authLoading || confessions === undefined || status === "LoadingFirstPage";
  
  if (isLoading) {
    return (
      <div className="w-full">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <div className="border-b border-border p-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex justify-between items-center w-full pt-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (confessions.length === 0) {
    return (
      <motion.div
        className="w-full text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-b border-border p-8">
          <motion.div
            className="mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg className="w-16 h-16 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No confessions yet
          </h3>
          <p className="text-muted-foreground">
            Be the first to share an anonymous confession!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        {confessions.map((confession, index) => (
          <motion.div
            key={confession._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ConfessionCard
              _id={confession._id}
              content={confession.content}
              createdAt={confession.createdAt}
              likesCount={confession.likesCount}
              commentsCount={confession.commentsCount}
              repostsCount={confession.repostsCount}
              isLiked={confession.isLiked}
              isReposted={confession.isReposted}
            />
          </motion.div>
        ))}

        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {status === "LoadingMore" && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"></div>
              <span className="text-sm">Loading more...</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}