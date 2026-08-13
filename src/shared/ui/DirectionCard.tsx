export function DirectionCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>
    </div>
  )
}
