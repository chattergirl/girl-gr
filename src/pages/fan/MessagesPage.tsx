import { useState } from 'react'
import { Search, Send, Lock, Image, DollarSign, CheckCircle } from 'lucide-react'
import type { Profile, Conversation, Message } from '../../types'

interface MessagesPageProps {
  profile: Profile
}

// Mock conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: { id: '1', username: 'jessica_rose', display_name: 'Jessica Rose', avatar_url: null, bio: '', role: 'creator', is_verified: true, is_over_18: true, wallet_balance: 0, created_at: '' },
    last_message: { id: '1', sender_id: '1', receiver_id: '2', text: 'Thanks for the tip! Here is something special for you...', content_id: null, is_locked: false, price: null, created_at: new Date().toISOString() },
    unread_count: 2,
    total_spent: 150,
  },
  {
    id: '2',
    participant: { id: '2', username: 'mike_creates', display_name: 'Mike Creates', avatar_url: null, bio: '', role: 'creator', is_verified: false, is_over_18: true, wallet_balance: 0, created_at: '' },
    last_message: { id: '2', sender_id: '2', receiver_id: '2', text: 'Hey! Check out my new content', content_id: null, is_locked: false, price: null, created_at: new Date(Date.now() - 3600000).toISOString() },
    unread_count: 0,
    total_spent: 45,
  },
  {
    id: '3',
    participant: { id: '3', username: 'luna_star', display_name: 'Luna Star', avatar_url: null, bio: '', role: 'creator', is_verified: true, is_over_18: true, wallet_balance: 0, created_at: '' },
    last_message: { id: '3', sender_id: '3', receiver_id: '2', text: 'Exclusive content just for you', content_id: '1', is_locked: true, price: 10, created_at: new Date(Date.now() - 86400000).toISOString() },
    unread_count: 1,
    total_spent: 500,
  },
]

export function MessagesPage({ profile }: MessagesPageProps) {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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
      <ChatView
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
          <h1 className="text-xl font-bold text-foreground mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </header>

      {/* Conversations List */}
      <div className="max-w-lg mx-auto divide-y divide-border">
        {filteredConversations.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No conversations yet</p>
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
                    {conversation.participant.avatar_url ? (
                      <img src={conversation.participant.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-medium text-muted-foreground">
                        {conversation.participant.username[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  {/* Spender Badge */}
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${badge.color} flex items-center justify-center`}>
                    <DollarSign className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="font-semibold text-foreground truncate">
                      {conversation.participant.display_name || conversation.participant.username}
                    </span>
                    {conversation.participant.is_verified && (
                      <CheckCircle className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                    {conversation.last_message?.is_locked && <Lock className="w-3 h-3" />}
                    {conversation.last_message?.content_id && <Image className="w-3 h-3" />}
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
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

interface ChatViewProps {
  conversation: Conversation
  profile: Profile
  onBack: () => void
}

function ChatView({ conversation, profile, onBack }: ChatViewProps) {
  const [messages] = useState<Message[]>([
    { id: '1', sender_id: conversation.participant.id, receiver_id: profile.id, text: 'Hey! Thanks for following me', content_id: null, is_locked: false, price: null, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', sender_id: profile.id, receiver_id: conversation.participant.id, text: 'Hi! Love your content', content_id: null, is_locked: false, price: null, created_at: new Date(Date.now() - 80000000).toISOString() },
    { id: '3', sender_id: conversation.participant.id, receiver_id: profile.id, text: 'Here is something special for you', content_id: '1', is_locked: true, price: 5, created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: '4', sender_id: conversation.participant.id, receiver_id: profile.id, text: conversation.last_message?.text || '', content_id: null, is_locked: false, price: null, created_at: conversation.last_message?.created_at || '' },
  ])
  const [input, setInput] = useState('')
  const [showTipModal, setShowTipModal] = useState(false)

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
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {conversation.participant.avatar_url ? (
              <img src={conversation.participant.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-medium text-muted-foreground">
                {conversation.participant.username[0].toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {conversation.participant.display_name || conversation.participant.username}
              </span>
              {conversation.participant.is_verified && (
                <CheckCircle className="w-4 h-4 text-primary fill-primary" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
          <button
            onClick={() => setShowTipModal(true)}
            className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg"
          >
            Tip
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.sender_id === profile.id
          return (
            <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${isOwn ? 'order-2' : ''}`}>
                {/* Locked content message */}
                {message.is_locked && message.content_id && (
                  <div className="bg-card border border-border rounded-xl p-3 mb-2">
                    <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center mb-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-md" />
                      <Lock className="w-8 h-8 text-foreground relative z-10" />
                    </div>
                    <button className="w-full py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
                      Unlock for ${message.price}
                    </button>
                  </div>
                )}
                
                {/* Text message */}
                {message.text && (
                  <div className={`px-4 py-2.5 rounded-2xl ${
                    isOwn
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-card text-foreground rounded-bl-md'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                )}
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

      {/* Tip Modal */}
      {showTipModal && (
        <TipModal
          creator={conversation.participant}
          onClose={() => setShowTipModal(false)}
        />
      )}
    </div>
  )
}

interface TipModalProps {
  creator: Profile
  onClose: () => void
}

function TipModal({ creator, onClose }: TipModalProps) {
  const [amount, setAmount] = useState('')
  const presets = [5, 10, 20, 50]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">Send a Tip</h3>
        <p className="text-muted-foreground mb-6">
          Show your appreciation to {creator.display_name || creator.username}
        </p>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset.toString())}
              className={`py-2 rounded-lg font-medium transition-colors ${
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
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Custom amount"
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl"
          >
            Cancel
          </button>
          <button
            disabled={!amount || parseFloat(amount) <= 0}
            className="flex-1 py-3 bg-primary text-primary-foreground font-medium rounded-xl disabled:opacity-50"
          >
            Send Tip
          </button>
        </div>
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
