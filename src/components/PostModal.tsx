import { useState } from 'react'
import { X, Lock, Heart, MessageCircle, Share2, CheckCircle, Users } from 'lucide-react'
import type { Content } from '../types'

interface PostModalProps {
  content: Content
  onClose: () => void
  onOpenCreator: () => void
}

export function PostModal({ content, onClose, onOpenCreator }: PostModalProps) {
  const [isLiked, setIsLiked] = useState(false)
  const isLocked = !content.is_free

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      {/* Content */}
      <div className="h-full flex flex-col">
        {/* Media */}
        <div className="flex-1 relative bg-black flex items-center justify-center">
          {/* Placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/20" />

          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl">
              <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center mb-4">
                <Lock className="w-10 h-10 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Unlock this content</h3>
              <p className="text-muted-foreground mb-6">${content.price} to unlock</p>
              
              <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">{content.unlocks_count} fans have unlocked this</span>
              </div>

              <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                Unlock for ${content.price}
              </button>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="bg-card border-t border-border p-4 space-y-4">
          {/* Creator */}
          <button
            onClick={onOpenCreator}
            className="flex items-center gap-3 w-full text-left"
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {content.creator?.avatar_url ? (
                <img src={content.creator.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-medium text-muted-foreground">
                  {content.creator?.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">{content.creator?.display_name || content.creator?.username}</span>
                {content.creator?.is_verified && (
                  <CheckCircle className="w-4 h-4 text-primary fill-primary" />
                )}
              </div>
              <span className="text-sm text-muted-foreground">@{content.creator?.username}</span>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
              Follow
            </button>
          </button>

          {/* Caption */}
          {content.caption && (
            <p className="text-foreground">{content.caption}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 pt-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-primary text-primary' : ''}`} />
              <span>{content.likes_count + (isLiked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
