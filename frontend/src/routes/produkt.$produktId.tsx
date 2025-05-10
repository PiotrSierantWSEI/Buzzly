import { createFileRoute, notFound } from '@tanstack/react-router'

export type PostType = {
  id: string
  title: string
  body: string
}
export const Route = createFileRoute('/produkt/$produktId')({
  component: ProduktPage,
  loader: async ({ params: { produktId } }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${produktId}`,
    )
    if (!res.ok) {
      if (res.status === 404) {
        throw notFound()
      }
    
      throw new Error('Failed to fetch post')
    }
    
    const post = (await res.json()) as PostType
    
    return post
  }
})

function ProduktPage() {
  const product = Route.useLoaderData()
  console.log('products', product)
  return (
    <div>
      PRODUKT:
      <div key={product.id}>
        <h2>{product.title}</h2>
        <p>{product.body}</p>
      </div>
    </div>
  )
}
