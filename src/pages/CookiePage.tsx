import { X } from 'lucide-react'

interface CookiePageProps {
  onClose: () => void
}

export function CookiePage({ onClose }: CookiePageProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h1 className="text-2xl font-bold text-foreground">Cookie Policy</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. What Are Cookies?</h2>
            <p>
              Cookies are small files stored on your device when you visit a website. They help websites remember information about you, like your preferences and login information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. How We Use Cookies</h2>
            <p>xFans uses cookies for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Authentication:</strong> To keep you logged in</li>
              <li><strong>Preferences:</strong> To remember your settings and choices</li>
              <li><strong>Analytics:</strong> To understand how you use our platform</li>
              <li><strong>Security:</strong> To protect against fraud and malicious activity</li>
              <li><strong>Functionality:</strong> To ensure the platform works properly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Types of Cookies We Use</h2>
            
            <div className="space-y-3">
              <div>
                <p className="font-medium text-foreground">Essential Cookies</p>
                <p className="text-sm">Required for the website to function. These cannot be disabled.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Performance Cookies</p>
                <p className="text-sm">Help us understand how visitors interact with our website.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Functional Cookies</p>
                <p className="text-sm">Remember your preferences and choices to personalize your experience.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Marketing Cookies</p>
                <p className="text-sm">Used to track visitors across websites to display relevant ads.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Cookie Duration</h2>
            <p>
              Some cookies are &quot;session cookies&quot; that are deleted when you close your browser. Others are &quot;persistent cookies&quot; that remain on your device for a longer period.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Your Cookie Choices</h2>
            <p>
              You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when a cookie is being sent. Note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Third-Party Cookies</h2>
            <p>
              We may allow third-party service providers (like analytics and payment processors) to set cookies on our website. These third parties have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of significant changes by posting an updated version on this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Contact Us</h2>
            <p>
              If you have questions about our Cookie Policy, please contact us at privacy@xfans.com
            </p>
          </section>

          <p className="text-sm pt-4">Last updated: April 2026</p>
        </div>
      </div>
    </div>
  )
}
