import { loginApi, validateTokenApi, logoutApi } from '../api/auth.api'
import type { AuthTokens, LoginCredentials } from '../model/types'

const TOKEN_KEY = 'auth_access_token'
const REFRESH_TOKEN_KEY = 'auth_refresh_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(tokens: AuthTokens): void {
  localStorage.setItem(TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export async function login(credentials: LoginCredentials): Promise<AuthTokens> {
  const tokens = await loginApi(credentials)
  setTokens(tokens)
  return tokens
}

export async function validateToken(): Promise<boolean> {
  const token = getToken()
  if (!token) {
    return false
  }
  
  const isValid = await validateTokenApi(token)
  if (!isValid) {
    clearTokens()
  }
  return isValid
}

export async function logout(): Promise<void> {
  await logoutApi()
  clearTokens()
}

export function isAuthenticated(): boolean {
  return !!getToken()
}
