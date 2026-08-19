import { useState, useEffect } from 'react'
import { login, validateToken, logout, getToken } from '../model/auth.model'
import type { LoginCredentials } from '../model/types'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Проверка токена при монтировании
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      if (token) {
        try {
          const isValid = await validateToken()
          setIsAuthenticated(isValid)
        } catch {
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setError(null)
      await login(credentials)
      setIsAuthenticated(true)
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка входа'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const handleLogout = async () => {
    await logout()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
  }
}
