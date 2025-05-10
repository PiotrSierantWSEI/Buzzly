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
import { Link, useNavigate } from '@tanstack/react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { apiRequest } from '@/lib/axios'
import { FieldInfo } from './FieldInfo'
import { useAuth } from '@/providers/AuthProviders'
import { LoaderAuth } from "../Loader"

export interface RegisterResponse {
  message: string
  status: number
  success: boolean
}
export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  useEffect(() => {
    let successTimeout: ReturnType<typeof setTimeout> | null = null
    let errorTimeout: ReturnType<typeof setTimeout> | null = null
    if (success) {
      successTimeout = setTimeout(() => {
        setSuccess(null)
        navigate({ to: '/logowanie', viewTransition: true })
      }, 5000)
    } else if (error) {
      errorTimeout = setTimeout(() => {
        setError(null)
      }, 10000)
    }

    return () => {
      if (successTimeout) clearTimeout(successTimeout)
      if (errorTimeout) clearTimeout(errorTimeout)
    }
  }, [success, error, navigate])

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setError(null)
      setSuccess(null)
      try {
        const response = await apiRequest<RegisterResponse>(
          '/api/auth/register',
          'POST',
          value,
        )
        setSuccess(response.message)
      } catch (err: any) {
        setError(err.response?.data?.message ?? 'Wystąpił nieznany błąd')
      }
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
            <CardTitle className="text-2xl">Rejestracja</CardTitle>
            <CardDescription>Utwórz nowe konto</CardDescription>
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
                <Label htmlFor="username">Nazwa użytkownika</Label>
                <form.Field
                  name="username"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? 'Nazwa użytkownika jest wymagana'
                        : value.length < 3
                          ? 'Minimum 3 znaki'
                          : undefined,
                  }}
                  children={(field) => (
                    <>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        disabled={form.state.isSubmitting}
                        type="text"
                        placeholder="username"
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? 'Email jest wymagany'
                        : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
                          ? 'Nieprawidłowy email'
                          : undefined,
                  }}
                  children={(field) => (
                    <>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        type="email"
                        placeholder="m@example.com"
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                        disabled={form.state.isSubmitting}
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Hasło</Label>
                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? 'Hasło jest wymagane'
                        : value.length < 6
                          ? 'Minimum 6 znaków'
                          : undefined,
                  }}
                  children={(field) => (
                    <>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        disabled={form.state.isSubmitting}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                />
              </div>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <>
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Ładowanie...' : 'Zarejestruj się'}
                    </Button>
                  </>
                )}
              />
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="success" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sukces</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="mt-4 text-center text-sm">
              Masz już konto?{' '}
              <Link to="/logowanie" className="underline underline-offset-4">
                Zaloguj się
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>)}
    </LoaderAuth>
  )
}
