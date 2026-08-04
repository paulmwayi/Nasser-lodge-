/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1611", // warm near-black, base background
        cream: "#F6EFE4", // primary light text / light surfaces
        gold: "#C98A2C", // Barotse sunset accent
        teal: "#1F3B36", // Zambezi river secondary accent
        clay: "#8B5E3C", // warm wood tertiary
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(28,22,17,0.15) 0%, rgba(28,22,17,0.55) 60%, rgba(28,22,17,0.95) 100%)",
      },
    },
  },
  plugins: [],
};
