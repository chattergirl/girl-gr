import { useState } from 'react'
import { Search, Send, Image, DollarSign, Users, X, Lock, Loader2 } from 'lucide-react'
import type { Profile, Conversation, Message } from '../../types'

interface CreatorMessagesPageProps {
  profile: Profile
}

// Mock conversations with fans
const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: { id: '1', username: 'top_fan_1', display_name: 'Alex Johnson', avatar_url: null, bio: '', role: 'fan', is_verified: false, is_over_18: true, wallet_balance: 0, created_at: '' },
    last_message: { id: '1', sender_id: '1', receiver_id: '2', text: 'Can you make custom content?', content_id: null, is_locked: false, price: null, created_at: new Date().toISOString() },
    unread_count: 1,
    total_spent: 250,
  },
  {
    id: '2',
    participant: { id: '2', username: 'loyal_fan', display_name: 'Sam Smith', avatar_url: null, bio: '', role: 'fan', is_verified: false, is_over_18: true, wallet_balance: 0, created_at: '' },
    last_message: { id: '2', sender_id: '2', receiver_id: '2', text: 'Thank you for the content!', content_id: null, is_locked: false, price: null, created_at: new Date(Date.now() - 3600000).toISOString() },
    unread_count: 0,
    total_spent: 180,
  },
  {
    id: '3',
    participant: { id: '3', username: 'new_supporter', display_name: 'Jordan Lee', avatar_url: null, bio: '', role: 'fan', is_verified: false, is_over_18: true, wallet_balance: 0, created_at: '' },
    last_message: { id: '3', sender_id: '3', receiver_id: '2', text: 'Just discovered your page!', content_id: null, is_locked: false, price: null, created_at: new Date(Date.now() - 86400000).toISOString() },
    unread_count: 0,
    total_spent: 45,
  },
]

