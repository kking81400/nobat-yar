/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#316263', // Transformative Teal approx — primary
          50: '#f3f7f7',
          100: '#e6efef',
          200: '#bfd9d9',
          300: '#99c3c3',
          400: '#4d9b98',
          500: '#316263',
          600: '#294f4d',
          700: '#213a39',
          800: '#182626',
          900: '#0f1313'
        }
      }
    }
  },
  plugins: []
}
