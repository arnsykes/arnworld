import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export default function useLenis() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.08,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    setMounted(true)
    return () => { lenis.destroy() }
  }, [])

  return { mounted }
}