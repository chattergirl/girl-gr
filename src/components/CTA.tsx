import { ArrowRight } from 'lucide-react'

interface CTAProps {
  onGetStarted: () => void
}

export function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[hsl(var(--primary))] rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
            Ready to start your creator journey?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Join thousands of creators who are building meaningful connections with their fans. 
            Sign up today and get your first month free.
          </p>
          <button
            onClick={onGetStarted}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-white text-[hsl(var(--primary))] font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            Get started free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
