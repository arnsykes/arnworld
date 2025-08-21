import HeroLanyard from '../three/HeroLanyard';
import TypeTitle from '../components/TypeTitle';
import '../styles/lanyard.css';

export default function Hero() {
  return (
    <section id="home" className="relative">
      <div className="hero-shell">
        <div className="hero-grid">
          {/* kiri */}
          <div className="hero-left">
            <div className="glass-hero scale-[1.06]" data-animate>
              <h1 className="font-display font-extrabold leading-tight gold-text text-4xl md:text-7xl">
                <TypeTitle text="GAMERS-CLASS" />
                <br />
                <TypeTitle text="PORTFOLIO" />
              </h1>
              <p className="mt-2 text-lg md:text-2xl text-base-sub font-semibold">
                Apps • Tools • Panels • Websites
              </p>
              <p className="mt-6 max-w-2xl text-base-sub">
                HUD konsol, warp grid neon, ring energi, dan partikel reaktif. Semua adaptif, ringan, dan smooth-scroll.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#projects" className="btn btn-primary rounded-xl px-5 py-2">
                  Lihat Projects
                </a>
                <a href="#contact" className="btn btn-outline rounded-xl px-5 py-2">
                  Kontak
                </a>
              </div>
            </div>
          </div>

          {/* kanan */}
          <div className="hero-right">
            <HeroLanyard />
          </div>
        </div>
      </div>
    </section>
  );
}
