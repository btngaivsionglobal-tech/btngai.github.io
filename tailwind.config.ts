import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#333436",
        graphite: "#626366",
        mist: "#f7f4ef",
        teal: "#626366",
        coral: "#ff7f18",
        amber: "#ff9a32",
        leaf: "#7a7b7e",
      },
      boxShadow: {
        kiosk: "0 22px 60px rgba(51, 52, 54, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
