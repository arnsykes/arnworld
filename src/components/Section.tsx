import { ReactNode } from 'react'

export default function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-16">
      <div className="container">
        <div className="glass" data-animate>
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold gold-text">{title}</h2>
            {subtitle && <p className="text-base-sub mt-2">{subtitle}</p>}
          </header>
          {children}
        </div>
      </div>
    </section>
  )
}
