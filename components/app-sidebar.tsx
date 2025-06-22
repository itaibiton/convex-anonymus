"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useConvexAuth } from "convex/react"
import { useAuthActions } from "@convex-dev/auth/react"
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
  LogIn,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Create", href: "/create", icon: PenTool },
  { name: "Liked", href: "/liked", icon: Heart },
  { name: "Comments", href: "/comments", icon: MessageCircle },
  { name: "Reposts", href: "/reposts", icon: Repeat2 },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth()
  const { signOut } = useAuthActions()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => handleNavigation("/")}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <MessageCircle className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Confession Wall</span>
                <span className="truncate text-xs">Anonymous sharing</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {!mounted || authLoading ? (
                // Show skeleton while auth is loading
                <>
                  {[1, 2, 3].map((i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                  ))}
                </>
              ) : (
                <>
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    const isProtected = item.href !== "/"
                    const shouldShow = !isProtected || isAuthenticated
                    
                    if (!shouldShow) return null
                    
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          tooltip={item.name}
                          isActive={isActive}
                          onClick={() => handleNavigation(item.href)}
                        >
                          <item.icon />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                  
                  {!isAuthenticated && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip="Sign In"
                        onClick={() => handleNavigation("/signin")}
                      >
                        <LogIn />
                        <span>Sign In</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={!mounted ? "Theme" : theme === "dark" ? "Light Mode" : "Dark Mode"}
              onClick={toggleTheme}
            >
              {!mounted ? (
                <Sun />
              ) : theme === "dark" ? (
                <Sun />
              ) : (
                <Moon />
              )}
              <span>
                {!mounted ? "Theme" : theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {mounted && !authLoading && isAuthenticated && (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                      <User className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Anonymous User</span>
                      <span className="truncate text-xs">Authenticated</span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="right"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
                    <User />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation("/settings")}>
                    <Settings />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
