import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { HeartIcon, PlusIcon } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import type { Product } from '@/routes/wszystkie-produkty'
import { useAuth } from '@/providers/AuthProviders'
import { formatPL } from '@/lib/utils'
import { AddReviewModal } from "./AddReviewModal"

export function ProductCard({ product }: { product: Product }) {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  return (
    <>
      <Card className="w-[300px] group relative space-y-4 overflow-hidden py-0 gap-0">
        <figure className="group-hover:opacity-90">
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 end-3 rounded-full hover:bg-black hover:text-accent-foreground dark:bg-black/70 dark:hover:bg-primary transition-all duration-200"
          >
            <HeartIcon className="size-4" />
          </Button> */}
          <img
            className="aspect-square w-full object-cover"
            src={product.cover_image_url}
            width={300}
            height={500}
            alt={product.title}
          />
        </figure>
        <CardContent className="px-4 py-0 h-full">
          <div className="flex flex-col gap-2 h-full">
            <div>
              <h3 className="text-lg">
                <Link to={`/produkt/$slug`} params={{ slug: product.name }}>
                  {product.title}
                </Link>
              </h3>
            </div>
            <div className="flex flex-row items-center gap-2 justify-between mt-auto">
              <p className="text-sm text-muted-foreground">{product.author}</p>
              <p className="text-lg font-semibold">{formatPL(product.price)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0 border-t [.border-t]:pt-0 mt-auto">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="w-full h-10"
              onClick={handleOpen}
            >
              <PlusIcon className="size-4 me-1" /> Dodaj recenzję
            </Button>
          ) : (
            <Link to="/logowanie" className="w-full">
              <Button variant="ghost" className="w-full h-10">
                Zaloguj się, aby dodać recenzję
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
      <AddReviewModal open={open} onOpenChange={setOpen} product={product} />
    </>
  )
}