export function CreatorMessagesPage({ profile }: CreatorMessagesPageProps) {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showMassDM, setShowMassDM] = useState(false)

  const filteredConversations = conversations.filter(c =>
    c.participant.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSpenderBadge = (amount: number) => {
    if (amount >= 200) return { color: 'bg-blue-500', label: 'Diamond' }
    if (amount >= 50) return { color: 'bg-yellow-500', label: 'Gold' }
    return { color: 'bg-gray-400', label: 'New' }
  }

  if (selectedConversation) {
    return (
      <CreatorChatView
        conversation={selectedConversation}
        profile={profile}
        onBack={() => setSelectedConversation(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-foreground">Messages</h1>
            <button
              onClick={() => setShowMassDM(true)}
              className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg flex items-center gap-1"
            >
              <Users className="w-4 h-4" />
              Mass DM
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fans..."
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </header>

      {/* Conversations List */}
      <div className="max-w-lg mx-auto divide-y divide-border">
        {filteredConversations.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const badge = getSpenderBadge(conversation.total_spent || 0)
            return (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className="w-full p-4 flex items-center gap-3 hover:bg-card/50 transition-colors text-left"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <span className="text-xl font-medium text-muted-foreground">
                      {conversation.participant.display_name?.[0]?.toUpperCase() || conversation.participant.username[0].toUpperCase()}
                    </span>
                  </div>
                  {/* Spender Badge */}
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${badge.color} flex items-center justify-center`}>
                    <DollarSign className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-foreground truncate">
                      {conversation.participant.display_name || conversation.participant.username}
                    </span>
                    <span className={`px-1.5 py-0.5 text-xs rounded ${badge.color} text-white`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.last_message?.text}
                  </p>
                </div>

                {/* Meta */}
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">
                    {formatTime(conversation.last_message?.created_at || '')}
                  </p>
                  {conversation.unread_count > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {conversation.unread_count}
                    </span>
                  )}
                  <p className="text-xs text-green-400 font-medium">${conversation.total_spent}</p>
                </div>
              </button>
            )
          })
        )}
      </div>

      {/* Mass DM Modal */}
      {showMassDM && (
        <MassDMModal onClose={() => setShowMassDM(false)} />
      )}
    </div>
  )
}

interface CreatorChatViewProps {
  conversation: Conversation
  profile: Profile
  onBack: () => void
}

function CreatorChatView({ conversation, profile, onBack }: CreatorChatViewProps) {
  const [messages] = useState<Message[]>([
    { id: '1', sender_id: conversation.participant.id, receiver_id: profile.id, text: 'Hey! Love your content', content_id: null, is_locked: false, price: null, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', sender_id: profile.id, receiver_id: conversation.participant.id, text: 'Thank you so much!', content_id: null, is_locked: false, price: null, created_at: new Date(Date.now() - 80000000).toISOString() },
    { id: '3', sender_id: conversation.participant.id, receiver_id: profile.id, text: conversation.last_message?.text || '', content_id: null, is_locked: false, price: null, created_at: conversation.last_message?.created_at || '' },
  ])
  const [input, setInput] = useState('')
  const [showSendContent, setShowSendContent] = useState(false)

  const badge = conversation.total_spent! >= 200 ? { color: 'bg-blue-500', label: 'Diamond' } :
                conversation.total_spent! >= 50 ? { color: 'bg-yellow-500', label: 'Gold' } :
                { color: 'bg-gray-400', label: 'New' }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <button onClick={onBack} className="text-foreground">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg font-medium text-muted-foreground">
              {conversation.participant.display_name?.[0]?.toUpperCase() || conversation.participant.username[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                {conversation.participant.display_name || conversation.participant.username}
              </span>
              <span className={`px-1.5 py-0.5 text-xs rounded ${badge.color} text-white`}>
                {badge.label}
              </span>
            </div>
            <span className="text-xs text-green-400">${conversation.total_spent} spent</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.sender_id === profile.id
          return (
            <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%]`}>
                <div className={`px-4 py-2.5 rounded-2xl ${
                  isOwn
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card text-foreground rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className={`text-xs text-muted-foreground mt-1 ${isOwn ? 'text-right' : ''}`}>
                  {formatTime(message.created_at)}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="sticky bottom-20 bg-background border-t border-border p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSendContent(true)}
            className="p-3 bg-secondary text-secondary-foreground rounded-xl"
          >
            <Image className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="p-3 bg-primary text-primary-foreground rounded-xl">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Send Content Modal */}
      {showSendContent && (
        <SendContentModal onClose={() => setShowSendContent(false)} />
      )}
    </div>
  )
}

interface SendContentModalProps {
  onClose: () => void
}

function SendContentModal({ onClose }: SendContentModalProps) {
  const [contentType, setContentType] = useState<'free' | 'paid'>('free')
  const [price, setPrice] = useState('5')

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-card rounded-t-2xl p-6">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
        
        <h3 className="text-xl font-bold text-foreground mb-6">Send Content</h3>

        {/* Upload area */}
        <div className="aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 mb-6">
          <Image className="w-8 h-8 text-muted-foreground" />
          <p className="text-muted-foreground">Tap to select media</p>
        </div>

        {/* Content type */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setContentType('free')}
            className={`flex-1 p-3 rounded-xl border-2 transition-all ${
              contentType === 'free' ? 'border-primary bg-primary/10' : 'border-border'
            }`}
          >
            <p className="font-medium text-foreground">Free</p>
          </button>
          <button
            onClick={() => setContentType('paid')}
            className={`flex-1 p-3 rounded-xl border-2 transition-all ${
              contentType === 'paid' ? 'border-primary bg-primary/10' : 'border-border'
            }`}
          >
            <p className="font-medium text-foreground">Paid</p>
          </button>
        </div>

        {/* Price input */}
        {contentType === 'paid' && (
          <div className="relative mb-6">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              min="1"
            />
          </div>
        )}

        <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl">
          Send Content
        </button>
      </div>
    </div>
  )
}

interface MassDMModalProps {
  onClose: () => void
}

function MassDMModal({ onClose }: MassDMModalProps) {
  const [audience, setAudience] = useState<'followers' | 'all'>('followers')
  const [message, setMessage] = useState('')
  const [includeContent, setIncludeContent] = useState(false)
  const [contentType, setContentType] = useState<'free' | 'paid'>('free')
  const [price, setPrice] = useState('5')
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    setSending(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSending(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onClose} className="text-foreground">
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-semibold text-foreground">Mass DM</h1>
          <div className="w-6" />
        </div>
      </header>

      <div className="max-w-lg mx-auto p-6 space-y-6">
        {/* Audience Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Send to</label>
          <div className="flex gap-3">
            <button
              onClick={() => setAudience('followers')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                audience === 'followers' ? 'border-primary bg-primary/10' : 'border-border'
              }`}
            >
              <Users className="w-6 h-6 text-foreground mx-auto mb-2" />
              <p className="font-medium text-foreground">Followers</p>
              <p className="text-sm text-muted-foreground">1,234 fans</p>
            </button>
            <button
              onClick={() => setAudience('all')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                audience === 'all' ? 'border-primary bg-primary/10' : 'border-border'
              }`}
            >
              <Users className="w-6 h-6 text-foreground mx-auto mb-2" />
              <p className="font-medium text-foreground">All Fans</p>
              <p className="text-sm text-muted-foreground">2,456 fans</p>
            </button>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            rows={4}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Include Content Toggle */}
        <label className="flex items-center justify-between p-4 bg-card rounded-xl">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">Include Content</span>
          </div>
          <input
            type="checkbox"
            checked={includeContent}
            onChange={(e) => setIncludeContent(e.target.checked)}
            className="w-5 h-5 rounded text-primary"
          />
        </label>

        {/* Content Options */}
        {includeContent && (
          <div className="space-y-4 p-4 bg-card rounded-xl">
            {/* Upload area */}
            <div className="aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3">
              <Image className="w-8 h-8 text-muted-foreground" />
              <p className="text-muted-foreground">Tap to select media</p>
            </div>

            {/* Content type */}
            <div className="flex gap-3">
              <button
                onClick={() => setContentType('free')}
                className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                  contentType === 'free' ? 'border-primary bg-primary/10' : 'border-border'
                }`}
              >
                <p className="font-medium text-foreground">Free</p>
              </button>
              <button
                onClick={() => setContentType('paid')}
                className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                  contentType === 'paid' ? 'border-primary bg-primary/10' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <Lock className="w-4 h-4 text-foreground" />
                  <p className="font-medium text-foreground">Paid</p>
                </div>
              </button>
            </div>

            {contentType === 'paid' && (
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                />
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={!message.trim() || sending}
          className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {sending && <Loader2 className="w-5 h-5 animate-spin" />}
          {sending ? 'Sending...' : `Send to ${audience === 'followers' ? '1,234' : '2,456'} fans`}
        </button>
      </div>
    </div>
  )
}

function formatTime(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return 'now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d`
  return date.toLocaleDateString()
}
