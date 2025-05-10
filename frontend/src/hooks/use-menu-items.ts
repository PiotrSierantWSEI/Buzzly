import { useMemo } from 'react'
import { Home, Inbox, Plus, Settings, Shield, UserPlus } from 'lucide-react'
import { useAuth } from "@/providers/AuthProviders"

type groupType = 'main' | 'auth' | 'admin' | 'moderacja'

export interface MenuItem {
  title: string
  url: string
  icon: React.ComponentType<any>
  group: groupType
}

export function useMenuItems(): MenuItem[] {
  const { isAuthenticated, user } = useAuth()

  return useMemo<MenuItem[]>(() => {
    const base: MenuItem[] = [
      { title: 'Strona główna',      url: '/',                   icon: Home, group: 'main' },
      { title: 'Wszystkie produkty', url: '/wszystkie-produkty', icon: Inbox, group: 'main' },
    ]

    if (!isAuthenticated) {
      // Dla gościa: dodaj rejestrację i logowanie
      return [
        ...base,
        { title: 'Logowanie', url: '/logowanie', icon: UserPlus, group: 'auth' },
        { title: 'Rejestracja', url: '/rejestracja', icon: UserPlus, group: 'auth' },
      ]
    }

    // Dla zalogowanego użytkownika
    const authItems: MenuItem[] = [ ...base ]

    // Jeżeli moderator lub admin, dorzuć panel moderacji
    if (user?.role === 'MODERATOR' || user?.role === 'ADMIN') {
      authItems.push({
        title: 'Panel moderacji',
        url: '/panel-moderacji',
        icon: Shield,
        group: 'moderacja',
      })
    }

    // Jeżeli admin, dorzuć panel admina
    if (user?.role === 'ADMIN') {
      authItems.push({
        title: 'Admin panel',
        url: '/admin',
        icon: Settings,
        group: 'admin',
      })

      authItems.push({
        title: 'Dodaj produkt',
        url: '/dodaj-produkt',
        icon: Plus,
        group: 'admin',
      })
    }

    return authItems
  }, [isAuthenticated, user])
}