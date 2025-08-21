import { HTMLAttributes, ReactNode, useRef, useState } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  max?: number
}

export default function TiltCard({ children, max = 14, className = '', ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [t, setT] = useState({ x: 0, y: 0 })
  const [p, setP] = useState({ x: 50, y: 50 })

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (py - 0.5) * max
    const ry = (0.5 - px) * max
    setT({ x: rx, y: ry })
    setP({ x: px * 100, y: py * 100 })
  }
  function onLeave() { setT({ x: 0, y: 0 }) }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden [transform-style:preserve-3d] transition-transform duration-150 ${className}`}
      style={{ transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `radial-gradient(600px circle at ${p.x}% ${p.y}%, rgba(212,175,55,.18), transparent 40%)` }}
      />
      {children}
      <div className="pointer-events-none absolute inset-0 border border-transparent group-hover:border-base-line/80 rounded-2xl" />
    </div>
  )
}
