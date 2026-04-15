import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { UserRole } from '../types'

interface AuthModalProps {
  mode: 'signin' | 'signup'
  onClose: () => void
  onToggleMode: () => void
  onSuccess?: () => void
}

export function AuthModal({ mode, onClose, onToggleMode, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('fan')
  const [isOver18, setIsOver18] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Please add your environment variables.')
      return
    }

    if (mode === 'signup' && !isOver18) {
      setError('You must be 18 or older to use this platform')
      return
    }

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              role,
            }
          }
        })
        if (error) throw error
        
        // Create profile
        if (data.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              username,
              display_name: username,
              role,
              is_over_18: isOver18,
            })
          if (profileError) throw profileError
        }
        
        setMessage('Account created! Check your email for verification.')
        onSuccess?.()
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        onClose()
        onSuccess?.()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-card rounded-2xl border border-border p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">X</span>
          </div>
          <span className="text-xl font-bold text-foreground">xFans</span>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {mode === 'signin' ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {mode === 'signin' 
            ? 'Sign in to your account to continue' 
            : 'Join the community today'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="you@example.com"
              required
            />
          </div>
          
          {mode === 'signup' && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="yourname"
                minLength={3}
                maxLength={20}
                required
              />
            </div>
          )}
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your password"
              minLength={6}
              required
            />
          </div>
          
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  I want to join as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('fan')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      role === 'fan'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      <svg className="w-8 h-8 mx-auto text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-foreground">Fan</span>
                    <p className="text-xs text-muted-foreground mt-1">Discover content</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('creator')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      role === 'creator'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      <svg className="w-8 h-8 mx-auto text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <span className="font-medium text-foreground">Creator</span>
                    <p className="text-xs text-muted-foreground mt-1">Share content</p>
                  </button>
                </div>
              </div>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOver18}
                  onChange={(e) => setIsOver18(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  I confirm that I am at least 18 years old and agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </>
          )}
          
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}
          
          {message && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-400">
              {message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading || (mode === 'signup' && !isOver18)}
            className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={onToggleMode}
            className="text-primary hover:underline font-medium"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
