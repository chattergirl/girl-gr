import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from './lib/supabase'
import { LandingPage } from './pages/LandingPage'
import { HomePage } from './pages/fan/HomePage'
import { MessagesPage } from './pages/fan/MessagesPage'
import { VaultPage } from './pages/fan/VaultPage'
import { AccountPage } from './pages/fan/AccountPage'
import { DashboardPage } from './pages/creator/DashboardPage'
import { StudioPage } from './pages/creator/StudioPage'
import { CreatorMessagesPage } from './pages/creator/MessagesPage'
import { CreatorAccountPage } from './pages/creator/AccountPage'
import { CreatorProfilePage } from './pages/CreatorProfilePage'
import { BottomNav } from './components/BottomNav'
import { AIChatButton } from './components/AIChatButton'
import type { User } from '@supabase/supabase-js'
import type { Page, Profile, UserRole } from './types'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('landing')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setCurrentPage('landing')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) {
      setProfile(data as Profile)
      setCurrentPage(data.role === 'creator' ? 'dashboard' : 'home')
    }
    setLoading(false)
  }

  const handleAuthSuccess = () => {
    // Profile will be fetched via onAuthStateChange
  }

  const handleSwitchRole = async (newRole: UserRole) => {
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', user.id)

    if (!error && profile) {
      setProfile({ ...profile, role: newRole })
      setCurrentPage(newRole === 'creator' ? 'dashboard' : 'home')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Not logged in - show landing page
  if (!user || !profile) {
    return <LandingPage onAuthSuccess={handleAuthSuccess} />
  }

  const isFan = profile.role === 'fan'
  const isCreator = profile.role === 'creator'

  const renderPage = () => {
    if (isFan) {
      switch (currentPage) {
        case 'home':
          return <HomePage profile={profile} />
        case 'messages':
          return <MessagesPage profile={profile} />
        case 'vault':
          return <VaultPage profile={profile} />
        case 'account':
          return <AccountPage profile={profile} onSwitchRole={handleSwitchRole} />
        default:
          return <HomePage profile={profile} />
      }
    }

    if (isCreator) {
      switch (currentPage) {
        case 'dashboard':
          return <DashboardPage profile={profile} />
        case 'studio':
          return <StudioPage profile={profile} />
        case 'creator-messages':
          return <CreatorMessagesPage profile={profile} />
        case 'creator-account':
          return <CreatorAccountPage profile={profile} onSwitchRole={handleSwitchRole} />
        default:
          return <DashboardPage profile={profile} />
      }
    }

    return <HomePage profile={profile} />
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {renderPage()}
      <BottomNav 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        role={profile.role} 
      />
      <AIChatButton />
    </div>
  )
}

export default App
