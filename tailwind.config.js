/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layout/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Proxima Vara', ...defaultTheme.fontFamily.sans]
    },
    screens: {
      sm: { max: '897px' },
      md: { min: '898px' },
      lg: { min: '1200px' }, 
      xl: { min: '1159px' }, 
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')]
}
