import { ProjectItem } from './ProjectCard'

export default function ProjectModal({ item, onClose }: { item: ProjectItem | null; onClose: () => void }) {
  if (!item) return null
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="container h-full flex items-center" onClick={e => e.stopPropagation()}>
        <div className="w-full rounded-2xl border border-base-line bg-base-card p-5">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-semibold gold-text">{item.title}</h3>
            <button onClick={onClose} className="rounded-md border border-base-line px-2 py-1 text-xs">Tutup</button>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-base-line">
              {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> :
                <div className="h-48 grid place-items-center text-base-sub">No Image</div>}
            </div>
            <div>
              <p className="text-sm text-base-sub">{item.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map(t => <span key={t} className="text-[11px] rounded-full border border-base-line px-2 py-0.5">{t}</span>)}
              </div>
              {item.url && <a href={item.url} target="_blank" className="mt-4 inline-block underline">Kunjungi →</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
