import { apiRequest } from "@/lib/axios"
import { useState, useCallback, useEffect } from "react"

export interface Review {
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
  
  export interface PagedReviewsResponse {
    reviews: Review[]
    totalCount: number
}

export function useProductReviews(productId: number, take: number = 3) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    resetAndFetch()
  }, [productId])

  const loadMore = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiRequest<PagedReviewsResponse>(
        `/api/reviews/${productId}?skip=${skip}&take=${take}`,
        'GET'
      )
      setReviews((prev) => [...prev, ...res.reviews])
      setTotalCount(res.totalCount)
      setSkip((prev) => prev + res.reviews.length)
    } catch (err) {
      setError("Nie udało się pobrać recenzji.")
    } finally {
      setLoading(false)
    }
  }, [productId, skip, take])

  const resetAndFetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    setReviews([])
    setSkip(0)
    try {
      const res = await apiRequest<PagedReviewsResponse>(
        `/api/reviews/${productId}?skip=${skip}&take=${take}`,
        'GET'
      )
      setReviews(res.reviews)
      setTotalCount(res.totalCount)
      setSkip(res.reviews.length)
    } catch (err) {
      setError("Nie udało się pobrać recenzji.")
    } finally {
      setLoading(false)
    }
  }, [productId, take])

  return {
    reviews,
    totalCount,
    loading,
    error,
    hasMore: reviews.length < totalCount,
    loadMore,
    refresh: resetAndFetch,
  }
}
