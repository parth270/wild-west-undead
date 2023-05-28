/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bg: "#EDEBE9",
        primary: "#373948",
        secondary: "#AFAEA9",
        shadow: "#D4D2C9",
        value: "#6D5C5C",
      },
    },
    screens: {
      md: { min: "300px", max: "1020px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1020px", max: "1800px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
    },
  },
  plugins: [],
}

