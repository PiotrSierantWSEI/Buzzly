import { Outlet, createRootRoute } from '@tanstack/react-router'

import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AuthProvider } from '@/providers/AuthProviders'
import { ThemeProvider } from "@/providers/ThemeProvider"
import { ModeToggle } from "@/components/ModeToggle"

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full relative">
              <ModeToggle />
              <SidebarTrigger />
              <Outlet />
            </main>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  ),
})
