export type UserRole = 'fan' | 'creator'

export interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  role: UserRole
  is_verified: boolean
  is_over_18: boolean
  wallet_balance: number
  created_at: string
}

export interface Content {
  id: string
  creator_id: string
  media_url: string
  preview_url: string | null
  thumbnail_url: string | null
  media_type: 'image' | 'video'
  caption: string | null
  price: number
  is_free: boolean
  views_count: number
  likes_count: number
  unlocks_count: number
  created_at: string
  creator?: Profile
}

export interface Purchase {
  id: string
  fan_id: string
  content_id: string
  amount: number
  created_at: string
  content?: Content
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  text: string | null
  content_id: string | null
  is_locked: boolean
  price: number | null
  created_at: string
  sender?: Profile
  content?: Content
}

export interface Conversation {
  id: string
  participant: Profile
  last_message: Message | null
  unread_count: number
  total_spent?: number
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  type: 'deposit' | 'withdrawal' | 'purchase' | 'earning' | 'tip'
  status: 'pending' | 'completed' | 'failed'
  description: string | null
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'earning' | 'message' | 'unlock' | 'follow' | 'tip'
  title: string
  body: string
  is_read: boolean
  created_at: string
}

export type Page = 'landing' | 'home' | 'messages' | 'vault' | 'account' | 'dashboard' | 'studio' | 'creator-messages' | 'creator-account'
