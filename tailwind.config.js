/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "925px",
        lg: "1210px",
        xl: "1490px",
      },
    },
    fontFamily: {
      Minecraft: ["Minecraft"],
      DungGeunMo: ["DungGeunMo"],
    },
  },
  plugins: [],
};
