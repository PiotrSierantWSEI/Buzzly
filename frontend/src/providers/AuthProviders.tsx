import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest } from '@/lib/axios'
import type { ApiError } from "@/types/ErrorAPI"
import { onLogoutEvent } from "@/lib/logout-emitter"
import { useNavigate } from '@tanstack/react-router'

/**
 * Typ użytkownika.
 */
export interface User {
  id: string
  username: string
  email: string
  role: string
}

export interface UserResponse {
  user: User
}

/**
 * Stan autoryzacji
 */
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

/**
 * Interfejs kontekstu zawiera stan i akcje
 */
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

/**
 * Początkowy stan
 */
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialState.user)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState.isAuthenticated)
  const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading)
  const [error, setError] = useState<string | null>(initialState.error)

  const navigate = useNavigate()

  useEffect(() => {
    const off = onLogoutEvent(async () => {
      await logout()
    })
    return () => off()
  }, [])

  const getUser = async () => {
    setIsLoading(true)
    try {
      const fetchedUser = await apiRequest<User>('/api/user', 'GET')
      setUser(fetchedUser)
      setIsAuthenticated(true)
    } catch (err: any) {
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const loggedInUser = await apiRequest<UserResponse>('/api/auth/login', 'POST', { email, password })
      setUser(loggedInUser.user)
      setIsAuthenticated(true)
    } catch (err: any) {
      const apiErr = err.response?.data as ApiError | undefined
      setError(apiErr?.message ?? 'Nieznany błąd podczas logowania')
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await apiRequest<void>('/api/auth/logout', 'POST')
    } catch {
      // ignoruj błędy logoutu
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      setIsLoading(false)
      setError(null)
      navigate({ to: '/logowanie', viewTransition: true })
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
