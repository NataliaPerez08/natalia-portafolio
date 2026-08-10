/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'VT323'", "'Courier New'", "Courier", "monospace"],
      },
      colors: {
        crt: {
          bg: "#050505",
          fg: "#e8e8e8",
          dim: "#707070",
          grid: "#0c0c0c",
        },
      },
    },
  },
  plugins: [],
};
