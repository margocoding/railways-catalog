import { useState, useEffect, useCallback } from 'react'
import { removeToken, getToken } from './auth.model'
import { authApi, type Profile } from '../api/auth.api'

export function useAuth() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const data = await authApi.getProfile()
      setProfile(data)
    } catch {
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const logout = useCallback(async () => {
    try {
      await authApi.logout?.()
    } catch {
    } finally {
      removeToken()
      setProfile(null)
    }
  }, [])

  return {
    profile,
    isLoading,
    logout,
    reloadProfile: loadProfile,
  }
}