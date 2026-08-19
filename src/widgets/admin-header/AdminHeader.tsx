import { Button } from '@/shared/ui/Button'
import { useAuth } from '@/entities/auth'

interface AdminHeaderProps {
  onLogout: () => void
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    onLogout()
  }

  return (
    <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black text-[hsl(var(--foreground))]">Админ-панель</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">admin</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </div>
    </header>
  )
}
