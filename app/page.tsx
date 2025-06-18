"use client";

import Navbar from "@/components/Navbar";
import ConfessionForm from "@/components/ConfessionForm";
import ConfessionList from "@/components/ConfessionList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-purple-900 dark:via-pink-900 dark:to-indigo-900">
      <Navbar />
      <main className="px-4 py-8 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Share Your Truth
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A safe space to share your thoughts anonymously. Your confessions are completely private and secure.
          </p>
        </div>
        
        <ConfessionForm />
        <ConfessionList />
      </main>
    </div>
  );
}
