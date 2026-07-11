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
        // Official EnnobleRise palette — white base, deep compassion blue dark sections
        navy: {
          DEFAULT: '#1E3A8A', // Deep Compassion Blue — official primary
          soft: '#2547A8',
          deep: '#13255E',
          mist: '#31519F',
        },
        royal: '#1E3A8A',
        charcoal: '#111827', // official neutral black
        gold: {
          DEFAULT: '#D9A514', // deepened sunrise gold for rules/borders on white
          bright: '#FBBF24', // Sunrise Gold — official
          pale: '#FDE9AE',
        },
        coral: '#F88379', // Mindful Coral
        teal: '#00A29E', // Resilient Teal
        sky: '#38BDF8', // Hopeful Sky
        leaf: '#0B6623', // Purpose-Driven Green
        ivory: '#FFFFFF', // white base across the site
        sand: '#F5F3F0', // Sandstone Beige — official neutral
        ink: '#1F2937',
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
