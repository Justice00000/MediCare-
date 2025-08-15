import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar, FileText, Home, Settings, Stethoscope, LogOut } from "lucide-react"

export function AppSidebar() {
  const location = useLocation()
  const { state } = useSidebar()
  const { profile, signOut } = useAuth()

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (profile?.role === 'medical_practitioner') {
      return [
        {
          title: "Dashboard",
          url: "/medical-dashboard",
          icon: Home,
        },
        {
          title: "Emergency Requests",
          url: "/emergency-requests",
          icon: Stethoscope,
        },
        {
          title: "Patient Records",
          url: "/records",
          icon: FileText,
        },
        {
          title: "Appointments",
          url: "/appointments",
          icon: Calendar,
        },
        {
          title: "Health Library",
          url: "/health-library",
          icon: FileText,
        },
        {
          title: "Billing",
          url: "/billing",
          icon: Settings,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ];
    } else {
      return [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
        },
        {
          title: "Medical Records",
          url: "/records",
          icon: FileText,
        },
        {
          title: "Appointments",
          url: "/appointments",
          icon: Calendar,
        },
        {
          title: "Vitals Box",
          url: "/vitals-box",
          icon: Stethoscope,
        },
        {
          title: "Health Library",
          url: "/health-library",
          icon: FileText,
        },
        {
          title: "Billing",
          url: "/billing",
          icon: Settings,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ];
    }
  };

  const items = getNavigationItems()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-2">
        <div className={cn("text-lg font-semibold tracking-tight", state === "collapsed" && "sr-only")}>Medicare</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <NavLink to={item.url} end className={({ isActive }) => (isActive ? "font-medium" : undefined)}>
                        <Icon className="mr-2" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="p-3 space-y-2">
          <div className={cn("text-sm", state === "collapsed" && "sr-only")}>
            <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
            <p className="text-muted-foreground capitalize">{profile?.role?.replace('_', ' ')}</p>
          </div>
          <SidebarMenuButton 
            asChild
            tooltip="Sign Out"
            onClick={signOut}
          >
            <Button variant="outline" size="sm" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              {state !== "collapsed" && "Sign Out"}
            </Button>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-svh">
        <AppSidebar />
        <SidebarInset>
          <header className="h-14 border-b flex items-center gap-3 px-3">
            <SidebarTrigger />
            <h1 className="text-base font-semibold">Dashboard</h1>
          </header>
          <main className="p-4 md:p-6 space-y-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
