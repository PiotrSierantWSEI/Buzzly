import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LoaderModerator } from '@/components/Loader'

export const Route = createFileRoute('/_moderator')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <LoaderModerator>
      <section className="flex flex-col p-4 md:pl-8">
        <Outlet />
      </section>
    </LoaderModerator>
  )
}
