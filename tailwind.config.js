/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // gray-50
        ring: 'var(--color-ring)', // deep-forest-green
        background: 'var(--color-background)', // near-white
        foreground: 'var(--color-foreground)', // dark-gray-800
        primary: {
          DEFAULT: 'var(--color-primary)', // deep-forest-green
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // institutional-blue-800
          foreground: 'var(--color-secondary-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // clear-red-600
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-50
          foreground: 'var(--color-muted-foreground)' // gray-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // warm-amber-500
          foreground: 'var(--color-accent-foreground)' // dark-gray-800
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // dark-gray-800
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // dark-gray-800
        },
        success: {
          DEFAULT: 'var(--color-success)', // natural-green-600
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // earthy-orange-600
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // clear-red-600
          foreground: 'var(--color-error-foreground)' // white
        },
        surface: 'var(--color-surface)', // subtle-gray-50
        'text-primary': 'var(--color-text-primary)', // dark-gray-800
        'text-secondary': 'var(--color-text-secondary)' // medium-gray-500
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Noto Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }]
      },
      spacing: {
        '18': '4.5rem',
        '76': '19rem'
      },
      zIndex: {
        '1000': '1000',
        '1100': '1100',
        '2000': '2000'
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-gentle': 'pulseGentle 2s cubic-bezier(0.4, 0, 0.2, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}