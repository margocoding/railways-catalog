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

      const valid = await validateToken()
      if (mounted) {
        setIsValid(valid)
        setIsChecking(false)
      }
    }

    checkAuth()

    return () => {
      mounted = false
    }
  }, [])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Проверка авторизации...</p>
        </div>
      </div>
    )
  }

  if (!isValid) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}