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
            formButtons: '#6ca3b8',
            hover: '#51849d',
          },
        },
        accent: '#F8FCAD',
        error: '#FFC28A',
        nav: '#111827',
        text: {
          DEFAULT: '#F9FAFB',
        },
        delete: '#FFC28A',
      },
      width: {
        70: '17rem',
        '39vw': '39vw',
        '40vw': '40vw',
      },
      fontSize: {
        17: '17px',
        18: '18px',
      },
      scale: {
        115: '1.15',
        130: '1.30',
        180: '1.80',
        200: '2',
      },
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
      borderRadius: {
        'carcard-box-radius': '10px',
      },
      spacing: {
        'screen-10': '10vh',
        '1/2': '50%',
        '5/12': '41.666667%',
      },
      inset: {
        '-15%': '-15%',
        '-2%': '-2%',
        '-5%': '-5%',
        '18%': '18%',
        '25%': '25%',
        22: '22px',
      },
      height: {
        '77vh': '77vh',
        '79vh': '79vh',
        '80vw': '80vw',
      },
      screens: {
        '3xl': '1920px',
      },
      boxShadow: {
        dim: '2px -4px 49px -3px',
      },
    },
  },
  plugins: [],
}
