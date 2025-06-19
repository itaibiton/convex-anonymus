"use client";

import ConfessionForm from "@/components/ConfessionForm";
import ConfessionList from "@/components/ConfessionList";
import SimpleSidebar from "@/components/SimpleSidebar";

export default function Home() {

  return (
    <SimpleSidebar>
      <div className="flex flex-col min-h-screen ">
        <ConfessionForm />
        <ConfessionList />
      </div>
    </SimpleSidebar>
  );
}
