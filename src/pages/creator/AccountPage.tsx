import { useState } from 'react'
import { Wallet, Settings, LogOut, ChevronRight, CheckCircle, Shield, Edit3, X, Loader2, Upload } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Profile, UserRole } from '../../types'

interface CreatorAccountPageProps {
  profile: Profile
  onSwitchRole: (role: UserRole) => void
}

export function CreatorAccountPage({ profile, onSwitchRole }: CreatorAccountPageProps) {
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showWithdrawal, setShowWithdrawal] = useState(false)

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
        {/* Profile Preview */}
        <div className="p-6 bg-card rounded-2xl border border-border text-center">
          {/* Avatar */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-muted-foreground">
                  {profile.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Name */}
          <div className="flex items-center justify-center gap-1 mb-1">
            <h2 className="text-xl font-bold text-foreground">{profile.display_name || profile.username}</h2>
            {profile.is_verified && (
              <CheckCircle className="w-5 h-5 text-primary fill-primary" />
            )}
          </div>
          <p className="text-muted-foreground mb-2">@{profile.username}</p>
          
          {/* Role badge */}
          <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
            Creator Account
          </span>

          {/* Verification Status */}
          {!profile.is_verified && (
            <button
              onClick={() => setShowVerification(true)}
              className="mt-4 w-full py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Get Verified
            </button>
          )}
        </div>

        {/* Wallet Card */}
        <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl border border-primary/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-foreground">${(profile.wallet_balance || 1250).toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => setShowWithdrawal(true)}
              className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl"
            >
              Withdraw
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Platform fee: 35% | You keep: 65%
          </p>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setShowEditProfile(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Edit3 className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Edit Profile</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="border-t border-border" />
          <button
            onClick={() => setShowVerification(true)}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Verification</span>
            </div>
            <div className="flex items-center gap-2">
              {profile.is_verified ? (
                <span className="text-sm text-green-400">Verified</span>
              ) : (
                <span className="text-sm text-muted-foreground">Not verified</span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
          <div className="border-t border-border" />
          <button className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="border-t border-border" />
          <button
            onClick={() => onSwitchRole('fan')}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-foreground">Switch to Fan Mode</span>
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

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal profile={profile} onClose={() => setShowEditProfile(false)} />
      )}

      {/* Verification Modal */}
      {showVerification && (
        <VerificationModal profile={profile} onClose={() => setShowVerification(false)} />
      )}

      {/* Withdrawal Modal */}
      {showWithdrawal && (
        <WithdrawalModal balance={profile.wallet_balance || 1250} onClose={() => setShowWithdrawal(false)} />
      )}
    </div>
  )
}

interface EditProfileModalProps {
  profile: Profile
  onClose: () => void
}

function EditProfileModal({ profile, onClose }: EditProfileModalProps) {
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
          <h1 className="font-semibold text-foreground">Edit Profile</h1>
          <button
            onClick={handleSave}
            disabled={loading}
            className="text-primary font-medium disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save'}
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-6 space-y-6">
        {/* Avatar */}
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-muted-foreground">
                  {profile.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">Tap to change photo</p>
        </div>

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
          <label className="block text-sm font-medium text-foreground mb-2">Username</label>
          <input
            type="text"
            value={profile.username}
            disabled
            className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-muted-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell fans about yourself..."
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      </div>
    </div>
  )
}

interface VerificationModalProps {
  profile: Profile
  onClose: () => void
}

function VerificationModal({ profile, onClose }: VerificationModalProps) {
  const [step, setStep] = useState(1)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async () => {
    setUploading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setUploading(false)
    setStep(3)
  }

  if (profile.is_verified) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <div className="relative w-full max-w-sm bg-card rounded-2xl p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">You are Verified!</h3>
          <p className="text-muted-foreground mb-6">
            Your account has been verified. The verification badge is displayed on your profile.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onClose} className="text-foreground">
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-foreground">Get Verified</h1>
          <div className="w-6" />
        </div>
      </header>

      <div className="max-w-lg mx-auto p-6">
        {step === 1 && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Verify Your Identity</h2>
            <p className="text-muted-foreground mb-8">
              Get a verification badge to build trust with your fans and unlock additional features.
            </p>

            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start gap-3 p-4 bg-card rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Verified Badge</p>
                  <p className="text-sm text-muted-foreground">Display a checkmark on your profile</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Higher Trust</p>
                  <p className="text-sm text-muted-foreground">Fans are more likely to engage</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Priority Support</p>
                  <p className="text-sm text-muted-foreground">Get help faster when you need it</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl"
            >
              Start Verification
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Upload ID Document</h2>
            <p className="text-muted-foreground mb-6">
              Please upload a clear photo of your government-issued ID.
            </p>

            <div className="aspect-[4/3] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 mb-6">
              <Upload className="w-10 h-10 text-muted-foreground" />
              <div className="text-center">
                <p className="font-medium text-foreground">Tap to upload</p>
                <p className="text-sm text-muted-foreground">Passport, Driver License, or ID Card</p>
              </div>
            </div>

            <div className="p-4 bg-card rounded-xl mb-6">
              <p className="text-sm text-muted-foreground">
                Your ID will be securely processed and deleted after verification. We never share your personal information.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
              {uploading ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Under Review</h2>
            <p className="text-muted-foreground mb-8">
              Your verification request has been submitted. We will review it within 24-48 hours.
            </p>
            <button
              onClick={onClose}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

interface WithdrawalModalProps {
  balance: number
  onClose: () => void
}

function WithdrawalModal({ balance, onClose }: WithdrawalModalProps) {
  const [amount, setAmount] = useState(balance.toString())
  const [processing, setProcessing] = useState(false)

  const handleWithdraw = async () => {
    setProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setProcessing(false)
    onClose()
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

        <h3 className="text-xl font-bold text-foreground mb-2">Withdraw Funds</h3>
        <p className="text-muted-foreground mb-6">
          Available: ${balance.toFixed(2)}
        </p>

        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            max={balance}
            className="w-full pl-10 pr-4 py-4 text-2xl font-bold bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          onClick={() => setAmount(balance.toString())}
          className="w-full py-2 mb-6 text-sm text-primary font-medium"
        >
          Withdraw Maximum
        </button>

        <div className="p-3 bg-secondary rounded-lg mb-6">
          <p className="text-sm text-muted-foreground">
            Withdrawals are processed via crypto (BTC, ETH, USDT). Minimum: $50
          </p>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={!amount || parseFloat(amount) < 50 || parseFloat(amount) > balance || processing}
          className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processing && <Loader2 className="w-5 h-5 animate-spin" />}
          {processing ? 'Processing...' : 'Withdraw'}
        </button>
      </div>
    </div>
  )
}
