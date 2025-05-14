import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-lg overflow-hidden max-w-[400px]">
            <Skeleton className="w-full aspect-[3/4]" />
          </div>
        </div>

        <div className="lg:col-span-8">
          <Skeleton className="h-8 md:h-9 lg:h-10 w-full max-w-[600px] mb-2" />
          <div className="flex items-center gap-2 my-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-4 h-4 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mb-6">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex gap-3 mb-8">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
}
