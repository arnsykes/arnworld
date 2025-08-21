import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function useGSAPSections() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-animate]')
    sections.forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1, y: 0, duration: .6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}
