import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <Card className={`w-[300px] group relative space-y-4 overflow-hidden py-0 gap-0 ${className}`}>
      <div className="aspect-square w-full bg-muted animate-pulse" />
      <CardContent className="px-4 py-0 space-y-2">
        <div className="h-6 w-2/3 bg-muted rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
      </CardContent>
      <CardFooter className="p-0 border-t [.border-t]:pt-0">
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  )
}
