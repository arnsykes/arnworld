import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'],
      },
      colors: {
        base: {
          bg: 'var(--bg)',
          card: 'var(--card)',
          text: 'var(--text)',
          sub: 'var(--subtext)',
          line: 'var(--line)',
          gold: 'var(--gold)',
          red: 'var(--red)'
        }
      },
      boxShadow: {
        gold: '0 10px 30px rgba(212,175,55,0.18)',
        red: '0 10px 30px rgba(220,20,60,0.18)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5E6A8 50%, #B88900 100%)',
        'red-gradient': 'linear-gradient(135deg, #D11438 0%, #FF9AA2 50%, #8A0B1B 100%)',
      }
    }
  },
  plugins: [],
} satisfies Config