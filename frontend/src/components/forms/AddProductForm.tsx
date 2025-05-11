import { useForm } from '@tanstack/react-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '../ui/input'
import { FieldInfo } from './FieldInfo'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, LoaderIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/axios'
import type { ApiError } from '@/types/ErrorAPI'

export interface AddProductResponse {
  name: string
  title: string
  author: string
  description: string
  price: number
  cover_image_url: string
}

export const AddProductForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let successTimeout: ReturnType<typeof setTimeout> | null = null
    let errorTimeout: ReturnType<typeof setTimeout> | null = null
    if (success) {
      successTimeout = setTimeout(() => {
        setSuccess(null)
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
  }, [success, error])

  const form = useForm({
    defaultValues: {
      name: '',
      title: '',
      author: '',
      description: '',
      price: '',
      cover_image_url:'',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setError(null)
      setSuccess(null)
      try {
        const response = await apiRequest<AddProductResponse>(
          '/api/product/add',
          'POST',
          value,
        )
          setSuccess(`${response.title} został dodany poprawnie`)
          form.reset()
      } catch (err: any) {
        console.error('Error', err)
        const apiErr = err.response?.data as ApiError | undefined
        setError(apiErr?.message ?? 'Nieznany błąd podczas dodawania produktu')
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className={''}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Dodaj produkt</CardTitle>
          <CardDescription>Wypełnij poniższe pola</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-1">
              <Label htmlFor="name">Nazwa (slug produktu)</Label>
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? 'Nazwa jest wymagana'
                      : value.length > 35
                        ? 'Maksymalnie 35 znaków'
                        : undefined,
                }}
                children={(field) => (
                  <>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="np. Harry Potter"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        const slug = e.target.value.replace(/\s+/g, '-')
                        field.handleChange(slug)
                      }}
                      disabled={form.state.isSubmitting || isLoading}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="title">Tytuł</Label>
              <form.Field
                name="title"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Tytuł jest wymagany' : undefined,
                }}
                children={(field) => (
                  <>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="np. Harry Potter"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={form.state.isSubmitting || isLoading}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="author">Autor</Label>
              <form.Field
                name="author"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? 'Autor jest wymagany'
                      : value.length > 35
                        ? 'Maksymalnie 35 znaków'
                        : undefined,
                }}
                children={(field) => (
                  <>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Imię i nazwisko autora"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={form.state.isSubmitting || isLoading}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="description">Opis</Label>
              <form.Field
                name="description"
                children={(field) => (
                  <>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      placeholder="Dowolny opis (opcjonalnie)"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={form.state.isSubmitting || isLoading}
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="price">Cena (PLN)</Label>
              <form.Field
                name="price"
                validators={{
                  onChange: ({ value }) => {
                    const num = parseFloat(value)
                    if (!value) return 'Cena jest wymagana'
                    if (isNaN(num)) return 'Podaj poprawną liczbę'
                    if (num <= 0) return 'Cena musi być większa od zera'
                    return undefined
                  },
                }}
                children={(field) => (
                  <>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      max={9999}
                      step="0.01"
                      placeholder="0.00"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={form.state.isSubmitting || isLoading}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="cover_image_url">URL okładki</Label>
              <form.Field
                name="cover_image_url"
                validators={{
                  onChange: ({ value }) =>
                    value && !/^https?:\/\/.+/.test(value)
                      ? 'Nieprawidłowy URL'
                      : undefined,
                }}
                children={(field) => (
                  <>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      placeholder="https://..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={form.state.isSubmitting || isLoading}
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={!canSubmit || isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    'Dodaj produkt'
                  )}
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
          {success && (
            <Alert variant="success" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>OK</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
