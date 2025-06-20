"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { cn } from "@/lib/utils";
import {
  Home,
  PenTool,
  Heart,
  MessageCircle,
  Repeat2,
  User,
  Settings,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Create", href: "/create", icon: PenTool },
  { name: "Liked", href: "/liked", icon: Heart },
  { name: "Comments", href: "/comments", icon: MessageCircle },
  { name: "Reposts", href: "/reposts", icon: Repeat2 },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SimpleSidebarProps {
  children: React.ReactNode;
}

export default function SimpleSidebar({ children }: SimpleSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const { signOut } = useAuthActions();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <MessageCircle className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Confession Wall</span>
            <span className="text-xs text-muted-foreground">Anonymous sharing</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1 rounded-md hover:bg-accent"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {!mounted || authLoading ? (
          // Show skeleton while auth is loading
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-10 bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const isProtected = item.href !== "/";
              const shouldShow = !isProtected || isAuthenticated;
              
              if (!shouldShow) return null;
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
            
            {!isAuthenticated && (
              <button
                onClick={() => handleNavigation("/signin")}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
              >
                <User className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
        >
          {!mounted ? (
            <Sun className="h-5 w-5 shrink-0" />
          ) : theme === "dark" ? (
            <Sun className="h-5 w-5 shrink-0" />
          ) : (
            <Moon className="h-5 w-5 shrink-0" />
          )}
          <span className="text-sm font-medium">
            {!mounted ? "Theme" : theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {mounted && !authLoading && isAuthenticated && (
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground text-muted-foreground transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border">
          {sidebarContent}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-foreground lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-foreground">
            Confession Wall
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:hidden">
            {sidebarContent}
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="py-4">
          <div className="">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}