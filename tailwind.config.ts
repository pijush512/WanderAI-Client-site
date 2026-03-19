import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class", // এটি যোগ করতে ভুলবেন না
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#f59e0b",
        darkBg: "#020617",
      },
    },
  },
  plugins: [],
};
export default config;