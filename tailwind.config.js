/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "925px",
        lg: "1210px",
        xl: "1490px",
        md: "925px",
        lg: "1210px",
        xl: "1490px",
      },
      fontFamily: {
        Minecraft: ["Minecraft"],
        DungGeunMo: ["DungGeunMo"],
        NextPage: ["NextPage"],
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100px)" },
        },
        "slide-bl": {
          "0%": {
            transform: "translateY(-60px) translateX(50px)",
          },
          "100%": {
            transform: "translateY(40px) translateX(-50px)",
          },
        },
        "scale-up-center": {
          "0%": {
            transform: "scale(0.5)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "scale-up-hor-left": {
          "0%": {
            transform: "scaleX(0.5)",
            transformOrigin: "0% 0%",
          },
          "100%": {
            transform: "scaleX(1)",
            transformOrigin: "0% 0%",
          },
        },
        "scale-up-ver-bottom": {
          "0%": {
            transform: "scaleY(0.4)",
            transformOrigin: "0% 100%",
          },
          "100%": {
            transform: "scaleY(1)",
            transformOrigin: "0% 100%",
          },
        },
        "scale-up-ver-top": {
          "0%": {
            transform: "scaleY(0.4)",
            transformOrigin: "100% 0%",
          },
          "100%": {
            transform: "scaleY(1)",
            transformOrigin: "100% 0%",
          },
        },
        "flip-card": {
          "0%, 20%, 100%": {
            transform: "rotateX(0)",
          },
          "50%, 70%": {
            transform: "rotateX(180deg)",
          },
        },
      },
      animation: {
        "slide-left":
          "slide-left 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-bl": "slide-bl 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-up-center":
          "scale-up-center 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "scale-up-hor-left":
          "scale-up-hor-left 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "scale-up-ver-top":
          "scale-up-ver-top 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "scale-up-ver-bottom":
          "scale-up-ver-bottom 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "flip-card": "flip-card 5s infinite",
      },
    },
    fontFamily: {
      Minecraft: ["Minecraft"],
      DungGeunMo: ["DungGeunMo"],
      NextPage: ["NextPage"],
    },
    keyframes: {
      "slide-left": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100px)" },
      },
      "slide-bl": {
        "0%": {
          transform: "translateY(-60px) translateX(50px)",
        },
        "100%": {
          transform: "translateY(40px) translateX(-50px)",
        },
      },
      "scale-up-center": {
        "0%": {
          transform: "scale(0.5)",
        },
        "100%": {
          transform: "scale(1)",
        },
      },
      "scale-up-hor-left": {
        "0%": {
          transform: "scaleX(0.5)",
          transformOrigin: "0% 0%",
        },
        "100%": {
          transform: "scaleX(1)",
          transformOrigin: "0% 0%",
        },
      },
      "scale-up-ver-bottom": {
        "0%": {
          transform: "scaleY(0.4)",
          transformOrigin: "0% 100%",
        },
        "100%": {
          transform: "scaleY(1)",
          transformOrigin: "0% 100%",
        },
      },
      "scale-up-ver-top": {
        "0%": {
          transform: "scaleY(0.4)",
          transformOrigin: "100% 0%",
        },
        "100%": {
          transform: "scaleY(1)",
          transformOrigin: "100% 0%",
        },
      },
      "flip-card": {
        "0%, 20%, 100%": {
          transform: "rotateX(0)",
        },
        "50%, 70%": {
          transform: "rotateX(180deg)",
        },
      },
    },
    animation: {
      "slide-left":
        "slide-left 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      "slide-bl": "slide-bl 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      "scale-up-center":
        "scale-up-center 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      "scale-up-hor-left":
        "scale-up-hor-left 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      "scale-up-ver-top":
        "scale-up-ver-top 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      "scale-up-ver-bottom":
        "scale-up-ver-bottom 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      "flip-card": "flip-card 5s infinite",
    },
  },
  plugins: [],
};
