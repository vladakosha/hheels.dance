/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#2D333E',
        'light-blue': '#94A9C9',
        'red': '#BB4251',
        'nude': '#C9ADA7',
      },
      fontFamily: {
      'paragraph': ['Open Sans', 'ui-sans-serif', 'system-ui'],
      'serif': ['Bell-MT', 'ui-serif', 'Georgia'],

    }
  },
  plugins: [],
}
}
