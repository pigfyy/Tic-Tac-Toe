/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "aqua-400": "#65E9E4",
      "aqua-600": "#31C3BD",
      "orange-400": "#FFC860",
      "orange-600": "#F2B137",
      "neutral-100": "#DBE8ED",
      "neutral-200": "#A8BFC9",
      "neutral-700": "#1F3641",
      "neutral-900": "#1A2A33",
      "neutral-active": "rgba(168, 191, 201, 0.05)",
    },
    fontSize: {
      L: "2.5rem",
      M: "1.5rem",
      S: "1.25rem",
      XS: "1rem",
      "2XS": "0.875rem",
    },
    boxShadow: {
      orangeShadow: "0px -8px 0px 0px #CC8B13 inset",
      aquaShadow: "0px -8px 0px 0px #118C87 inset",
      darkBlueShadow: "0px -8px 0px 0px #10212A inset",
      orangeShadowThin: "0px -4px 0px 0px #CC8B13 inset",
      neutralShadowThin: "0px -4px 0px 0px #6B8997 inset",
      darkBlueShadowThin: "0px -4px 0px 0px #10212A inset",
    },
    dropShadow: {
      "2xl": "0px 4px 4px 0px #00000040",
    },
    extend: {
      maxWidth: {
        L: "28.75rem",
        "2XS": "2.5rem",
      },
      minHeight: {
        "4REM": "4rem",
      },
    },
  },
  plugins: [],
};
