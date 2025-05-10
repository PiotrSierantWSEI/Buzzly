import { Outlet, createRootRoute } from '@tanstack/react-router'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AuthProvider } from '@/providers/AuthProviders'

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </AuthProvider>
    </>
  ),
})
