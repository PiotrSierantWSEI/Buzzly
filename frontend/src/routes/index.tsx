import { createFileRoute } from '@tanstack/react-router'
// import { useAuth } from '@/providers/AuthProviders'
import HeroSection from "@/components/Hero"
import Search from "@/components/Search"
import Feature from "@/components/Feature"
import Promo from "@/components/Promo"

export const Route = createFileRoute('/')({
  component: App,
  
})

function App() {
  // const { user, logout } = useAuth()

  // const UserComponent = () => {
  //   if (!user) return <div className="text-lg">Nie jesteś zalogowany</div>
  //   const { username, email, id } = user

  //   return (
  //     <div className="text-lg">
  //       <p>Zalogowany jako: {username}</p>
  //       <p>Email: {email}</p>
  //       <p>ID: {id}</p>
  //       <button onClick={() => logout()}>Wyloguj</button>
  //     </div>
  //   )
  // }

  return (
    <>
      <HeroSection />
      <Search />
      <Feature />
      <Promo />
    </>
  )
}
