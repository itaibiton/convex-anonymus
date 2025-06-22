"use client";

import ConfessionForm from "@/components/ConfessionForm";
import ConfessionList from "@/components/ConfessionList";
import AppLayout from "@/components/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen">
        <ConfessionForm />
        <ConfessionList />
      </div>
    </AppLayout>
  );
}
