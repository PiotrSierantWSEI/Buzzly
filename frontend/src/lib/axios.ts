// src/lib/api.ts
import axios, { type AxiosResponse }  from 'axios'
import Cookies from 'js-cookie'
import { triggerLogoutEvent } from "./logout-emitter"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5166/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status
    const url = error.config?.url ?? ''

    // Jeżeli to 401 z loginu — przekaż błąd dalej do komponentu logowania
    if (status === 401 && url.endsWith('/api/auth/login')) {
      return Promise.reject(error)
    }

    // Jeżeli to 401 z wywołania logout — wyczyść cookie/stan, ale nie wywołuj logout() ponownie
    if (status === 401 && url.endsWith('/api/auth/logout')) {
      Cookies.remove('jwt')
      return Promise.reject(error)
    }

    // Jeżeli to 401 z get user — przekaż błąd dalej do komponentu logowania
    if (status === 401 && url.endsWith('/api/user')) {
      return Promise.reject(error)
    }

    // Dla wszystkich pozostałych 401 — robić pełny logout + redirect
    if (status === 401) {
      triggerLogoutEvent()
      Cookies.remove('jwt')
      if (window.location.pathname !== '/logowanie') {
        window.location.href = '/logowanie'
      }
    }

    return Promise.reject(error)
  },
)

// Define a generic API function
export const apiRequest = async <T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<T> => {
  const response: AxiosResponse<T> = await api({
    method,
    url,
    data,
  });

  return response.data;
};

