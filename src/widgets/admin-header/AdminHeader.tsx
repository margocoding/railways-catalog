import { FiLogOut, FiUser } from 'react-icons/fi'
import { Button } from '@/shared/ui/Button'
import { useAuth } from '@/entities/auth'

interface AdminHeaderProps {
  onLogout: () => void
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const { profile, isLoading, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    onLogout()
  }

  return (
    <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black text-[hsl(var(--foreground))]">
            Админ-панель
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FiUser className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                {profile?.username || 'Администратор'}
              </span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <FiLogOut className="h-4 w-4" />
            Выйти
          </Button>
        </div>
      </div>
    </header>
  )
}