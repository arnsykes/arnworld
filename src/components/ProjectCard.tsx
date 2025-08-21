import TiltCard from './TiltCard'

export interface ProjectItem {
  id: string
  title: string
  desc: string
  tags: string[]
  image?: string
  url?: string
}

export default function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <TiltCard className="group project-card border border-base-line bg-base-card p-4 hover:shadow-gold">
      <div className="aspect-video w-full overflow-hidden rounded-xl mb-3 bg-gradient-to-br from-base-line/60 to-transparent">
        {item.image ? (
          <img src={item.image} alt={item.title} className="img h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center text-base-sub text-sm">No Image</div>
        )}
      </div>
      <h3 className="font-semibold mb-1">{item.title}</h3>
      <p className="text-sm text-base-sub line-clamp-2">{item.desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map(t => (
          <span key={t} className="text-[11px] rounded-full border border-base-line px-2 py-0.5">{t}</span>
        ))}
      </div>
      {item.url && (
        <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm underline">
          Kunjungi →
        </a>
      )}
      <div className="g-glow" />
    </TiltCard>
  )
}
