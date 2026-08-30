import { authApi, type Profile } from '@/entities/auth'
import { useState, useEffect, useCallback } from 'react'

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProfile = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await authApi.getProfile()
      setProfile(data)
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки профиля')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  return {
    profile,
    isLoading,
    error,
    reload: loadProfile,
  }
}