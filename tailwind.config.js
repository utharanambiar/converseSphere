/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        tilt : {
          '0%, 100%' : {transform : 'rotate(0deg)'},
          '25%': {transform : 'rotate(-10deg)'},
          '75%': {transform : 'rotate(10deg)'},
        }
      },
      animation: {
        rotate: 'rotate 15s linear infinite',
        tilt : 'tilt 5s linear infinite'
      }
    },
    boxShadow: {
      '3xl': '-10px -10px 12px #51519875',
      'all' : '0px 0px 10px 10px #9898a175'
    },
    fontFamily: {
      lato: ['"Lato"']
    }
  },
  plugins: [],
  
}