import type { AuthTokens, LoginCredentials } from '../model/types'

// Мок API для авторизации
export async function loginApi(credentials: LoginCredentials): Promise<AuthTokens> {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 500))

  // Проверка тестовых данных
  if (credentials.username === 'admin' && credentials.password === 'admin') {
    return {
      accessToken: 'mock-jwt-access-token-' + Date.now(),
      refreshToken: 'mock-jwt-refresh-token-' + Date.now()
    }
  }

  throw new Error('Неверный логин или пароль')
}

export async function validateTokenApi(token: string): Promise<boolean> {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 300))

  // Простая валидация - токен должен начинаться с mock-jwt-access-token
  return token.startsWith('mock-jwt-access-token')
}

export async function logoutApi(): Promise<void> {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 300))
  // В реальном проекте здесь был бы запрос к серверу для инвалидации токена
  return Promise.resolve()
}
