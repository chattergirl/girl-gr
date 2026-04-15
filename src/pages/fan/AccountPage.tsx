import { useState } from 'react'
import { Wallet, CreditCard, Settings, LogOut, ChevronRight, Plus, X, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Profile, UserRole, Transaction } from '../../types'

interface AccountPageProps {
  profile: Profile
  onSwitchRole: (role: UserRole) => void
}

// Mock transactions
const mockTransactions: Transaction[] = [
  { id: '1', user_id: '1', amount: -5, type: 'purchase', status: 'completed', description: 'Unlocked content from @jessica_rose', created_at: new Date().toISOString() },
  { id: '2', user_id: '1', amount: 50, type: 'deposit', status: 'completed', description: 'Wallet top-up', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', user_id: '1', amount: -10, type: 'tip', status: 'completed', description: 'Tip to @luna_star', created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: '4', user_id: '1', amount: -15, type: 'purchase', status: 'completed', description: 'Unlocked content from @mike_creates', created_at: new Date(Date.now() - 259200000).toISOString() },
]

export function AccountPage({ profile, onSwitchRole }: AccountPageProps) {
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [transactions] = useState<Transaction[]>(mockTransactions)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Account</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Profile Card */}
        <div className="p-4 bg-card rounded-2xl border border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-muted-foreground">
                  {profile.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">{profile.display_name || profile.username}</h2>
              <p className="text-muted-foreground">@{profile.username}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                Fan Account
              </span>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="p-4 bg-card rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
                <p className="text-2xl font-bold text-foreground">${profile.wallet_balance.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => setShowTopUpModal(true)}
              className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Top Up
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Recent Transactions
            </h3>
          </div>
          <div className="divide-y divide-border">
            {transactions.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No transactions yet</p>
              </div>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(tx.created_at)}</p>
                  </div>
                  <span className={`font-semibold ${tx.amount > 0 ? 'text-green-400' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="border-t border-border" />
          <button
            onClick={() => onSwitchRole('creator')}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-foreground">Switch to Creator</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="border-t border-border" />
          <button
            onClick={handleSignOut}
            className="w-full p-4 flex items-center gap-3 text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <TopUpModal onClose={() => setShowTopUpModal(false)} />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal profile={profile} onClose={() => setShowSettingsModal(false)} />
      )}
    </div>
  )
}

interface TopUpModalProps {
  onClose: () => void
}

function TopUpModal({ onClose }: TopUpModalProps) {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const presets = [10, 25, 50, 100]

  const handleTopUp = async () => {
    if (!amount) return
    setLoading(true)
    // Simulate payment process
    setTimeout(() => {
      setLoading(false)
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-card rounded-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-foreground mb-2">Top Up Wallet</h3>
        <p className="text-muted-foreground mb-6">Add funds via crypto payment</p>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset.toString())}
              className={`py-3 rounded-xl font-semibold transition-colors ${
                amount === preset.toString()
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full pl-8 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          />
        </div>

        <button
          onClick={handleTopUp}
          disabled={!amount || parseFloat(amount) <= 0 || loading}
          className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? 'Processing...' : 'Continue to Payment'}
        </button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Powered by NOWPayments - Crypto accepted
        </p>
      </div>
    </div>
  )
}

interface SettingsModalProps {
  profile: Profile
  onClose: () => void
}

function SettingsModal({ profile, onClose }: SettingsModalProps) {
  const [displayName, setDisplayName] = useState(profile.display_name || '')
  const [bio, setBio] = useState(profile.bio || '')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await supabase
      .from('profiles')
      .update({ display_name: displayName, bio })
      .eq('id', profile.id)
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onClose} className="text-foreground">
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-foreground">Settings</h1>
          <button
            onClick={handleSave}
            disabled={loading}
            className="text-primary font-medium disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save'}
          </button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            value="user@example.com"
            disabled
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-muted-foreground"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold text-foreground mb-4">Notifications</h3>
          <label className="flex items-center justify-between p-3 bg-card rounded-xl">
            <span className="text-foreground">Push Notifications</span>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-primary" />
          </label>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
