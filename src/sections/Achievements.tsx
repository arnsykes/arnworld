import Section from '../components/Section'

const badges = [
  { t: 'Lighthouse 95+', s: 'Perf/SEO/Best Practices', k: 'Performance' },
  { t: 'RBAC Panel Suite', s: 'Role based + audit log', k: 'Security' },
  { t: '3D Web', s: 'Three.js + R3F', k: 'Graphics' },
  { t: 'CI/CD', s: 'Auto build & deploy', k: 'DevOps' },
]

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements & Badges" subtitle="Sorotan kemampuan dan pencapaian teknis.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map(b => (
          <div key={b.t} className="rounded-2xl border border-base-line bg-base-card p-4 hover:shadow-gold transition">
            <div className="h-10 w-10 rounded-lg bg-gold-gradient mb-2" />
            <div className="font-semibold">{b.t}</div>
            <div className="text-xs text-base-sub">{b.s}</div>
            <div className="text-[10px] mt-2 rounded-full border border-base-line px-2 py-0.5 inline-block">{b.k}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
