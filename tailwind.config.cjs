/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors:{
        cyanPrimary: '#1AB5BA',
        cyanSecondary: '#28A9AC',
        pinkPrimary: '#CB0767',
        pinkDark: '#530B2E',
        cyanDark: '#3C7D83',
        yellowPrimary: '#FCDD44',
      },
      lineHeight: {
        'none': '1.0',
      },
      fontFamily:{
        'poppins-regular':['Poppins-Regular','sans-serif'],
        'poppins-bold':['Poppins-Bold','sans-serif'],
        'poppins-extrabold':['Poppins-Extrabold','sans-serif'],
        'poppins-semibold':['Poppins-Semibold','sans-serif'],
      },
      dropShadow: {
        'box': [
          '0 1px 5px #E3554410',
          '0 -2px 5px #E3554410',
        ]
      }
    },
  },
  plugins: [],
}
