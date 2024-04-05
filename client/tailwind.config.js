
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Include the gridTemplateRows configuration
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      fontSize: {
        '9px': '9px',
      },
    },
  },
  plugins: [
    // Include the @tailwindcss/aspect-ratio plugin
    require('@tailwindcss/aspect-ratio'),
  ],
}
