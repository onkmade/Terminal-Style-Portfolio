/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          primary: '#ff6b00',
          secondary: '#ffb347',
          bg: '#0a0a0a',
          surface: '#111111',
          elevated: '#1a1a1a',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255,107,0,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255,107,0,0.5)' },
        }
      }
    },
  },
  plugins: [],
}