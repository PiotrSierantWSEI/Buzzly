import { Button } from '@/components/ui/button'
import { AlertCircle, LoaderIcon, Star } from 'lucide-react'
import { useProductReviews } from '@/hooks/useProductReviews'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Alert, AlertTitle, AlertDescription } from './ui/alert'

export function ProductReviews({ productId }: { productId: number }) {
  const { reviews, loading, error, hasMore, loadMore } = useProductReviews(
    productId,
    5,
  )

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Błąd</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-8 last-of-type:border-b-0">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex-shrink-0 border mt-1 relative flex items-center justify-center">
              <Avatar>
                <AvatarImage src="" alt="user avatar" />
                <AvatarFallback>BU</AvatarFallback>
              </Avatar>
              <div className="h-2.5 w-2.5 ring-[2px] ring-background rounded-full bg-green-500 absolute bottom-0 right-0"></div>
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <div className="flex flex-row items-center gap-2">
                  <p className="font-medium">
                    {review.authorName || 'Anonimowy'}{' '}
                    {review.authorSurname || ''}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={
                          'w-4 h-4 ' +
                          (i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300')
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('pl-PL')}
                </p>
              </div>
              <p className="mb-2 text-base">{review.content}</p>
            </div>
          </div>
        </div>
      ))}
      {hasMore && (
        <Button
          variant="ghost"
          className="text-gray-500 flex items-center gap-2 mx-auto"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? (
            <LoaderIcon className="animate-spin h-4 w-4" />
          ) : (
            'Załaduj więcej recenzji'
          )}
        </Button>
      )}
      {reviews.length === 0 && !loading && (
        <div className="text-gray-500 text-center">
          Brak recenzji dla tego produktu.
        </div>
      )}
    </div>
  )
}
