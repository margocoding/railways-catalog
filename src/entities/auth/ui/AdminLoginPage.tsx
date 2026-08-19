import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Label } from '@/shared/ui/Label'
import { useAuth } from '@/entities/auth'
import { useState } from 'react'

interface AdminLoginPageProps {
  onLoginSuccess: () => void
}

export function AdminLoginPage({ onLoginSuccess }: AdminLoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await login({ username, password })
      if (result.success) {
        onLoginSuccess()
      } else {
        setError(result.error || 'Ошибка входа')
      }
    } catch {
      setError('Произошла ошибка при входе')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-4">
      <div className="w-full max-w-md">
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black mb-2">Админ-панель</h1>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              Введите данные для входа
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={isSubmitting || !username || !password}
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-[hsl(var(--muted))] text-xs text-[hsl(var(--muted-foreground))]">
            <p className="font-semibold mb-1">Тестовые данные:</p>
            <p>Логин: <code className="bg-[hsl(var(--background))] px-1 py-0.5 rounded">admin</code></p>
            <p>Пароль: <code className="bg-[hsl(var(--background))] px-1 py-0.5 rounded">admin</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
