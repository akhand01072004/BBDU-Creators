/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      width: {
        '600': '600px'  // Key is the class name suffix you'll use, value is the actual width.
      },
      margin: {
        '65': '65px',  // 'mr-65': '65px'
      }
    },
  },
  plugins: [],
}

