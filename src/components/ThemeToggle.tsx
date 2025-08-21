import useTheme from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="rounded-xl border border-base-line px-3 py-1.5 text-xs hover:shadow-gold transition">
      {theme === 'black-gold' ? 'Black–Gold' : 'Red–Gold'}
    </button>
  )
}