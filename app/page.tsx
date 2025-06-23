"use client";

import { TwitterFeedLayout } from "@/components/TwitterFeedLayout";
import AppLayout from "@/components/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <TwitterFeedLayout />
    </AppLayout>
  );
}
