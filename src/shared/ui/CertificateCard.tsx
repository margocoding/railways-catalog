import { FiDownload } from "react-icons/fi";

export function CertificateCard({ title, type }: { title: string; type: string }) {
  return (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 text-center hover:border-[hsl(var(--primary))/0.5] transition-colors">
      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center">
        <FiDownload className="w-6 h-6 text-[hsl(var(--muted-foreground))]" />
      </div>
      <div className="font-bold text-sm mb-1">{title}</div>
      <div className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{type}</div>
      <button className="text-xs text-[hsl(var(--primary))] hover:underline">Скачать PDF</button>
    </div>
  )
}
