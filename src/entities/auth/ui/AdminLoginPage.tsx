import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { setToken } from '../model/auth.model'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { FormField } from '@/shared/ui/FormField'
import { authApi } from '../api/auth.api'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    '/admin'

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username.trim() || !formData.password) {
      setError('Введите логин и пароль')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await authApi.login({
        username: formData.username.trim(),
        password: formData.password,
      })

      setToken(response.token)
      navigate(from, { replace: true })
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Неверный логин или пароль'
      setError(Array.isArray(message) ? message.join(', ') : message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-gradient">
              <span className="text-2xl">🛤️</span>
            </div>
            <h1 className="text-2xl font-black">ИНВИА</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Панель управления
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Логин">
              <Input
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Введите логин"
                disabled={isSubmitting}
                autoFocus
              />
            </FormField>

            <FormField label="Пароль">
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Введите пароль"
                disabled={isSubmitting}
              />
            </FormField>

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}