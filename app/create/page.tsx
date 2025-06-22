"use client";

import AppLayout from "@/components/AppLayout";
import ConfessionForm from "@/components/ConfessionForm";

export default function CreatePage() {
  return (
    <AppLayout title="Create Confession">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Share Your Confession
          </h1>
          <p className="text-muted-foreground">
            Express yourself anonymously in a safe space
          </p>
        </div>
        
        <ConfessionForm />
      </div>
    </AppLayout>
  );
}