/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins, sans-serif",
        work: "Work Sans, sans-serif",
      },
      colors: {
        "primary-50": "#D8DDF6",
        "primary-300": "#8B98E5",
        "primary-500": "#3E54D3",
        "primary-700": "#25327F",
        "primary-900": "#0C112A",
        "secondary-50": "#EDFCF8",
        "secondary-300": "#EDFCF8",
        "secondary-500": "#4FE0B6",
        "secondary-700": "#30896F",
        "secondary-900": "#113228",
        "neutral-50": "#F0F0F3",
        "neutral-100": "#E0E1E6",
        "neutral-300": "#A2A5B5",
        "neutral-500": "#646983",
        "neutral-700": "#3C3F4F",
        "neutral-900": "#14151A",
      },
      boxShadow: {
        glow: "0px 4px 10px #8B98E5",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
