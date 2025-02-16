/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This is crucial!
  ],
  theme: {
    extend: {},
  },
  plugins: [scrollbarHide],
};
