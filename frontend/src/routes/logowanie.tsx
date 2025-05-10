import { LoginForm } from "@/components/forms/LoginForm"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logowanie')({
  component: LogowaniePage,
})

function LogowaniePage() {
  return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full flex items-center justify-center max-w-sm">
        <LoginForm />
      </div>
    </div>
}
