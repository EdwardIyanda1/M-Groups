/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sets Poppins as the premier sans-serif typeface
        sans: ['Poppins', 'sans-serif'],
        // Sets Playfair Display as the elegant high-tier display header typeface
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}