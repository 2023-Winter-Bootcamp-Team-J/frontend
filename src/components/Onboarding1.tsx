import React from "react";
import bgUrl from "../../dist/asset/bg.png";
import "../../src/index.css";

const Onboading1 = () => {
  const bgstyle = {
    width: "100vw",
    height: "960px",
    backgroundImage: `url(${bgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const typingStyle = {
    white_space: "nowrap",
    margine: 0,
    position: "fixed",
    color: "transparent",
  };
  const cursorStyle = {
    content: "Imagine What",
    width: "50%",
    color: "white",
    overflow: "hidden",
    borderRight: "2px solid white",
    animation: "typing 4.5s steps(30) infinite",
  };
  const cursorStyle2 = {
    content: "Make world",
    width: "36%",
    color: "white",
    overflow: "hidden",
    borderRight: "2px solid white",
    animation: "typing 4.5s steps(30) infinite, delay 2s",
  };

  return (
    <div
      className="flex flex-col justify-center gap-[150px] font-['Minecraft']"
      style={bgstyle}
    >
      <div className="flex w-full h-[140px] items-center justify-between px-[130px]">
        <div
          className="w-[650px] text-white text-[80px] whitespace-nowrap"
          style={typingStyle && cursorStyle}
        >
          Imagine What
        </div>
        <div
          className="w-[450px] h-[6px] mt-[50px] bg-green-400"
          style={{
            filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.214)",
          }}
        ></div>
      </div>
      <div
        className="flex justify-center text-white text-[160px] rotating-question-mark"
        style={{
          filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.424))",
        }}
      >
        ?
      </div>
      <div className="flex w-full h-[130px] items-center justify-between px-[130px]">
        <div
          className="text-green-400 text-[100px] mx-8"
          style={{
            filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.214))",
          }}
        >
          {"{"} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          {"}"}
        </div>
        <div
          className="absolute left-[58%] text-white text-[80px] mt-[20px] animate-delay-3s whitespace-nowrap"
          style={typingStyle && cursorStyle2}
        >
          Make World
        </div>
      </div>
    </div>
  );
};

export default Onboading1;
