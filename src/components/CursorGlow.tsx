import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let x = window.innerWidth / 2, y = window.innerHeight / 2
    let tx = x, ty = y, raf = 0
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      if (ref.current) ref.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="cursor-glow pointer-events-none fixed z-[40] h-[400px] w-[400px]" />
}
