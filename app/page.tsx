"use client";

import ConfessionForm from "@/components/ConfessionForm";
import ConfessionList from "@/components/ConfessionList";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Home() {

  return (
    <div className="bg-background">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      {/* Content */}
      <div>
        <main className="px-4 py-16 space-y-16">
          <div className="text-center space-y-8">
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
                Confession Wall
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Share Your <span className="text-primary">Truth</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A safe space to share your thoughts anonymously. Your confessions are completely private and secure.
            </p>
          </div>

          <div id="confessions" className="space-y-16">
            <ConfessionForm />
            <ConfessionList />
          </div>
        </main>
      </div>
    </div>
  );
}
