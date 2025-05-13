import { ProductCard } from "./ProductCard"

export default function CardsGrid() {
  return (
    <div className="flex flex-row flex-wrap gap-8 p-8">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}