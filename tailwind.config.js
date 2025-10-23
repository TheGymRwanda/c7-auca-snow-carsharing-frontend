/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C5F77',
          dark: '#265E78',
          light: {
            DEFAULT: '#3E7591',
            hover: '#51849d',
          },
        },
        accent: '#F8FCAD',
        delete: '#FFC28A',
        nav: '#111827',
        text: {
          DEFAULT: '#F9FAFB',
        },
      },
      fontSize: {
        17: '17px',
        18: '18px',
      },
      scale: {
        115: '1.15',
      },
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
