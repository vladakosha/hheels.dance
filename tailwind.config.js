/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/assets/hero-img.jpg')",

      },
      colors: {
        'dark-blue': '#2D333E',
        'light-blue': '#94A9C9',
        'red': '#BB4251',
        'nude': '#C9ADA7',
      },
      fontFamily: {
        'serif': ['Bell-MT', 'ui-serif', 'Georgia'],
      'sans': ['Open Sans', 'ui-sans-serif', 'system-ui'],

    }
     
  },
  plugins: [],
}
}
