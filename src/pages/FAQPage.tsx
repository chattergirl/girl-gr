import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FAQPageProps {
  onClose: () => void
}

interface FAQItem {
  question: string
  answer: string
}

export function FAQPage({ onClose }: FAQPageProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: 'What is xFans?',
      answer: 'xFans is a platform that connects creators with their fans, allowing creators to share exclusive content and fans to support their favorite creators directly.'
    },
    {
      question: 'How do I become a creator?',
      answer: 'Sign up for an account and switch your role to "Creator" in your account settings. You can then start creating content and setting up exclusive offerings.'
    },
    {
      question: 'How do I subscribe to a creator?',
      answer: 'Browse creators on the home page, click on their profile, and select a subscription tier. You\'ll then have access to their exclusive content.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and other payment methods integrated through our secure payment processor.'
    },
    {
      question: 'How often is my payment charged?',
      answer: 'Subscriptions renew automatically on a monthly basis on the same day you subscribed. You can cancel anytime from your account settings.'
    },
    {
      question: 'How can I withdraw my earnings?',
      answer: 'As a creator, earnings are transferred to your connected bank account. You can set up withdrawals in your creator dashboard.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your personal and payment information.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription anytime from your account settings. Cancellation takes effect immediately.'
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'Use the report button on any content or profile. Our team reviews all reports and takes appropriate action.'
    },
    {
      question: 'What are my earnings?',
      answer: 'As a creator, you earn from subscriptions and tips from fans. Your earnings dashboard shows real-time stats and payment history.'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h1 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors"
              >
                <span className="font-medium text-foreground text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedIndex === index && (
                <div className="px-4 pb-4 text-muted-foreground border-t border-border pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
