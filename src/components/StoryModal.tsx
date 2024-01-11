import React from "react";

const StoryModal = () => {
  return (
    <div className="flex flex-col w-[800px] h-[450px]">
      <div className="flex gap-[15px] w-full h-[55px] justify-center items-center bg-blue-800 border-2 border-gray-400 text-green-400 text-[33px] font-Minecraft">
        STORY
        <div className="text-gray-300 text-[20px]">by 앤드류</div>
      </div>
      <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] stone-50 border-2 border-gray-400 ">
        <div className="flex justify-center w-full h-[270px] gap-[60px]">
          <div className="w-[270px] bg-gray-500">이미지</div>
          <div className="flex flex-col justify-center w-[360px] gap-[10px]">
            <div className="flex items-center w-[360px] gap-[20px]">
              <img className="flex w-[50px]" src="/asset/hand.svg" alt="손" />
              <textarea className="w-[300px] h-[140px] p-[5px] border-dashed border-2 border-gray-500 bg-transparent ">
                알렉스는 지역에서 유명한 폐허가 된 저택을 탐험하기로 결심한다.
                이 저택은 오랫동안 불길한 소문이 돌아왔으며, 많은 사람들이
                그곳에 가는 것을 꺼려합니다.
              </textarea>
            </div>
            <div className="flex items-center w-[360px] gap-[20px]">
              <img className="flex w-[50px]" src="/asset/hand.svg" alt="손" />
              <textarea className="w-[300px] h-[140px] p-[5px] border-dashed border-2 border-gray-500 bg-transparent ">
                알렉스는 지역에서 유명한 폐허가 된 저택을 탐험하기로 결심한다.
                이 저택은 오랫동안 불길한 소문이 돌아왔으며, 많은 사람들이
                그곳에 가는 것을 꺼려합니다.
              </textarea>
            </div>
          </div>
        </div>
        <button className="flex w-[50px] justify-center mt-[10px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600">
          OK
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
