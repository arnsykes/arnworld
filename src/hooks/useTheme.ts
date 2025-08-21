import { useEffect, useState } from 'react'

type Theme = 'black-gold' | 'red-gold'

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    return saved ?? 'black-gold'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(prev => prev === 'black-gold' ? 'red-gold' : 'black-gold')

  return { theme, toggle }
}