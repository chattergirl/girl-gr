import { useState } from 'react'
import { AuthModal } from '../components/AuthModal'

interface LandingPageProps {
  onAuthSuccess: () => void
}

export function LandingPage({ onAuthSuccess }: LandingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup')

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">X</span>
            </div>
            <span className="text-xl font-bold text-foreground">xFans</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openAuth('signin')}
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => openAuth('signup')}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Unlock{' '}
            <span className="text-primary">Exclusive</span>
            <br />
            Content
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with your favorite creators. Access premium content. Support the creators you love.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openAuth('signup')}
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => openAuth('signin')}
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-all"
            >
              I have an account
            </button>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Discover Amazing Creators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-card overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-0 backdrop-blur-md" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-muted" />
                    <span className="text-sm font-medium text-foreground">Creator {i}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">Premium</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why xFans?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Direct Messaging</h3>
              <p className="text-muted-foreground">
                Chat directly with your favorite creators. Get personalized content and exclusive access.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Pay-Per-View</h3>
              <p className="text-muted-foreground">
                Unlock exclusive clips and content. Only pay for what you want to see.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Creator Earnings</h3>
              <p className="text-muted-foreground">
                Creators keep 65% of all earnings. Instant crypto payouts available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Join?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Sign up now and start exploring exclusive content from amazing creators.
          </p>
          <button
            onClick={() => openAuth('signup')}
            className="px-8 py-4 text-lg font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-105"
          >
            Join Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">X</span>
            </div>
            <span className="font-semibold text-foreground">xFans</span>
          </div>
          <p className="text-sm text-muted-foreground">
            2024 xFans. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
          onSuccess={onAuthSuccess}
        />
      )}
    </div>
  )
}
