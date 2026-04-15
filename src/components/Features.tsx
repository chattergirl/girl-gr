import { Heart, MessageCircle, Lock, DollarSign, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: Lock,
    title: 'Exclusive Content',
    description: 'Share premium content with your most dedicated fans through subscription tiers.',
  },
  {
    icon: DollarSign,
    title: 'Easy Monetization',
    description: 'Get paid directly for your work with our seamless payment processing.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Messaging',
    description: 'Connect personally with fans through private messages and comments.',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Create a thriving community around your content and brand.',
  },
  {
    icon: Heart,
    title: 'Fan Engagement',
    description: 'Track engagement metrics and understand what resonates with your audience.',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Withdraw your earnings anytime with fast and reliable payouts.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] text-balance">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Powerful tools designed for creators who want to build meaningful connections with their audience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors group"
            >
              <div className="w-12 h-12 bg-[hsl(var(--primary))]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                <feature.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
                {feature.title}
              </h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
