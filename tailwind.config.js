/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,md,liquid,erb,serb,rb}',
    './frontend/javascript/**/*.js',
  ],
  theme: {
  colors: {
    'dark-purple' : {
      300: '#0b0530',
      700: '#05011e', 
  }}, 
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

