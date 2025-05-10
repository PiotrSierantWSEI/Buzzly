import React, { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '@/providers/AuthProviders'
import { Link, useNavigate } from '@tanstack/react-router'
import { FieldInfo } from './FieldInfo'
import { LoaderAuth } from "../Loader"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { login, isAuthenticated, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      await login(value.email, value.password)
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/', viewTransition: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <LoaderAuth>
      {!isAuthenticated && (<div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Logowanie</CardTitle>
            <CardDescription>
              Wprowadź swój adres e-mail i hasło, aby się zalogować
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="flex flex-col gap-6"
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return 'Email jest wymagany'
                      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value))
                        return 'Nieprawidłowy email'
                    },
                  }}
                >
                  {(field) => (
                    <>
                      <Input
                        id={field.name}
                        type="email"
                        placeholder="m@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                        disabled={form.state.isSubmitting || isLoading}
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                </form.Field>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Hasło</Label>
                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return 'Hasło jest wymagane'
                      if (value.length < 6) return 'Minimum 6 znaków'
                    },
                  }}
                >
                  {(field) => (
                    <>
                      <Input
                        id={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                        disabled={form.state.isSubmitting || isLoading}
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                </form.Field>
              </div>

              <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!canSubmit || isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? 'Ładowanie…' : 'Zaloguj się'}
                  </Button>
                )}
              </form.Subscribe>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Błąd</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mt-4 text-center text-sm">
              Nie masz jeszcze konta?{' '}
              <Link to="/rejestracja" className="underline underline-offset-4">
                Zarejestruj się
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>)}
    </LoaderAuth>
  )
}
