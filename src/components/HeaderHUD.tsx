import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import useUX from '../context/UX';
import logo from '../assets/logo.png';

const CLIP =
  'polygon(0 0,100% 0,100% 80%,68% 80%,64% 100%,36% 100%,32% 80%,0 80%)';

export default function HeaderHUD() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { fx, setFx } = useUX();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 0);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const Link = ({ href, children }: { href: string; children: any }) => (
    <a
      href={href}
      className="px-2 py-2 text-[19px] font-semibold hover:opacity-90"
    >
      {children}
    </a>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-[70] pointer-events-none">
      <header
        className="pointer-events-auto transition-all duration-300"
        style={{
          height: 'var(--header-h)',
          WebkitClipPath: CLIP,
          clipPath: CLIP,
          backgroundColor: scrolled ? 'rgba(17,20,47,.92)' : '#11142F',
          backdropFilter: scrolled ? 'blur(8px) saturate(180%)' : undefined,
          border: '1px solid rgba(255,255,255,.12)',
        }}
      >
        <nav className="max-w-[1320px] mx-auto h-full grid grid-cols-3 items-center gap-2 px-2">
          {/* kiri */}
          <div className="hidden md:flex items-center gap-1 justify-start">
            <Link href="#home">Home</Link>
            <Link href="#projects">Projects</Link>
            <Link href="#tools">Tools & Panels</Link>
            <Link href="#contact">Contact</Link>
          </div>

          {/* tengah brand */}
          <a href="#home" className="mx-auto flex items-center gap-3 select-none">
            <img src={logo} alt="ARN" className="h-[56px] w-[56px] rounded-md" />
            <div className="leading-tight">
              <div className="text-[26px] font-extrabold gold-text">ARN</div>
              <div className="text-[16px] header-shine">
                let’s build gamer-grade apps
              </div>
            </div>
          </a>

          {/* kanan */}
          <div className="ml-auto hidden md:flex items-center gap-3 justify-end">
            <select
              value={fx}
              onChange={(e) => setFx(e.target.value as any)}
              className="rounded-lg border border-base-line bg-base-card px-3 py-2 text-[12px]"
              title="FX Quality"
            >
              <option value="low">FX Low</option>
              <option value="med">FX Med</option>
              <option value="high">FX High</option>
            </select>
            <ThemeToggle />
          </div>

          {/* mobile */}
          <div className="md:hidden flex items-center justify-between col-span-3 px-2">
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-[var(--gold)] text-3xl"
              aria-label="menu"
            >
              &#9776;
            </button>
            <div className="flex items-center gap-2">
              <select
                value={fx}
                onChange={(e) => setFx(e.target.value as any)}
                className="rounded-lg border border-base-line bg-base-card px-2 py-1 text-xs"
              >
                <option value="low">FX Low</option>
                <option value="med">FX Med</option>
                <option value="high">FX High</option>
              </select>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {open && (
          <div className="md:hidden border-t border-base-line bg-base-card/90 backdrop-blur">
            <div className="flex flex-wrap justify-center py-2">
              {['#home', '#projects', '#tools', '#about', '#contact'].map((h) => (
                <a key={h} href={h} className="px-3 py-2 text-[18px] font-semibold">
                  {h.replace('#', '').replace('-', ' & ').replace(/^\w/, (m) => m.toUpperCase())}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
