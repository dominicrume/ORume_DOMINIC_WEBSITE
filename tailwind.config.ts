import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette: logo azure + elite metallic gold + white on near-black.
        ink: {
          DEFAULT: '#0A0E1A', // near-black base
          soft: '#111629',
          card: '#141A2E',
        },
        blue: {
          DEFAULT: '#1E90FF', // logo azure (the brand blue)
          deep: '#1466C4', // AA-safe under white text (buttons)
          glow: '#6DB8FF', // light azure for accents/gradients
        },
        // NOTE: the `gold` token now holds the DIAMOND palette (icy silver-blue
        // crystal). Kept the key name so every existing accent class stays valid.
        gold: {
          DEFAULT: '#D8EAF6', // bright crystal (near-white, faint blue)
          soft: '#F5FBFF', // pure sparkle highlight
          deep: '#A9C4DA', // light steel (facet edge)
        },
        paper: '#F8FAFC',
        muted: '#9AA5B8',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        glass: '0 8px 40px -12px rgba(30, 144, 255, 0.38)',
        gold: '0 10px 44px -14px rgba(216, 234, 246, 0.6)', // bright diamond glow
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at 50% 0%, rgba(30,144,255,0.14), transparent 60%)',
        // Diamond metallic: steel -> crystal -> white highlight -> crystal, a
        // faceted silver sheen (the `gold-metallic` key name is kept for reuse).
        'gold-metallic':
          'linear-gradient(135deg, #A9C4DA 0%, #E3F1FB 22%, #FFFFFF 50%, #F0F8FF 66%, #C0D8EA 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
