import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type FxQuality = 'low' | 'med' | 'high'
type UX = {
  fx: FxQuality
  setFx: (v: FxQuality) => void
  scanline: boolean
  setScanline: (v: boolean) => void
  reduced: boolean
}
const Ctx = createContext<UX | null>(null)

export function UXProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const [fx, setFx] = useState<FxQuality>(() => {
    const saved = (localStorage.getItem('fx') as FxQuality) || null
    if (saved) return saved
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    return isMobile ? 'low' : 'med'
  })
  const [scanline, setScanline] = useState<boolean>(() => localStorage.getItem('scanline') === '1')

  useEffect(() => { localStorage.setItem('fx', fx) }, [fx])
  useEffect(() => { localStorage.setItem('scanline', scanline ? '1' : '0') }, [scanline])

  const v = useMemo<UX>(() => ({ fx, setFx, scanline, setScanline, reduced: prefersReduced }), [fx, scanline, prefersReduced])
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>
}
export default function useUX() {
  const v = useContext(Ctx)
  if (!v) throw new Error('UX context missing')
  return v
}
