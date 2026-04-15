import { Share2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { Profile } from '../types'

interface CreatorProfilePageProps {
  profile: Profile
  profileLink: string
}

export function CreatorProfilePage({ profile, profileLink }: CreatorProfilePageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.display_name || profile.username}'s xFans Profile`,
          text: profile.bio || 'Check out my profile on xFans!',
          url: profileLink,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.display_name || profile.username}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
            />
          )}
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {profile.display_name || profile.username}
          </h1>
          {profile.is_verified && (
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
              ✓ Verified Creator
            </span>
          )}
          {profile.bio && (
            <p className="text-lg text-muted-foreground mt-3">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Share Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-secondary rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Share This Profile</h2>
          
          <div className="space-y-3">
            {/* Profile Link */}
            <div className="flex gap-2">
              <input
                type="text"
                value={profileLink}
                readOnly
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Share Button */}
            {navigator.share && (
              <button
                onClick={handleShare}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-secondary rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-primary">--</p>
            <p className="text-sm text-muted-foreground mt-2">Followers</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-primary">--</p>
            <p className="text-sm text-muted-foreground mt-2">Posts</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-primary">--</p>
            <p className="text-sm text-muted-foreground mt-2">Subscribers</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">Subscribe to Support</h3>
          <p className="text-muted-foreground mb-6">
            Get exclusive access to all my premium content and direct messages
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}
