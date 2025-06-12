import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import type { Product } from '@/routes/produkt.$slug'
import { useAuth } from '@/providers/AuthProviders'
import { Link } from '@tanstack/react-router'
import { ProductReviews } from './ProductReviews'
import { AddReviewModal } from './AddReviewModal'
import { useState } from 'react'

export default function ProdductOverview({ product }: { product: Product }) {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden max-w-[400px]">
              <img
                src={product.cover_image_url}
                alt={`Okładka produktu - ${product.title}`}
                width={500}
                height={600}
                className="w-full h-auto object-cover aspect-[3/4]"
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 my-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm">
                {product.reviews_count ?? 0} Recenzji
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">{product.price} zł</span>
            </div>

            <div className="flex gap-3 mb-8">
              {isAuthenticated ? (
                <Button onClick={handleOpen}>Dodaj recenzję</Button>
              ) : (
                <Link to="/logowanie">
                  <Button>Zaloguj się, aby dodać recenzję</Button>
                </Link>
              )}
              {/* <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button> */}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
              <TabsTrigger
                value="description"
                className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px] rounded-t"
              >
                Opis produktu
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px] rounded-t"
              >
                Recenzje
                <Badge variant="default" className="ml-2 text-xs">
                  {product.reviews_count ?? 0}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-4">
              <article
                className="prose dark:prose-invert prose-gray prose-sm md:prose-base prose-p:mb-0 prose-p:mt-0 max-w-full text-pretty"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <ProductReviews productId={product.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <AddReviewModal open={open} onOpenChange={setOpen} product={product} />
    </>
  )
}
