/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'apple': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'white-smoke': '#f5f5f5',
      }
    },
  },
  plugins: [],
} 