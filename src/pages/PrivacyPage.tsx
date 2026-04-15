import { X } from 'lucide-react'

interface PrivacyPageProps {
  onClose: () => void
}

export function PrivacyPage({ onClose }: PrivacyPageProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h1 className="text-2xl font-bold text-foreground">Privacy Policy</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Introduction</h2>
            <p>
              xFans (&quot;we&quot; or &quot;us&quot; or &quot;our&quot;) operates the xFans website (the &quot;Service&quot;). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            
            <div className="mt-3 space-y-2">
              <p className="font-medium text-foreground">Types of Data Collected:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Personal Data:</strong> Email address, first name and last name, phone number, address, state, province, ZIP/postal code, city, cookies and usage data</li>
                <li><strong>Usage Data:</strong> Browser type and version, IP address, pages you visit, time and date of your visit, time spent on pages</li>
                <li><strong>Payment Information:</strong> Credit card details are collected by our payment processor and are not stored directly on our servers</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Use of Data</h2>
            <p>xFans uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical and security issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;effective date&quot; at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us by email at privacy@xfans.com or by visiting this page on our website.
            </p>
          </section>

          <p className="text-sm pt-4">Last updated: April 2026</p>
        </div>
      </div>
    </div>
  )
}
