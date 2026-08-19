export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface User {
  id: number
  username: string
  role: 'admin' | 'manager'
}
