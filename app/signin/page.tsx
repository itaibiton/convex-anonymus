"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SignIn() {
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for authentication - for now just redirect to home
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-surface shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold gradient-text">
              Confession Wall
            </CardTitle>
            <p className="text-center text-muted-foreground">
              {flow === "signIn" ? "Welcome back" : "Create your account"}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  className="w-full p-3 glass-surface rounded-xl border-[hsl(var(--color-border))] placeholder:text-[hsl(var(--color-muted-foreground))] text-theme focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:border-transparent transition-all duration-200"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  className="w-full p-3 glass-surface rounded-xl border-[hsl(var(--color-border))] placeholder:text-[hsl(var(--color-muted-foreground))] text-theme focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:border-transparent transition-all duration-200"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="gradient"
                className="w-full rounded-xl"
                size="lg"
              >
                {flow === "signIn" ? "Sign in" : "Sign up"}
              </Button>
              <div className="text-center">
                <span className="text-muted-foreground">
                  {flow === "signIn"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>{" "}
                <span
                  className="text-[hsl(var(--color-primary))] underline hover:no-underline cursor-pointer"
                  onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
                >
                  {flow === "signIn" ? "Sign up" : "Sign in"}
                </span>
              </div>
              {error && (
                <div className="bg-[hsl(var(--color-destructive))]/20 border border-[hsl(var(--color-destructive))]/50 rounded-xl p-3">
                  <p className="text-destructive text-sm">
                    Error signing in: {error}
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
