import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LoaderAdmin } from '@/components/Loader'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <LoaderAdmin>
      <section className="flex flex-col p-4 md:pl-8">
        <Outlet />
      </section>
    </LoaderAdmin>
  )
}
