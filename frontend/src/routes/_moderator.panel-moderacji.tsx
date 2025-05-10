import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_moderator/panel-moderacji')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_moderator/panel-moderacji"!</div>
}
