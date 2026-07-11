import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1828',
          soft: '#12263B',
          mist: '#1D3A57',
        },
        gold: {
          DEFAULT: '#C9A227',
          bright: '#E9B949',
          pale: '#F3E3B3',
        },
        ivory: '#FAF6EC',
        sand: '#F1E8D6',
        ink: '#1C2B3A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sunrise: {
          '0%': { transform: 'translateY(30%) scale(0.96)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        sunrise: 'sunrise 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
