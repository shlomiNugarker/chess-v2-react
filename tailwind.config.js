/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors from SCSS variables
        primary: '#161512', // $clr1: bg
        secondary: '#bababa', // $clr2: font
        tertiary: '#262421', // $clr3: login form bg
        accent: '#3692e7', // $clr4: login btn
        highlight: '#cdd26a', // $clr5: mark last step
        
        // Chess board colors
        'chess-board-bg': '#646f40',
        'chess-white': '#f0d9b5',
        'chess-black': '#b58863',
        'chess-selected': '#646f40',
        'chess-mark': '#646f40',
        'chess-threatened': '#9b2d2d',
      },
      spacing: {
        // Chess board specific dimensions
        'chess-cell': '70px', // $td-width and $td-height
      },
      fontSize: {
        'chess-piece': '60px', // $td-font-size
      },
      borderRadius: {
        'chess-mark': '50%',
      }
    },
  },
  plugins: [],
}