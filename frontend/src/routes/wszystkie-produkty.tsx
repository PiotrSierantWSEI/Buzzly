import { createFileRoute } from '@tanstack/react-router'
import { apiRequest } from '@/lib/axios'
import { SkeletonCard } from '@/components/skeletons/skeleton-card'
import { ProductCard } from '@/components/ProductCard'

export interface Product {
  id: number
  name: string
  title: string
  author: string
  price: number
  cover_image_url: string
  created_at: string
}

export const Route = createFileRoute('/wszystkie-produkty')({
  component: WszystkieProduktyPage,
  pendingComponent: () => (
    <div className="flex flex-row flex-wrap gap-8 p-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  ),
  loader: async () => {
    try {
      const fetchedProducts = await apiRequest<Array<Product>>(
        '/api/products',
        'GET',
      )
      return fetchedProducts
    } catch (err: any) {
      console.error('Error fetching products:', err)
      throw err
    }
  },
})

function WszystkieProduktyPage() {
  const products: Array<Product> = Route.useLoaderData()
  return (
    <div className="flex flex-row flex-wrap gap-8 p-8">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
