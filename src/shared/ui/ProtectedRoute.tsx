import { Navigate, useLocation } from 'react-router'
import { getToken } from '@/entities/auth/model/auth.model'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getToken()
  const location = useLocation()

  if (!token) {
    // Сохраняем текущий путь для редиректа после авторизации
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
