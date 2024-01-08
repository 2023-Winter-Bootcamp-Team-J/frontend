import Navbar from "@/component/Navbar";
import Swiper from "@/component/Swiper";
import React from "react";

const MainPage = () => {
  return (
    <div className="flex w-[100vw] h-[100vh] bg-black">
      <div className="flex flex-col w-full h-full gap-[50px]">
        <Navbar />
        <div className="flex flex-col items-center">
          <hr className="border-white w-[500px]" />
          <div className="flex justify-center items-center gap-[80px] py-[10px]">
            <div className="text-[20px] text-white">
              여기에는 제목이 들어갈 자리입니다.
            </div>
            {/* <img className="w-[50px]" src="/asset/diamond.svg" alt="이미지" /> */}
            <div className="text-[20px] text-white">닉네임</div>
          </div>
          <hr className="border-white w-[500px]" />
        </div>
        <div className="flex justify-center">
          <Swiper />
        </div>
        <div className="flex justify-end pr-[20px]">
          <img src="/asset/write.svg" alt="글버튼" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
