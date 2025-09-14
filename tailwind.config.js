/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern dark theme colors - flattened for proper Tailwind usage
        'background-primary': '#0a0a0a',
        'background-secondary': '#1a1a1a',
        'background-tertiary': '#2a2a2a',
        'background-elevated': '#1e1e1e',
        'background-card': 'rgba(255, 255, 255, 0.05)',

        'surface-primary': '#161618',
        'surface-secondary': '#1c1c1f',
        'surface-elevated': '#262629',
        'surface-glass': 'rgba(255, 255, 255, 0.08)',

        'text-primary': '#ffffff',
        'text-secondary': '#b4b4b4',
        'text-muted': '#8a8a8a',
        'text-accent': '#3b82f6',

        // Enhanced chess colors
        'chess-board-bg': '#4a5d23',
        'chess-board-light': '#f0d9b5',
        'chess-board-dark': '#b58863',
        'chess-board-border': '#8b7355',

        'chess-highlight-selected': 'rgba(180, 200, 42, 0.8)',
        'chess-highlight-possible': 'rgba(100, 111, 64, 0.6)',
        'chess-highlight-threatened': 'rgba(239, 68, 68, 0.8)',
        'chess-highlight-lastMove': '#cdd26a',

        // UI element colors
        'accent-primary': '#3b82f6',
        'accent-secondary': '#8b5cf6',
        'accent-success': '#10b981',
        'accent-warning': '#f59e0b',
        'accent-error': '#ef4444',

        // Glass morphism colors
        'glass-light': 'rgba(255, 255, 255, 0.05)',
        'glass-dark': 'rgba(0, 0, 0, 0.20)',
        'glass-border': 'rgba(255, 255, 255, 0.10)',

        // Legacy support - keeping for backward compatibility
        primary: '#0a0a0a',
        secondary: '#b4b4b4',
        tertiary: '#2a2a2a',
        accent: '#3b82f6',
        highlight: '#cdd26a',
        'chess-white': '#f0d9b5',
        'chess-black': '#b58863',
        'chess-selected': 'rgba(180, 200, 42, 0.8)',
        'chess-mark': 'rgba(100, 111, 64, 0.6)',
        'chess-threatened': 'rgba(239, 68, 68, 0.8)',
      },

      spacing: {
        'chess-cell': '70px',
        'chess-cell-sm': '45px',
        'chess-cell-xs': '30px',
      },

      fontSize: {
        'chess-piece': '60px',
        'chess-piece-sm': '35px',
        'chess-piece-xs': '25px',
      },

      borderRadius: {
        'chess-mark': '50%',
      },

      backdropBlur: {
        xs: '2px',
      },

      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'chess-board': '0 10px 25px rgba(0, 0, 0, 0.5)',
        'elevated': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'chess-pattern': 'linear-gradient(45deg, #f0d9b5 25%, transparent 25%), linear-gradient(-45deg, #f0d9b5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0d9b5 75%), linear-gradient(-45deg, transparent 75%, #f0d9b5 75%)',
      },
    },
  },
  plugins: [],
}