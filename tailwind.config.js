/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blacksite: '#020202',
        dark: '#080808',
        panel: '#0e0e0e',
        panel2: '#141414',
        borderline: '#1e1e1e',
        orange: '#d4560a',
        orangeBright: '#f06a1a',
        redAlert: '#cc2200',
        amber: '#d97706',
        greenSafe: '#22c55e',
        cyanGlitch: '#00fff0',
        body: '#c8c8c8',
        dim: '#666666',
        head: '#f0f0f0'
      },
      fontFamily: {
        display: ['NeueMachina', 'Impact', 'sans-serif'],
        body: ['Gilroy', 'system-ui', 'sans-serif'],
        mono: ['Consolas', 'Share Tech Mono', 'monospace']
      },
      boxShadow: {
        orange: '0 0 28px rgba(212,86,10,.18)'
      },
      animation: {
        ticker: 'ticker 42s linear infinite',
        pulseDot: 'pulseDot 1.2s infinite',
        glitch: 'glitch 4s infinite'
      },
      keyframes: {
        ticker: { to: { transform: 'translateX(-50%)' } },
        pulseDot: { '50%': { opacity: '.35', transform: 'scale(.8)' } },
        glitch: {
          '96%': { transform: 'skewX(-2deg)' },
          '97%': { transform: 'skewX(1deg)' },
          '98%,100%': { transform: 'none' }
        }
      }
    }
  },
  plugins: []
};
