/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/styles/*.js",
    "./src/config/Alert.config.js",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "clamp(0.5rem, 0.5vw + 1rem, 1rem)",
      },
      colors: {
        dark: "#19191B",
        "accent-color": "#5454D4",
      },
      backgroundImage: {
        "blue-blob":
          "linear-gradient(180deg, rgba(84, 84, 212, 0.25) 0%, rgba(84, 84, 212, 0.15) 100%)",
        "red-blob":
          "linear-gradient(180deg, rgba(251, 168, 28, 0.20) 0%, rgba(224, 86, 136, 0.10) 100%)",
      },
      animation: {
        spinner: "spin 1500ms linear infinite",
        "rotate-scale": "rotating-scaling 5s linear infinite",
        float: "floating 5s linear infinite",
        flick: "flicking 2s linear infinite",
      },
      keyframes: {
        "rotating-scaling": {
          "0%, 100%": {
            transform: "rotate(0deg) scale(0.7)",
          },
          "50%": {
            transform: "rotate(40deg) scale(1)",
          },
        },
        floating: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "50%": {
            transform: "translate(-10px, 10px) scale(1.1)",
          },
        },
        flicking: {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(10deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
