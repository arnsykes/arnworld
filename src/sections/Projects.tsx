import { useMemo, useState } from 'react'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import { categories, projects as data } from '../data/projects'
import ProjectModal from '../components/ProjectModal'

export default function Projects() {
  const [tab, setTab] = useState<string>('All')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const base = tab === 'All' ? data : data.filter(p => p.tags.includes(tab))
    if (!q) return base
    const s = q.toLowerCase()
    return base.filter(p => p.title.toLowerCase().includes(s) || p.desc.toLowerCase().includes(s) || p.tags.join(' ').toLowerCase().includes(s))
  }, [tab, q])

  const active = useMemo(() => data.find(x => x.id === open) || null, [open])

  return (
    <Section id="projects" title="Projects" subtitle="Cari, filter, dan buka detail proyek.">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Cari proyek…"
          className="rounded-xl border border-base-line bg-transparent px-3 py-2 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setTab(c)} className={`text-sm rounded-full px-3 py-1 border ${tab===c?'bg-base-line text-base-text':'border-base-line text-base-sub'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div key={p.id} onClick={() => setOpen(p.id)} className="group cursor-pointer">
            <ProjectCard item={p} />
          </div>
        ))}
      </div>

      <ProjectModal item={active} onClose={() => setOpen(null)} />
    </Section>
  )
}
