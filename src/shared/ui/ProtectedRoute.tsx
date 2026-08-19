import { Navigate, useLocation } from 'react-router'
import { getToken, validateToken } from '@/entities/auth/model/auth.model'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let mounted = true

    async function checkAuth() {
      const token = getToken()
      if (!token) {
        if (mounted) {
          setIsValid(false)
          setIsChecking(false)
        }
        return
      }

      try {
        const valid = await validateToken()
        if (mounted) {
          setIsValid(valid)
          setIsChecking(false)
        }
      } catch {
        if (mounted) {
          setIsValid(false)
          setIsChecking(false)
        }
      }
    }

    checkAuth()

    return () => {
      mounted = false
    }
  }, [])

  if (isChecking) {
    return null // или можно показать лоадер
  }

  if (!isValid) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
