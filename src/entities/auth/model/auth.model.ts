import { authApi } from "../api/auth.api"

const TOKEN_KEY = 'admin_access_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export async function validateToken(): Promise<boolean> {
  const token = getToken()
  if (!token) return false

  try {
    await authApi.getProfile()
    return true
  } catch {
    removeToken()
    return false
  }
}