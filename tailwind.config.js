/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    "./src/theme.js",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#19191B",
        "accent-color": "#5454D4",
      },
      backgroundImage: {
        "blue-blob":
          "linear-gradient(180deg, rgba(84, 84, 212, 0.27) 0%, rgba(84, 84, 212, 0.11) 100%)",
        "red-blob":
          "linear-gradient(180deg, rgba(251, 168, 28, 0.11) 0%, rgba(224, 86, 136, 0.06) 100%)",
      },
      animation: {
        spinner: "spin 1500ms linear infinite",
        rotate: "rotating 10s linear infinite",
        float: "floating 10s linear infinite",
      },
      keyframes: {
        rotating: {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(20deg)",
          },
        },
        floating: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "25%": {
            transform: "translate(-10px, 10px) scale(1.1)",
          },
          "75%": {
            transform: "translate(10px, -10px) scale(0.9)",
          },
        },
      },
    },
  },
  presets: [require("keep-react/preset")],
  plugins: [],
};
