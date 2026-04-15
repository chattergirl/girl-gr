import { Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { User } from '@supabase/supabase-js'

interface HeaderProps {
  user: User | null
  onSignIn: () => void
  onSignUp: () => void
  onSignOut: () => void
}

export function Header({ user, onSignIn, onSignUp, onSignOut }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--background))]/80 backdrop-blur-md border-b border-[hsl(var(--border))]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[hsl(var(--foreground))]">CreatorHub</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
              Pricing
            </a>
            <a href="#creators" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
              Creators
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                  {user.email}
                </span>
                <button
                  onClick={onSignOut}
                  className="px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onSignIn}
                  className="px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={onSignUp}
                  className="px-4 py-2 text-sm font-medium bg-[hsl(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign up
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[hsl(var(--foreground))]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[hsl(var(--border))]">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                Features
              </a>
              <a href="#pricing" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                Pricing
              </a>
              <a href="#creators" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                Creators
              </a>
              {user ? (
                <button
                  onClick={onSignOut}
                  className="text-left text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={onSignIn}
                    className="text-left text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  >
                    Log in
                  </button>
                  <button
                    onClick={onSignUp}
                    className="px-4 py-2 text-sm font-medium bg-[hsl(var(--primary))] text-white rounded-lg hover:opacity-90 transition-opacity w-fit"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
