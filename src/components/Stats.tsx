export function Stats() {
  const stats = [
    { value: '10K+', label: 'Active Creators' },
    { value: '2M+', label: 'Monthly Fans' },
    { value: '$5M+', label: 'Paid to Creators' },
    { value: '99.9%', label: 'Uptime' },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary))]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
