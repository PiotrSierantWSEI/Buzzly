import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import type { Product } from "@/routes/produkt.$slug"

export default function ProdductOverview({ product }: { product: Product }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Main Product img */}
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
        {/* Product Details */}
        <div className="lg:col-span-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 my-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600">157 Reviews</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">{product.price} zł</span>
          </div>

          <div className="flex gap-3 mb-8">
            <Button>Dodaj opinię</Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
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
              Opinie
              <Badge className="ml-1 bg-gray-200 text-gray-700 font-normal text-xs">157</Badge>
            </TabsTrigger>
        </TabsList>   

          <TabsContent value="description" className="p-4">
            <article className="prose dark:prose-invert prose-gray prose-sm md:prose-base prose-p:mb-0 prose-p:mt-0 max-w-full text-pretty" dangerouslySetInnerHTML={{ __html: product.description }} />
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-8">
              {/* Review 1 */}
              <div className="border-b pb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Reviewer"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mb-2 text-gray-700">
                      You made it so simple. My new site is so much faster and easier to work with than my old site. I
                      just choose the page, make the changes.
                    </p>
                    <div>
                      <p className="font-medium">Kristin Watson</p>
                      <p className="text-sm text-gray-500">March 14, 2021</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="border-b pb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Reviewer"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mb-2 text-gray-700">
                      You made it so simple. My new site is so much faster and easier to work with than my old site. I
                      just choose the page, make the changes.
                    </p>
                    <div>
                      <p className="font-medium">Jenny Wilson</p>
                      <p className="text-sm text-gray-500">January 28, 2021</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="border-b pb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Reviewer"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex mb-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <p className="mb-2 text-gray-700">
                      You made it so simple. My new site is so much faster and easier to work with than my old site. I
                      just choose the page, make the changes.
                    </p>
                    <div>
                      <p className="font-medium">Bessie Cooper</p>
                      <p className="text-sm text-gray-500">January 11, 2021</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="ghost" className="text-gray-500 flex items-center gap-2 mx-auto">
                <span>LOAD MORE REVIEWS</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}