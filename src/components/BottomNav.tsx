import { Home, MessageCircle, FolderOpen, User, LayoutDashboard, Film } from 'lucide-react'
import type { Page, UserRole } from '../types'

interface BottomNavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  role: UserRole
}

export function BottomNav({ currentPage, onNavigate, role }: BottomNavProps) {
  const fanItems = [
    { page: 'home' as Page, icon: Home, label: 'Home' },
    { page: 'messages' as Page, icon: MessageCircle, label: 'Messages' },
    { page: 'vault' as Page, icon: FolderOpen, label: 'Vault' },
    { page: 'account' as Page, icon: User, label: 'Account' },
  ]

  const creatorItems = [
    { page: 'dashboard' as Page, icon: LayoutDashboard, label: 'Dashboard' },
    { page: 'studio' as Page, icon: Film, label: 'Studio' },
    { page: 'creator-messages' as Page, icon: MessageCircle, label: 'Messages' },
    { page: 'creator-account' as Page, icon: User, label: 'Account' },
  ]

  const items = role === 'creator' ? creatorItems : fanItems

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {items.map(({ page, icon: Icon, label }) => {
            const isActive = currentPage === page
            return (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                <span className="text-xs font-medium">{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
