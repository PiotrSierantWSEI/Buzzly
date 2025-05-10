import { createFileRoute } from '@tanstack/react-router'
import type { PostType } from './produkt.$produktId'

export const Route = createFileRoute('/wszystkie-produkty')({
  component: WszystkieProduktyPage,
  loader: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!res.ok) {
      throw new Error('Failed to fetch posts')
    }

    const products = (await res.json()) as Array<PostType>

    return products
  },
})

function WszystkieProduktyPage() {
  const products: Array<PostType> = Route.useLoaderData()
  return (
    <div>
      wszystkie-produkty
      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.body}</p>
        </div>
      ))}
    </div>
  )
}
