import React from "react";
import bgUrl from "../../dist/asset/bg.png";
import "../../src/index.css";

const Onboading2 = () => {
  const bgstyle = {
    width: "100vw",
    height: "960px",
    backgroundImage: `url(${bgUrl})`,
    backgroundRepeat: "no-repeat",
  };

  const imgStyle = {
    animation: "imgmove 4s linear infinite",
  };

  const imgStyle2 = {
    animation: "imgmove2 4s linear infinite",
  };
  return (
    <div
      className="flex justify-between px-[160px] overflow-hidden"
      style={bgstyle}
    >
      <div className="flex items-center gap-[40px]">
        <div className="flex text-green-400 text-[130px] font-['Minecraft']">
          {"{"}
        </div>
        <div
          className="flex flex-col flex-nowrap imgmove w-[142px] h-full gap-[15px]"
          style={imgStyle}
        >
          <img src="/asset/img1.png" alt="" />
          <img src="/asset/img2.png" alt="" />
          <img src="/asset/img3.png" alt="" />
          <img src="/asset/img4.png" alt="" />
          <img src="/asset/img5.png" alt="" />
          <img src="/asset/img6.png" alt="" />
          <img src="/asset/img7.png" alt="" />
        </div>
        <div
          className="flex flex-col flex-nowrap imgmove2 w-[142px] h-full gap-[15px]"
          style={imgStyle2}
        >
          <img className="h-[142px]" src="/asset/test.png" alt="" />
          <img className="h-[142px]" src="/asset/test2.png" alt="" />
          <img src="/asset/test3.png" alt="" />
          <img src="/asset/test4.png" alt="" />
          <img src="/asset/test5.png" alt="" />
          <img src="/asset/test6.png" alt="" />
          <img src="/asset/img7.png" alt="" />
        </div>
        <div className="h-[200px] items-center text-green-400 text-[130px] font-['Minecraft']">
          {"}"}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-[100px] text-white text-[35px] font-['DungGeunMo']">
        <div className="translate-x-[-100px] transform rotate-[-30deg] hover:text-green-400 hover:scale-110">
          좀비 세상에서 출근해야 한다면?
        </div>
        <div className="transform rotate-[-20deg] hover:text-green-400 hover:scale-110">
          일어나보니 재벌 3세라면?
        </div>
        <div className="translate-x-[60px] transform rotate-[-10deg] hover:text-green-400 hover:scale-110">
          내 애인이 간첩이라면?
        </div>
        <div className="translate-x-[70px] hover:text-green-400 hover:scale-110">
          로맨스 소설 속에 들어간다면
        </div>
        <div className="translate-x-[60px] transform rotate-[10deg] hover:text-green-400 hover:scale-110">
          지구가 내일 폭발한다면?
        </div>
        <div className="transform rotate-[20deg] hover:text-green-400 hover:scale-110">
          자기야 미안해를 했다면?
        </div>
        <div className="translate-x-[-100px] transform rotate-[30deg] hover:text-green-400 hover:scale-110">
          내가 너라면 아무 말없이
        </div>
      </div>
    </div>
  );
};

export default Onboading2;
