import Section from '../components/Section'

export default function About() {
  return (
    <Section id="about" title="About" subtitle="Pengembang aplikasi, tools, panel, dan website. Fokus performa dan arsitektur yang rapi.">
      <div className="prose prose-invert max-w-none">
        <p>
          Saya membangun solusi end-to-end: dari perencanaan, UI/UX, implementasi frontend-backend, hingga deployment dan observabilitas. Tekanan pada kualitas kode, maintainability, dan UX modern.
        </p>
        <ul>
          <li>Stack: React, Vite, Tailwind, Node, SQL, Three.js</li>
          <li>Prinsip: modular, low-coupling, high-cohesion, DX bagus</li>
          <li>Perf: lazy-load, code-split, cache-aware, aksesibilitas</li>
        </ul>
      </div>
    </Section>
  )
}