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
}
export const Route = createFileRoute('/produkt/$slug')({
  component: ProduktPage,
  loader: async ({ params: { slug } }) => {
      try {
        const fetchedProduct = await apiRequest<Product>(
          `/api/product/${slug}`,
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
  console.log('products', product)
  return (
    <main className="w-full relative">
      <div key={product.id}>
        <h2>{product.title}</h2>
      </div>
      <article dangerouslySetInnerHTML={{ __html: product.description }} />
    </main>
  )
}
