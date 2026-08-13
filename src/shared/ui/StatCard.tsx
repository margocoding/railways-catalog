export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 text-center">
      <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">{value}</div>
      <div className="text-sm text-[hsl(var(--muted-foreground))]">{label}</div>
    </div>
  )
}