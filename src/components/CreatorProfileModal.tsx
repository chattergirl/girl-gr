import { useState, useEffect } from 'react'
import { X, CheckCircle, MessageCircle, Grid, Lock } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Profile, Content } from '../types'

interface CreatorProfileModalProps {
  creator: Profile
  onClose: () => void
}

// Mock content for preview
const mockCreatorContent: Content[] = [
  { id: '1', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'image', caption: '', price: 5, is_free: false, views_count: 100, likes_count: 20, unlocks_count: 10, created_at: '' },
  { id: '2', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'image', caption: '', price: 0, is_free: true, views_count: 200, likes_count: 40, unlocks_count: 0, created_at: '' },
  { id: '3', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'video', caption: '', price: 10, is_free: false, views_count: 150, likes_count: 30, unlocks_count: 5, created_at: '' },
  { id: '4', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'image', caption: '', price: 3, is_free: false, views_count: 80, likes_count: 15, unlocks_count: 8, created_at: '' },
  { id: '5', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'image', caption: '', price: 0, is_free: true, views_count: 300, likes_count: 60, unlocks_count: 0, created_at: '' },
  { id: '6', creator_id: '1', media_url: '', preview_url: '', thumbnail_url: '', media_type: 'video', caption: '', price: 15, is_free: false, views_count: 50, likes_count: 10, unlocks_count: 3, created_at: '' },
]

export function CreatorProfileModal({ creator, onClose }: CreatorProfileModalProps) {
  const [content, setContent] = useState<Content[]>(mockCreatorContent)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchCreatorContent()
    }
  }, [creator.id])

  const fetchCreatorContent = async () => {
    const { data } = await supabase
      .from('content')
      .select('*')
      .eq('creator_id', creator.id)
      .order('created_at', { ascending: false })
      .limit(30)

    if (data) {
      setContent(data as Content[])
    }
  }

  const stats = {
    posts: content.length,
    followers: Math.floor(Math.random() * 10000) + 500,
    likes: content.reduce((sum, c) => sum + c.likes_count, 0),
  }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-foreground">@{creator.username}</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Profile Header */}
      <div className="p-6 text-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
          {creator.avatar_url ? (
            <img src={creator.avatar_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl font-bold text-muted-foreground">
                {creator.username?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <div className="flex items-center justify-center gap-1 mb-1">
          <h2 className="text-xl font-bold text-foreground">{creator.display_name || creator.username}</h2>
          {creator.is_verified && (
            <CheckCircle className="w-5 h-5 text-primary fill-primary" />
          )}
        </div>
        <p className="text-muted-foreground mb-4">@{creator.username}</p>

        {/* Bio */}
        {creator.bio && (
          <p className="text-foreground mb-4 max-w-sm mx-auto">{creator.bio}</p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{stats.posts}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{stats.followers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{stats.likes.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Likes</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2.5 font-medium rounded-xl transition-colors ${
              isFollowing
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className="px-6 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-xl flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Message
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="border-t border-border">
        <div className="flex items-center justify-center gap-2 py-3">
          <Grid className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Posts</span>
        </div>

        <div className="grid grid-cols-3 gap-0.5">
          {content.map((item) => (
            <button
              key={item.id}
              className="relative aspect-square bg-card overflow-hidden"
            >
              {/* Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
              
              {/* Lock indicator */}
              {!item.is_free && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Price tag */}
              {!item.is_free && (
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 rounded text-xs text-white font-medium">
                  ${item.price}
                </div>
              )}

              {/* Free badge */}
              {item.is_free && (
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-green-500/90 rounded text-xs text-white font-medium">
                  FREE
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
