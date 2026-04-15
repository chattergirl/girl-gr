import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[hsl(var(--foreground))]">CreatorHub</span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Empowering creators to build meaningful connections with their fans.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Features</a></li>
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Pricing</a></li>
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Integrations</a></li>
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">About</a></li>
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Blog</a></li>
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Careers</a></li>
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Privacy</a></li>
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Terms</a></li>
              <li><a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[hsl(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            2026 CreatorHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              Twitter
            </a>
            <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              Instagram
            </a>
            <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
