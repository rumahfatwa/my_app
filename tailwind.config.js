module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "santas-gray": "#a3a3aa",
        "cobalt": "#0041c8",
        "cod-gray": "#1c1b1b",
        "scorpion": "#5f5e5e",
        "gun-powder": "#434656",
        "secondary": "#f6f3f2",
        "vista-white": "#fcf9f8",
      }
    },
  },
  plugins: [],
};