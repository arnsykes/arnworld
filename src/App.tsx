import HeaderHUD from './components/HeaderHUD'
import Loader from './components/Loader'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import ToolsPanels from './sections/ToolsPanels'
import Achievements from './sections/Achievements'
import Experience from './sections/Experience'
import About from './sections/About'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import useLenis from './hooks/useLenis'
import SettingsPanel from './components/SettingsPanel'
import { UXProvider } from './context/UX'
import GlobalBackground from './three/GlobalBackground'
import useGSAPSections from './hooks/useGSAPSections'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'

export default function App() {
  useLenis()
  useGSAPSections()
  return (
    <UXProvider>
      <GlobalBackground />
      <div className="app-shell min-h-screen bg-transparent text-base-text">
        <Loader />
        <ScrollProgress />
        <HeaderHUD />
        <main className="relative z-10">
          <Hero />
          <section className="container py-10"><div className="divider" /></section>
          <Projects />
          <ToolsPanels />
          <Achievements />
          <Experience />
          <About />
          <Contact />
        </main>
        <Footer />
        <SettingsPanel />
        <div className="global-vignette pointer-events-none fixed inset-0 -z-[5]" />
        <CursorGlow />
      </div>
    </UXProvider>
  )
}
