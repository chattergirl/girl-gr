import { X, Mail, MessageSquare, HelpCircle, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface SupportPageProps {
  onClose: () => void
}

export function SupportPage({ onClose }: SupportPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setMessage('')
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h1 className="text-2xl font-bold text-foreground">Support</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:support@xfans.com"
              className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Email Support</p>
                <p className="text-sm text-muted-foreground">support@xfans.com</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Live Chat</p>
                <p className="text-sm text-muted-foreground">Available 9am-5pm UTC</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="general">General Inquiry</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="content">Content Issues</option>
                  <option value="account">Account Issues</option>
                  <option value="abuse">Report Abuse</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question..."
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!message.trim()}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Send Message
              </button>

              {submitted && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 text-sm">
                  ✓ Message sent! We&apos;ll get back to you within 24 hours.
                </div>
              )}
            </form>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Resources</h2>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
                <HelpCircle className="w-4 h-4" />
                Creator Guide
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
                <HelpCircle className="w-4 h-4" />
                Fan Guide
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
                <HelpCircle className="w-4 h-4" />
                Community Guidelines
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Average response time: 24 hours
          </p>
        </div>
      </div>
    </div>
  )
}
