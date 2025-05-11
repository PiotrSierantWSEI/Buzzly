import { AddProductForm } from "@/components/forms/AddProductForm"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dodaj-produkt')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AddProductForm />
}
