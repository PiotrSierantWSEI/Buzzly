import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/providers/AuthProviders'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { user, logout } = useAuth()

  const UserComponent = () => {
    if (!user) return <div className="text-lg">Nie jesteś zalogowany</div>
    const { username, email, id } = user

    return (
      <div className="text-lg">
        <p>Zalogowany jako: {username}</p>
        <p>Email: {email}</p>
        <p>ID: {id}</p>
        <button onClick={() => logout()}>Wyloguj</button>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Strona główna</h1>
      <UserComponent />
    </div>
  )
}
