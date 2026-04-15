import { useState, useEffect, useRef } from 'react'
import { Heart, Lock, Play, Eye, CheckCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { PostModal } from '../../components/PostModal'
import { CreatorProfileModal } from '../../components/CreatorProfileModal'
import type { Profile, Content } from '../../types'

interface HomePageProps {
  profile: Profile
}

// Mock data for preview
const mockContent: Content[] = [
  {
    id: '1',
    creator_id: '1',
    media_url: '',
    preview_url: '',
    thumbnail_url: '',
    media_type: 'image',
    caption: 'Exclusive content just for you',
    price: 5,
    is_free: false,
    views_count: 1234,
    likes_count: 89,
    unlocks_count: 30,
    created_at: new Date().toISOString(),
    creator: {
      id: '1',
      username: 'jessica_rose',
      display_name: 'Jessica Rose',
      avatar_url: null,
      bio: 'Content creator',
      role: 'creator',
      is_verified: true,
      is_over_18: true,
      wallet_balance: 0,
      created_at: new Date().toISOString(),
    }
  },
  {
    id: '2',
    creator_id: '2',
    media_url: '',
    preview_url: '',
    thumbnail_url: '',
    media_type: 'video',
    caption: 'Behind the scenes',
    price: 0,
    is_free: true,
    views_count: 5678,
    likes_count: 234,
    unlocks_count: 0,
    created_at: new Date().toISOString(),
    creator: {
      id: '2',
      username: 'mike_creates',
      display_name: 'Mike Creates',
      avatar_url: null,
      bio: 'Photographer',
      role: 'creator',
      is_verified: false,
      is_over_18: true,
      wallet_balance: 0,
      created_at: new Date().toISOString(),
    }
  },
  {
    id: '3',
    creator_id: '3',
    media_url: '',
    preview_url: '',
    thumbnail_url: '',
    media_type: 'image',
    caption: 'New drop coming soon',
    price: 10,
    is_free: false,
    views_count: 890,
    likes_count: 56,
    unlocks_count: 15,
    created_at: new Date().toISOString(),
    creator: {
      id: '3',
      username: 'luna_star',
      display_name: 'Luna Star',
      avatar_url: null,
      bio: 'Artist',
      role: 'creator',
      is_verified: true,
      is_over_18: true,
      wallet_balance: 0,
      created_at: new Date().toISOString(),
    }
  },
]

export function HomePage({ profile }: HomePageProps) {
  const [content, setContent] = useState<Content[]>(mockContent)
  const [loading, setLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Content | null>(null)
  const [selectedCreator, setSelectedCreator] = useState<Profile | null>(null)

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchContent()
    }
  }, [])

  const fetchContent = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('content')
      .select('*, creator:profiles(*)')
      .order('created_at', { ascending: false })
      .limit(20)

    if (data) {
      setContent(data as Content[])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">X</span>
            </div>
            <span className="text-lg font-bold text-foreground">xFans</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Welcome,</span>
            <span className="text-sm font-medium text-foreground">{profile.display_name || profile.username}</span>
          </div>
        </div>
      </header>

      {/* Feed */}
      <div className="max-w-lg mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="divide-y divide-border">
            {content.map((item) => (
              <ContentCard
                key={item.id}
                content={item}
                onOpenPost={() => setSelectedPost(item)}
                onOpenCreator={() => item.creator && setSelectedCreator(item.creator)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedPost && (
        <PostModal
          content={selectedPost}
          onClose={() => setSelectedPost(null)}
          onOpenCreator={() => selectedPost.creator && setSelectedCreator(selectedPost.creator)}
        />
      )}
      {selectedCreator && (
        <CreatorProfileModal
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
        />
      )}
    </div>
  )
}

interface ContentCardProps {
  content: Content
  onOpenPost: () => void
  onOpenCreator: () => void
}

function ContentCard({ content, onOpenPost, onOpenCreator }: ContentCardProps) {
  const [isInView, setIsInView] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const isLocked = !content.is_free

  return (
    <div ref={cardRef} className="p-4">
      {/* Creator Info */}
      <button
        onClick={onOpenCreator}
        className="flex items-center gap-3 mb-3 w-full text-left"
      >
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {content.creator?.avatar_url ? (
            <img src={content.creator.avatar_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-medium text-muted-foreground">
              {content.creator?.username?.[0]?.toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground">{content.creator?.display_name || content.creator?.username}</span>
            {content.creator?.is_verified && (
              <CheckCircle className="w-4 h-4 text-primary fill-primary" />
            )}
          </div>
          <span className="text-sm text-muted-foreground">@{content.creator?.username}</span>
        </div>
      </button>

      {/* Content Preview */}
      <button
        onClick={onOpenPost}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-card"
      >
        {/* Placeholder background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
        
        {/* Preview image/video would go here */}
        {content.media_type === 'video' && isInView && (
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
            <Play className="w-5 h-5 text-white" />
          </div>
        )}

        {/* Lock overlay for paid content */}
        {isLocked && (
          <div className="absolute inset-0 lock-overlay flex flex-col items-center justify-end pb-8">
            <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">${content.price}</span>
            <span className="text-sm text-muted-foreground">{content.unlocks_count} fans unlocked</span>
          </div>
        )}

        {/* Free badge */}
        {content.is_free && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-green-500/90 rounded-full">
            <span className="text-xs font-semibold text-white">FREE</span>
          </div>
        )}
      </button>

      {/* Actions & Stats */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
            <span className="text-sm">{content.likes_count + (isLiked ? 1 : 0)}</span>
          </button>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Eye className="w-5 h-5" />
            <span className="text-sm">{content.views_count}</span>
          </div>
        </div>
        {isLocked && (
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
            Unlock ${content.price}
          </button>
        )}
      </div>

      {/* Caption */}
      {content.caption && (
        <p className="mt-2 text-sm text-foreground">{content.caption}</p>
      )}
    </div>
  )
}
