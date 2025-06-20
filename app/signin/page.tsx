"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuthActions();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (flow === "signIn") {
        await signIn("password", { email, password, flow: "signIn" });
      } else {
        await signUp("password", { email, password, flow: "signUp" });
      }
      router.push("/");
    } catch (err) {
      console.error("Authentication error:", err);
      setError(flow === "signIn" ? "Invalid email or password" : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
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
                <Input type="email" name="email" placeholder="Email" required />
              </div>
              <div>
                <Input type="password" name="password" placeholder="Password" required />
              </div>
              <Button
                type="submit"
                variant="gradient"
                className="w-full rounded-xl"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>{flow === "signIn" ? "Signing in..." : "Creating account..."}</span>
                  </div>
                ) : (
                  flow === "signIn" ? "Sign in" : "Sign up"
                )}
              </Button>
              <div className="text-center">
                <span className="text-muted-foreground">
                  {flow === "signIn"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>{" "}
                <span
                  className="text-primary underline hover:no-underline cursor-pointer"
                  onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
                >
                  {flow === "signIn" ? "Sign up" : "Sign in"}
                </span>
              </div>
              {error && (
                <div className="bg-destructive/20 border border-destructive/50 rounded-xl p-3">
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
