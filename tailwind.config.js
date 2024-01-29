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
      fontFamily: {
        Minecraft: ["Minecraft"],
        DungGeunMo: ["DungGeunMo"],
        NextPage: ["NextPage"],
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
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
        "flip-vertical-fwd": {
          "0%": {
            transform: "translateZ(0) rotateY(0)",
          },
          "100%": {
            transform: "translateZ(160px) rotateY(180deg)",
          },
        },
        "scale-up-ver-center": {
          "0%": {
            transform: "scaleY(0.4)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
        "slide-fwd-center": {
          "0%": {
            // transform: "translateZ(0)",
            transform: "rotateY(180deg)",
          },
          "100%": {
            // transform: "translateZ(460px)",
            transform: "rotateY(360deg)",
          },
          // "0%": { transform: "translateZ(-80px)", opacity: "0" },
          // "100%": { transform: "translateZ(0)", opacity: "1" },
        },
      },
      animation: {
        bounce: "bounce 1.5s infinite",
        hidden: "opacity 0.2s",
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
        "flip-vertical-fwd":
          "flip-vertical-fwd 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both",
        "slide-fwd-center":
          "slide-fwd-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-up-ver-center":
          "scale-up-ver-center 0.25s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
    },
  },
  plugins: [],
};
