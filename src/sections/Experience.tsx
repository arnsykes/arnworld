import Section from '../components/Section'

const items = [
  { y: '2025', t: 'SUPER Apps & Panel', d: 'Membangun sistem admin modular, audit log, akses granular, dan integrasi 3D showcase.' },
  { y: '2024', t: 'Web Tools Suite', d: 'Optimasi build, analitik performa, dan PWA.' },
  { y: '2023', t: 'UI/UX Modern', d: 'Portofolio interaktif dan komponen reusable.' },
]

export default function Experience() {
  return (
    <Section id="experience" title="Experience" subtitle="Linimasa singkat pekerjaan dan fokus tahun ke tahun.">
      <ol className="relative border-s border-base-line pl-6">
        {items.map((i, idx) => (
          <li key={idx} className="mb-8">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gold-gradient ring-2 ring-base-bg" />
            <h3 className="font-semibold">{i.y} — {i.t}</h3>
            <p className="text-sm text-base-sub">{i.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
