'use client'

import { useForm } from '@tanstack/react-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, LoaderIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/axios'
import type { ApiError } from '@/types/ErrorAPI'
import { FieldInfo } from './FieldInfo'
import type { Product } from '@/routes/wszystkie-produkty'
import { useAuth } from '@/providers/AuthProviders'
import { Rating } from '../ui/rating'

export interface CreateReviewResponse {
  id: number
  productId: number
  userId?: number
  authorName?: string
  authorSurname?: string
  rating: number
  content: string
  images?: string[]
  status: string
  createdAt: string
  updatedAt?: string
  moderatedBy?: number
  moderatedAt?: string
}

export const AddReviewForm = ({ product, onOpenChange }: { product: Product, onOpenChange: (open: boolean) => void }) => {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    let successTimeout: ReturnType<typeof setTimeout> | null = null
    let errorTimeout: ReturnType<typeof setTimeout> | null = null
    if (success) {
      successTimeout = setTimeout(() => {
        setSuccess(null)
        onOpenChange(false)
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
      productId: product.id,
      userId: user?.id || undefined,
      authorName: 'Piotr',
      authorSurname: 'Sierant',
      rating: 5,
      content:
        'Już po pierwszym tygodniu stosowania diety zauważyłem znaczną poprawę trawienia i redukcję wzdęć. Przepisy są proste, składniki łatwo dostępne, a efekty czysto zaskakujące – mam więcej energii i czuję się lekko.',
      imagesCsv: '',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setError(null)
      setSuccess(null)
      try {
        const payload = { 
          productId: value.productId,
          userId: value.userId || undefined,
          authorName: value.authorName || undefined,
          authorSurname: value.authorSurname || undefined,
          rating: value.rating,
          content: value.content,
          images: value.imagesCsv
            ? value.imagesCsv.split(',').map((u: string) => u.trim())
            : undefined,
        }
        await apiRequest<CreateReviewResponse>(
          '/api/review',
          'POST',
          payload,
        )
        setSuccess(`Recenzja utworzona pomyślnie`)
        form.reset()
      } catch (err: any) {
        console.error(err)
        const apiErr = err.response?.data as ApiError | undefined
        setError(apiErr?.message ?? 'Nieznany błąd podczas dodawania recenzji')
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-col gap-4"
      >
        <div className="grid gap-1">
          <Label htmlFor="rating">Ocena (1–5)</Label>
          <form.Field
            name="rating"
            validators={{
              onChange: ({ value }) => {
                const num = Number(value)
                if (!value) return 'Ocena jest wymagana'
                if (isNaN(num) || num < 1 || num > 5)
                  return 'Podaj liczbę od 1 do 5'
              },
            }}
            children={(field) => (
              <>
                <Rating
                  rating={field.state.value}
                  totalStars={5}
                  size={24}
                  variant="yellow"
                  showText={false}
                  disabled={false}
                  onRatingChange={(number) => field.handleChange(number)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="content">Treść recenzji</Label>
          <form.Field
            name="content"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Treść recenzji jest wymagana' : undefined,
            }}
            children={(field) => (
              <>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  placeholder="Twoja opinia..."
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

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="authorName">Imię autora</Label>
            <form.Field
              name="authorName"
              validators={{
                onChange: ({ value }) =>
                  value && value.length > 35 ? 'Max. 35 znaków' : undefined,
              }}
              children={(field) => (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Jan"
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
          <div className="grid gap-2">
            <Label htmlFor="authorSurname">Nazwisko autora</Label>
            <form.Field
              name="authorSurname"
              validators={{
                onChange: ({ value }) =>
                  value && value.length > 35 ? 'Max. 35 znaków' : undefined,
              }}
              children={(field) => (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Kowalski"
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
        </div>

        {/* Images CSV */}
        <div className="grid gap-2">
          <Label htmlFor="imagesCsv">
            Zdjęcia (URL, oddzielone przecinkami)
          </Label>
          <form.Field
            name="imagesCsv"
            validators={{
              onChange: ({ value }) => {
                if (!value) return undefined
                const urls = value.split(',')
                for (const u of urls) {
                  if (!/^https?:\/\/.+/.test(u.trim()))
                    return 'Każdy URL musi zaczynać się od http:// lub https://'
                }
              },
            }}
            children={(field) => (
              <>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={2}
                  placeholder="https://... , https://..."
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

        {/* Submit */}
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={!canSubmit || isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <LoaderIcon className="animate-spin h-4 w-4" />
              ) : (
                'Dodaj recenzję'
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
    </>
  )
}
