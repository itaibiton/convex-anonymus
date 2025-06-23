"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppLayout({ children, title = "Confession Wall" }: AppLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="relative h-full container mx-auto w-full lg:max-w-none xl:max-w-7xl bg-background">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="h-screen flex flex-col">
            {/* <header className="flex h-16 shrink-0 items-center gap-2 px-4 twitter-border border-b bg-background">
              <SidebarTrigger className="-ml-1 text-foreground" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground text-lg">{title}</span>
              </div>
            </header> */}
            <div className="flex-1 overflow-hidden bg-background">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}