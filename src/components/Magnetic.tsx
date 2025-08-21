import { ReactNode, useRef } from 'react'

export default function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    const dx = ((e.clientX - (r.left + r.width/2)) / r.width) * strength
    const dy = ((e.clientY - (r.top + r.height/2)) / r.height) * strength
    ref.current!.style.transform = `translate(${dx*20}px, ${dy*20}px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }
  return <div onMouseMove={onMove} onMouseLeave={reset} className="inline-block will-change-transform" ref={ref}>{children}</div>
}
