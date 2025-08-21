import Section from '../components/Section'

const items = [
  { title: 'Admin Panel Suite', desc: 'Role-based, activity logs, granular permissions.' },
  { title: 'Automation Tools', desc: 'Scheduler, webhook integrasi, pipeline CI/CD mini.' },
  { title: 'Analytics Dash', desc: 'Grafik real-time, event tracking, A/B testing.' },
]

export default function ToolsPanels() {
  return (
    <Section id="tools" title="Tools & Panels" subtitle="Toolkit yang mempermudah scaling dan pemeliharaan.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(i => (
          <div key={i.title} className="rounded-2xl border border-base-line bg-base-card p-5 hover:shadow-gold transition">
            <div className="h-10 w-10 rounded-lg bg-gold-gradient mb-3" />
            <h3 className="font-semibold mb-1">{i.title}</h3>
            <p className="text-sm text-base-sub">{i.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}