/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2F5',
          100: '#CCE6EB',
          200: '#99CDD7',
          300: '#66B4C3',
          400: '#339CAF',
          500: '#0E5B71',
          600: '#0C5062',
          700: '#0A4554',
          800: '#083A45',
          900: '#062F37'
        },
        secondary: {
          50: '#F9F3E8',
          100: '#F3E6D1',
          200: '#E7CD9E',
          300: '#DCB56B',
          400: '#D19C38',
          500: '#B58324',
          600: '#94691D',
          700: '#735016',
          800: '#52360F',
          900: '#321D08'
        },
        accent: {
          50: '#FFF3E8',
          100: '#FFE7D1',
          200: '#FECFA3',
          300: '#FDB775',
          400: '#FB9F47',
          500: '#F4A261',
          600: '#D17E3F',
          700: '#AD5B2E',
          800: '#8A371D',
          900: '#66140C'
        }
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif']
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
