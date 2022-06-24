/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight : {
        'container': '75vh',
      },
      padding : {
        'container': '1em 2em 3em',
      },
      maxWidth : {
        'container': '1200px',
      },
      margin: {
        'container': '0 auto',
      }
    },
  },
  plugins: [],
};
