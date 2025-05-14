import { createFileRoute } from '@tanstack/react-router'
import HeroSection from "@/components/Hero"
import Search from "@/components/Search"
import Feature from "@/components/Feature"
import Promo from "@/components/Promo"

export const Route = createFileRoute('/')({
  component: App,
  
})

function App() {
  return (
    <>
      <HeroSection />
      <Search />
      <Feature />
      <Promo />
    </>
  )
}
