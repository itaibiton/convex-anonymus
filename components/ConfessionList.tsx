"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import ConfessionCard from "./ConfessionCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function ConfessionList() {
  const confessions = useQuery(api.confessions.getConfessions);

  if (confessions === undefined) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card className="glass-surface">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <div className="flex justify-between items-center w-full pt-2 border-t border-[hsl(var(--color-border))]">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  if (confessions.length === 0) {
    return (
      <motion.div 
        className="w-full max-w-4xl mx-auto text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-surface">
          <CardContent className="p-8">
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
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-foreground text-center">
          Recent Confessions
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          {confessions.length} {confessions.length === 1 ? 'confession' : 'confessions'} shared
        </p>
      </motion.div>
      
      <div className="space-y-6">
        {confessions.map((confession, index) => (
          <motion.div
            key={confession._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ConfessionCard
              content={confession.content}
              createdAt={confession.createdAt}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}