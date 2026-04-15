import { ArrowRight, Play } from 'lucide-react'

interface HeroProps {
  onGetStarted: () => void
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--secondary))] rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              Over 10,000 creators already joined
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(var(--foreground))] leading-tight text-balance">
            Connect with your fans.
            <br />
            <span className="text-[hsl(var(--primary))]">Build your community.</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-pretty">
            The platform where creators share exclusive content, engage with their audience, 
            and monetize their passion. Start building meaningful connections today.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 px-8 py-4 bg-[hsl(var(--primary))] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Get started free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-8 py-4 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-medium rounded-lg hover:bg-[hsl(var(--secondary))] transition-colors">
              <Play className="w-5 h-5" />
              Watch demo
            </button>
          </div>
        </div>
        
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))]">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[hsl(var(--secondary))] rounded-xl p-6 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] mb-4" />
                <div className="h-4 bg-[hsl(var(--muted))] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[hsl(var(--muted))] rounded w-1/2 mb-4" />
                <div className="flex-1 bg-[hsl(var(--muted))] rounded-lg" />
              </div>
              <div className="bg-[hsl(var(--secondary))] rounded-xl p-6 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-pink-500 mb-4" />
                <div className="h-4 bg-[hsl(var(--muted))] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[hsl(var(--muted))] rounded w-1/2 mb-4" />
                <div className="flex-1 bg-[hsl(var(--muted))] rounded-lg" />
              </div>
              <div className="bg-[hsl(var(--secondary))] rounded-xl p-6 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-blue-500 mb-4" />
                <div className="h-4 bg-[hsl(var(--muted))] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[hsl(var(--muted))] rounded w-1/2 mb-4" />
                <div className="flex-1 bg-[hsl(var(--muted))] rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
