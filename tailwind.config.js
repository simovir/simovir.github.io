/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,md,liquid,erb,serb,rb}',
    './frontend/javascript/**/*.js',
  ],
  theme: {
  colors: {
   }, 
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

