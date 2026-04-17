/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#000000',
        charcoal: '#121212',
        immersive: {
          black: '#000000',
          surface: '#0a0a0a',
          elevated: '#141414',
          border: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.05)',
          muted: 'rgba(255, 255, 255, 0.4)',
          light: 'rgba(255, 255, 255, 0.6)',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          soft: 'var(--accent-glow)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))',
      }
    },
  },
  plugins: [],
}