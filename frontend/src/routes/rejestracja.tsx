import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from "@/components/forms/RegisterForm"

export const Route = createFileRoute('/rejestracja')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full flex items-center justify-center max-w-sm">
          <RegisterForm />
        </div>
      </div>
}
