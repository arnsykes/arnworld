import { StrictMode, Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

function Root() {
  // Prevent flash of wrong theme before React mounts
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) document.documentElement.setAttribute('data-theme', saved)
  }, [])
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)