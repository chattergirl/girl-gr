import { useState } from 'react'
import { Play, Heart, MessageCircle, CheckCircle } from 'lucide-react'
import type { Profile, Content, Purchase } from '../../types'

interface VaultPageProps {
  profile: Profile
}

// Mock purchased content
const mockPurchases: (Purchase & { content: Content })[] = [
  {
    id: '1',
    fan_id: '1',
    content_id: '1',
    amount: 5,
    created_at: new Date().toISOString(),
    content: {
      id: '1',
      creator_id: '1',
      media_url: '',
      preview_url: '',
      thumbnail_url: '',
      media_type: 'image',
      caption: 'Exclusive shoot',
      price: 5,
      is_free: false,
      views_count: 500,
      likes_count: 45,
      unlocks_count: 30,
      created_at: new Date().toISOString(),
      creator: { id: '1', username: 'jessica_rose', display_name: 'Jessica Rose', avatar_url: null, bio: '', role: 'creator', is_verified: true, is_over_18: true, wallet_balance: 0, created_at: '' }
    }
  },
  {
    id: '2',
    fan_id: '1',
    content_id: '2',
    amount: 10,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    content: {
      id: '2',
      creator_id: '2',
      media_url: '',
      preview_url: '',
      thumbnail_url: '',
      media_type: 'video',
      caption: 'Behind the scenes',
      price: 10,
      is_free: false,
      views_count: 200,
      likes_count: 20,
      unlocks_count: 15,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      creator: { id: '2', username: 'luna_star', display_name: 'Luna Star', avatar_url: null, bio: '', role: 'creator', is_verified: true, is_over_18: true, wallet_balance: 0, created_at: '' }
    }
  },
  {
    id: '3',
    fan_id: '1',
    content_id: '3',
    amount: 15,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    content: {
      id: '3',
      creator_id: '3',
      media_url: '',
      preview_url: '',
      thumbnail_url: '',
      media_type: 'image',
      caption: 'Special content',
      price: 15,
      is_free: false,
      views_count: 300,
      likes_count: 35,
      unlocks_count: 20,
      created_at: new Date(Date.now() - 172800000).toISOString(),
      creator: { id: '3', username: 'mike_creates', display_name: 'Mike Creates', avatar_url: null, bio: '', role: 'creator', is_verified: false, is_over_18: true, wallet_balance: 0, created_at: '' }
    }
  },
]

export function VaultPage({ profile }: VaultPageProps) {
  const [purchases] = useState<(Purchase & { content: Content })[]>(mockPurchases)
  const [filter, setFilter] = useState<'all' | 'recent'>('all')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const recentPurchases = purchases.filter(p => {
    const date = new Date(p.created_at)
    const dayAgo = new Date(Date.now() - 86400000)
    return date > dayAgo
  })

  const displayedPurchases = filter === 'recent' ? recentPurchases : purchases

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground mb-4">My Vault</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === 'recent'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              Recently Bought
            </button>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <div className="max-w-lg mx-auto p-4">
        {displayedPurchases.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No content yet</h3>
            <p className="text-muted-foreground">
              {filter === 'recent' ? 'No recent purchases' : 'Your purchased content will appear here'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {displayedPurchases.map((purchase) => (
              <div key={purchase.id} className="relative">
                {/* Content Card */}
                <button className="w-full aspect-square rounded-xl bg-card overflow-hidden relative group">
                  {/* Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
                  
                  {/* Video indicator */}
                  {purchase.content.media_type === 'video' && (
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                </button>

                {/* Actions */}
                <div className="flex items-center justify-between mt-2 px-1">
                  <button
                    onClick={() => toggleFavorite(purchase.id)}
                    className={`p-1.5 rounded-full ${
                      favorites.has(purchase.id) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(purchase.id) ? 'fill-primary' : ''}`} />
                  </button>
                  <button className="p-1.5 text-muted-foreground">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Creator */}
                <div className="flex items-center gap-2 px-1 mt-1">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <span className="text-xs text-muted-foreground">
                      {purchase.content.creator?.username?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground truncate flex items-center gap-0.5">
                    {purchase.content.creator?.username}
                    {purchase.content.creator?.is_verified && (
                      <CheckCircle className="w-3 h-3 text-primary fill-primary" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
