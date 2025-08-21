import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()
  const [fake, setFake] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [show, setShow] = useState(true)

  // progress palsu agar bar selalu jalan
  useEffect(() => {
    const id = setInterval(() => setFake(v => Math.min(95, v + 3)), 60)
    return () => clearInterval(id)
  }, [])

  // trigger fade-out lalu unmount
  useEffect(() => {
    const p = Math.max(progress || 0, fake)
    if (p >= 95 && !exiting) {
      setExiting(true)
      const t = setTimeout(() => setShow(false), 400)
      return () => clearTimeout(t)
    }
  }, [progress, fake, exiting])

  if (!show) return null

  return (
    <div
      id="global-loader"
      className={`fixed inset-0 z-[9999] grid place-items-center bg-base-bg transition-opacity duration-300 ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-20 w-20">
          <svg className="animate-spin absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="var(--line)" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r="40" stroke="var(--gold)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="60 190" />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-sm font-semibold">
            {Math.round(Math.max(progress || 0, fake))}%
          </span>
        </div>
        <div className="text-xs text-base-sub">Memuat pengalaman 3D…</div>
      </div>
    </div>
  )
}
