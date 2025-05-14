'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { apiRequest } from '@/lib/axios'
import type { Product } from '@/routes/wszystkie-produkty'
import { Alert,AlertDescription, AlertTitle } from "./ui/alert"

export default function Promo() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
    setLoading(true)
    apiRequest<Product[]>("/api/products?limit=4", "GET")
      .then((data) => {
        setProducts(data)
      })
      .catch((err: any) => {
        console.error(err)
        setError(err.message ?? "Nie udało się pobrać danych")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const IsLoadingComponent = () => (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-64 w-full rounded bg-gray-200 animate-pulse"
        />
      ))}
    </>
  )

  const ErrorComponent = () => (
    <div className="col-span-12 flex flex-col items-center justify-center h-full mx-auto w-full">
      <Alert variant={"destructive"} className="w-full max-w-md">
        <AlertTitle className="text-sm font-medium">
          Coś poszło nie tak
        </AlertTitle>
        <AlertDescription className="mt-2 text-sm">
          Nie udało się pobrać produktów. Spróbuj ponownie później.
        </AlertDescription>
      </Alert>
    </div>
  )

  return (
    <div id="top-hero" className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Aktualnie popularne
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Top produkty według ocen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Te produkty zachwyciły klientów najwyższymi średnimi ocenami.
            Sprawdź, co użytkownicy pokochali najbardziej!
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {!!loading && <IsLoadingComponent />}
          {!!error && <ErrorComponent />}
          {!error && !loading && products.length !== 0 ? (
            <>
              {products.map((p) => (
                <Link
                  key={p.id}
                  to={`/produkt/$slug`}
                  params={{ slug: p.name }}
                  className="group relative block overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
                >
                  <img
                    src={p.cover_image_url}
                    alt={p.title}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-sm font-medium text-white">{p.title}</p>
                    <p className="text-xs text-white/80">{p.price}</p>
                  </div>
                </Link>
              ))}
            </>
          ) : null}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="." hash="#">
              Zobacz wszystkie recenzje
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
