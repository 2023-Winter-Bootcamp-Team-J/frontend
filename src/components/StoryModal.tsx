import React from "react";

const StoryModal = () => {
  return (
    <div className="flex flex-col w-[800px] h-[450px]">
      <div className="flex gap-[15px] w-full h-[55px] justify-center items-center bg-blue-800 border-2 border-gray-400 text-green-400 text-[33px] font-Minecraft">
        STORY
        <div className="text-gray-400 text-[18px]">by 앤드류</div>
      </div>
      <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] bg-stone-50 border-2 border-gray-400 ">
        <div className="flex justify-center w-full h-[270px] gap-[80px]">
          <div className="w-[270px] bg-gray-500">이미지</div>
          <div className="flex flex-col justify-center w-[300px] gap-[10px] text-center">
            <div className="flex items-center w-[300px] gap-[20px]">
              <div className="w-[300px] h-[120px] p-[5px] mb-[20px] border-dashed border-2 border-gray-500 bg-transparent ">
                알렉스는 지역에서 유명한 폐허가 된 저택을 탐험하기로 결심한다.
                이 저택은 오랫동안 불길한 소문이 돌아왔으며, 많은 사람들이
                그곳에 가는 것을 꺼려합니다.
              </div>
            </div>
            <div className="flex items-center w-[300px] gap-[20px] hover:scale-105 hover:border-2 border-dashed hover:border-blue-600">
              <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
              <div className="w-[300px] h-[50px] p-[5px]">
                포상금이 10억인걸 알았다. ...
              </div>
            </div>
            <div className="flex items-center w-[300px] gap-[20px] hover:scale-105">
              <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
              <div className="w-[300px] h-[50px] p-[5px] border-dashed  hover:border-2 hover:border-blue-600 bg-transparent ">
                포상금이 5천만원 밖에 안...
              </div>
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
