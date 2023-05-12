import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3A1078",
        secondary: "#2F58CD",
        white: "#ffffff",
      },
    },
    transitionProperty: {
      width: "width",
    },
  },
  plugins: [],
} satisfies Config;
