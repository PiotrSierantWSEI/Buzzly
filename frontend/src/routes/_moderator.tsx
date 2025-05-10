import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LoaderModerator } from "@/components/Loader"

export const Route = createFileRoute('/_moderator')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <LoaderModerator>
      <h1>Moderation Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <Outlet />
    </LoaderModerator>
  )
}