import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LoaderAdmin } from "@/components/Loader"

export const Route = createFileRoute('/_auth')({

  component: RouteComponent,
})

function RouteComponent() {

  return (
    <LoaderAdmin>
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <Outlet />
    </LoaderAdmin>
  )
}
