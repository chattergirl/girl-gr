import { useState } from 'react'
import { DollarSign, TrendingUp, Users, Eye, Bell, ChevronRight } from 'lucide-react'
import type { Profile, Notification } from '../../types'

interface DashboardPageProps {
  profile: Profile
}

// Mock data
const mockEarnings = {
  available: 1250.00,
  pending: 150.00,
  today: 45.00,
  thisWeek: 320.00,
  thisMonth: 1400.00,
}

const mockTopFans = [
  { id: '1', username: 'fan_1', display_name: 'Alex Johnson', spent: 250 },
  { id: '2', username: 'fan_2', display_name: 'Sam Smith', spent: 180 },
  { id: '3', username: 'fan_3', display_name: 'Jordan Lee', spent: 145 },
  { id: '4', username: 'fan_4', display_name: 'Taylor Brown', spent: 120 },
  { id: '5', username: 'fan_5', display_name: 'Casey Davis', spent: 95 },
]

const mockNotifications: Notification[] = [
  { id: '1', user_id: '1', type: 'earning', title: 'New Unlock!', body: 'You earned $5 from @fan_1', is_read: false, created_at: new Date().toISOString() },
  { id: '2', user_id: '1', type: 'tip', title: 'Tip Received', body: '@fan_2 sent you a $10 tip', is_read: false, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: '3', user_id: '1', type: 'message', title: 'New Message', body: '@fan_3 sent you a message', is_read: true, created_at: new Date(Date.now() - 7200000).toISOString() },
  { id: '4', user_id: '1', type: 'follow', title: 'New Follower', body: '@fan_4 started following you', is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
]

const mockInsights = [
  { text: 'Your fans are most active at 9 PM', type: 'timing' },
  { text: 'Video content gets 3x more unlocks', type: 'content' },
  { text: 'Posts with captions perform better', type: 'tip' },
]

export function DashboardPage({ profile }: DashboardPageProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const unreadCount = mockNotifications.filter(n => !n.is_read).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-xl font-bold text-foreground">{profile.display_name || profile.username}</h1>
          </div>
          <button
            onClick={() => setShowNotifications(true)}
            className="relative p-2 text-foreground"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Earnings Card */}
        <div className="p-5 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl border border-primary/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-bold text-foreground">${mockEarnings.available.toFixed(2)}</p>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl">
              Withdraw
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>${mockEarnings.pending.toFixed(2)} pending</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            <p className="text-xl font-bold text-foreground">${mockEarnings.today.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
            <p className="text-xl font-bold text-foreground">${mockEarnings.thisWeek.toFixed(2)}</p>
          </div>
        </div>

        {/* Performance Section */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Recent Performance
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {[
              { label: 'Latest post earned', value: '$25', sublabel: '15 unlocks' },
              { label: 'Total views today', value: '1,234', sublabel: '+12% vs yesterday' },
              { label: 'New followers', value: '28', sublabel: 'this week' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <div>
                  <p className="text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.sublabel}</p>
                </div>
                <span className="text-lg font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Insights</h3>
          </div>
          <div className="p-4 space-y-2">
            {mockInsights.map((insight, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-foreground">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Fans */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top Fans
            </h3>
            <button className="text-sm text-primary">View All</button>
          </div>
          <div className="divide-y divide-border">
            {mockTopFans.slice(0, 5).map((fan, i) => (
              <div key={fan.id} className="p-4 flex items-center gap-3">
                <span className="w-6 text-center text-muted-foreground font-medium">#{i + 1}</span>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="font-medium text-muted-foreground">{fan.display_name[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{fan.display_name}</p>
                  <p className="text-sm text-muted-foreground">@{fan.username}</p>
                </div>
                <span className="font-semibold text-green-400">${fan.spent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border">
            {mockNotifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.type === 'earning' ? 'bg-green-500/20 text-green-400' :
                  notification.type === 'tip' ? 'bg-yellow-500/20 text-yellow-400' :
                  notification.type === 'message' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-primary/20 text-primary'
                }`}>
                  {notification.type === 'earning' && <DollarSign className="w-5 h-5" />}
                  {notification.type === 'tip' && <DollarSign className="w-5 h-5" />}
                  {notification.type === 'message' && <Bell className="w-5 h-5" />}
                  {notification.type === 'follow' && <Users className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-foreground">{notification.body}</p>
                  <p className="text-sm text-muted-foreground">{formatTime(notification.created_at)}</p>
                </div>
                {!notification.is_read && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel
          notifications={mockNotifications}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  )
}

interface NotificationsPanelProps {
  notifications: Notification[]
  onClose: () => void
}

function NotificationsPanel({ notifications, onClose }: NotificationsPanelProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
          <button onClick={onClose} className="text-foreground">Done</button>
        </div>
      </header>
      <div className="divide-y divide-border">
        {notifications.map((notification) => (
          <div key={notification.id} className={`p-4 flex items-start gap-3 ${!notification.is_read ? 'bg-primary/5' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              notification.type === 'earning' ? 'bg-green-500/20 text-green-400' :
              notification.type === 'tip' ? 'bg-yellow-500/20 text-yellow-400' :
              notification.type === 'message' ? 'bg-blue-500/20 text-blue-400' :
              'bg-primary/20 text-primary'
            }`}>
              {notification.type === 'earning' && <DollarSign className="w-5 h-5" />}
              {notification.type === 'tip' && <DollarSign className="w-5 h-5" />}
              {notification.type === 'message' && <Bell className="w-5 h-5" />}
              {notification.type === 'follow' && <Users className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{notification.title}</p>
              <p className="text-muted-foreground">{notification.body}</p>
              <p className="text-sm text-muted-foreground mt-1">{formatTime(notification.created_at)}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  )
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return date.toLocaleDateString()
}
