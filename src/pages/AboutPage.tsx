import { X, Heart, Users, Zap } from 'lucide-react'

interface AboutPageProps {
  onClose: () => void
}

export function AboutPage({ onClose }: AboutPageProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h1 className="text-2xl font-bold text-foreground">About xFans</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Our Mission</h2>
            <p>
              At xFans, we&apos;re building a direct connection between creators and their most dedicated fans. We believe in empowering creators to monetize their passion and allowing fans to directly support the creators they love.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Why xFans?</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-3">
                <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Direct Connection</p>
                  <p className="text-sm">Creators and fans connect directly, building meaningful relationships.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Fair Compensation</p>
                  <p className="text-sm">Creators keep more of their earnings. No middlemen taking a cut.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Easy to Use</p>
                  <p className="text-sm">Simple tools for creators to manage their content and earnings.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Our Story</h2>
            <p>
              xFans was founded with a simple idea: creators deserve a platform where they can build a sustainable business doing what they love. We started by listening to creators across different fields - from artists to musicians, writers to performers - and learning what they needed most.
            </p>
            <p className="mt-3">
              Today, xFans is home to thousands of creators and millions of fans who are supporting each other and building incredible communities together.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Our Values</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-foreground">Creator-First</p>
                <p className="text-sm">We make decisions with creators in mind, ensuring they can grow and thrive.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Transparency</p>
                <p className="text-sm">We believe in clear, honest communication with both creators and fans.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Community</p>
                <p className="text-sm">We foster supportive communities where fans and creators can connect authentically.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Innovation</p>
                <p className="text-sm">We continuously improve our platform with new features and tools.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Get in Touch</h2>
            <p>
              Have questions or feedback? We&apos;d love to hear from you. Contact us at hello@xfans.com
            </p>
          </section>

          <p className="text-sm pt-4">Last updated: April 2026</p>
        </div>
      </div>
    </div>
  )
}
