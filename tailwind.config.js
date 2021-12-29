module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        368: '368px',
        400: '400px',
        500: '500px',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}