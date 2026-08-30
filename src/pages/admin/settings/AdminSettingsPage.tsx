import { useState, type FormEvent } from 'react'
import { FiEye, FiEyeOff, FiKey, FiUser, FiLock } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useProfile } from '@/features/admin-settings/model/useProfile'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { authApi } from '@/entities/auth'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  disabled?: boolean
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="pr-12"
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        disabled={disabled}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {visible ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
      </button>
    </div>
  )
}

export function AdminSettingsPage() {
  const { profile, isLoading } = useProfile()

  const [usernameForm, setUsernameForm] = useState({
    newUsername: '',
    currentPassword: '',
  })
  const [usernameSubmitting, setUsernameSubmitting] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordSubmitting, setPasswordSubmitting] = useState(false)

  const handleUsernameSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!usernameForm.newUsername.trim()) {
      toast.error('Введите новый логин')
      return
    }

    if (usernameForm.newUsername.length < 3) {
      toast.error('Логин должен быть не короче 3 символов')
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(usernameForm.newUsername)) {
      toast.error('Логин может содержать только буквы, цифры и подчёркивания')
      return
    }

    if (!usernameForm.currentPassword) {
      toast.error('Введите текущий пароль')
      return
    }

    setUsernameSubmitting(true)

    try {
      await authApi.changeUsername({
        newUsername: usernameForm.newUsername.trim(),
        currentPassword: usernameForm.currentPassword,
      })

      toast.success('Логин успешно изменён')
      setUsernameForm({ newUsername: '', currentPassword: '' })
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Ошибка при смене логина'
      const errors = Array.isArray(message) ? message : [message]
      errors.forEach((error: string) => toast.error(error))
    } finally {
      setUsernameSubmitting(false)
    }
  }

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!passwordForm.currentPassword) {
      toast.error('Введите текущий пароль')
      return
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Новый пароль должен быть не короче 6 символов')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Пароли не совпадают')
      return
    }

    setPasswordSubmitting(true)

    try {
      await authApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })

      toast.success('Пароль успешно изменён')
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Ошибка при смене пароля'
      const errors = Array.isArray(message) ? message : [message]
      errors.forEach((error: string) => toast.error(error))
    } finally {
      setPasswordSubmitting(false)
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Настройки аккаунта</h1>
        <p className="mt-1 text-muted-foreground">
          Управление учётными данными администратора
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiUser className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Профиль</h2>
              <p className="text-sm text-muted-foreground">Информация об аккаунте</p>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <div className="h-10 rounded-lg bg-muted animate-pulse" />
              <div className="h-10 rounded-lg bg-muted animate-pulse" />
            </div>
          ) : profile ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Логин</span>
                <span className="font-semibold">{profile.username}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Роль</span>
                <span className="font-semibold capitalize">{profile.role}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Аккаунт создан</span>
                <span className="font-semibold">{formatDate(profile.createdAt)}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Не удалось загрузить профиль
            </p>
          )}
        </div>

        <div className="space-y-6">
          <form
            onSubmit={handleUsernameSubmit}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FiUser className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Смена логина</h2>
                <p className="text-sm text-muted-foreground">
                  Буквы, цифры и подчёркивания, от 3 символов
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Новый логин *
                </label>
                <Input
                  value={usernameForm.newUsername}
                  onChange={(e) =>
                    setUsernameForm({ ...usernameForm, newUsername: e.target.value })
                  }
                  placeholder="new_admin"
                  disabled={usernameSubmitting}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Текущий пароль *
                </label>
                <PasswordInput
                  value={usernameForm.currentPassword}
                  onChange={(value) =>
                    setUsernameForm({ ...usernameForm, currentPassword: value })
                  }
                  placeholder="Введите текущий пароль"
                  disabled={usernameSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={usernameSubmitting}
              >
                {usernameSubmitting ? 'Сохранение...' : 'Изменить логин'}
              </Button>
            </div>
          </form>

          <form
            onSubmit={handlePasswordSubmit}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FiKey className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Смена пароля</h2>
                <p className="text-sm text-muted-foreground">
                  Минимум 6 символов
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Текущий пароль *
                </label>
                <PasswordInput
                  value={passwordForm.currentPassword}
                  onChange={(value) =>
                    setPasswordForm({ ...passwordForm, currentPassword: value })
                  }
                  placeholder="Введите текущий пароль"
                  disabled={passwordSubmitting}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Новый пароль *
                </label>
                <PasswordInput
                  value={passwordForm.newPassword}
                  onChange={(value) =>
                    setPasswordForm({ ...passwordForm, newPassword: value })
                  }
                  placeholder="Минимум 6 символов"
                  disabled={passwordSubmitting}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Подтвердите пароль *
                </label>
                <PasswordInput
                  value={passwordForm.confirmPassword}
                  onChange={(value) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: value })
                  }
                  placeholder="Повторите новый пароль"
                  disabled={passwordSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={passwordSubmitting}
              >
                {passwordSubmitting ? 'Сохранение...' : 'Изменить пароль'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <FiLock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Совет по безопасности</p>
            <p className="text-sm text-muted-foreground">
              Используйте сложные пароли и не сообщайте их третьим лицам. После смены логина текущая сессия сохранится.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}