/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // هنا بيفعل الدارك مود باستخدام الكلاس
  theme: {
    extend: {
      lineHeight: {
        loose: "2 !important",
        medium: "1.5 !important",
      },
      animation: {
        "slide-up": "slideUp 0.7s ease-out forwards",
        "slide-right": "slideRight 0.3s ease-in-out forwards",
        "fade-in-up": "0.3s fadeInUp 0.15s forwards",
      },

      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        fadeInUp: {
          "0%": { transform: "translateY(2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
