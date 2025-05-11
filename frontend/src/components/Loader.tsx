import { useAuth } from '@/providers/AuthProviders'
import { useNavigate } from '@tanstack/react-router'
import { LoaderIcon } from 'lucide-react'

export const LoaderAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const pathname = window.location.pathname
  const isLoginOrRegister = pathname === '/logowanie' || pathname === '/rejestracja'
  
  if (isLoading && !isLoginOrRegister) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated && !isLoading && !isLoginOrRegister) {
    navigate({ to: '/logowanie', viewTransition: true })
    return null
  }

  return <>{children}</>
}

export const LoaderModerator = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated && !isLoading) {
    navigate({ to: '/logowanie', viewTransition: true })
    return null
  }

  if (user) {
    if (user && user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
      navigate({ to: '/', viewTransition: true })
      return null
    }
  }

  return <>{children}</>
}


export const LoaderAdmin = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated && !isLoading) {
    navigate({ to: '/logowanie', viewTransition: true })
    return null
  }

  if (user) {
    if (user.role !== 'ADMIN') {
      navigate({ to: '/', viewTransition: true })
      return null
    }
  }

  return <>{children}</>
}