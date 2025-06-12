import ProdductOverview from "@/components/ProductOverview"
import { ProductSkeleton } from "@/components/skeletons/product-skeleton"
import { apiRequest } from "@/lib/axios"
import { createFileRoute, notFound } from '@tanstack/react-router'

export interface Product {
  id: number
  name: string
  title: string
  description: string
  author: string
  price: number
  cover_image_url: string
  created_at: string
  reviews_count?: number
}
export const Route = createFileRoute('/produkt/$slug')({
  component: ProduktPage,
  pendingComponent: () => <ProductSkeleton />,
  loader: async ({ params: { slug } }) => {
      try {
        const fetchedProduct = await apiRequest<Product>(
          `/api/product/${slug}?includeReviewCount=true`,
          'GET',
        )

        if (!fetchedProduct) {
          return notFound()
        }

        return fetchedProduct
      } catch (err: any) {
        console.error(`Error fetching product with id ${slug}:`, err)
        throw err
      }
    },
})

function ProduktPage() {
  const product: Product = Route.useLoaderData()
  return (
    <main className="w-full relative">
      <ProdductOverview product={product} />
    </main>
  )
}
