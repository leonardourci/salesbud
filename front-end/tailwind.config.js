/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff1e91',
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 