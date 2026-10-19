/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2F6F3E',
          dark: '#245632',
          light: '#3A8A4E',
          subtle: '#1C4427'
        },
        lime: {
          DEFAULT: '#9ACD4A',
          hover: '#88BA3C',
          light: '#B4DE6E',
          tint: '#F0F9E8'
        },
        sage: {
          DEFAULT: '#EDF4EA',
          light: '#F5F9F3',
          dark: '#D9E6D4'
        },
        warm: {
          white: '#FAFBF8',
          card: '#FFFFFF'
        },
        ink: {
          dark: '#333A35',
          muted: '#6B746D',
          light: '#939D95'
        }
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px -2px rgba(36, 86, 50, 0.08)',
        'medium': '0 12px 36px -4px rgba(36, 86, 50, 0.12)',
        'elevated': '0 20px 48px -8px rgba(36, 86, 50, 0.16)'
      }
    },
  },
  plugins: [],
}
