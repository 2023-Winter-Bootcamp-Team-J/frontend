import React from "react";

const ScenarioModal = () => {
  return (
    <div className="flex flex-col w-[800px] h-[450px]">
      <div className="flex w-full h-[55px] justify-center items-center bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
        SCENARIO
      </div>
      <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] bg-black border-2 border-white text-white">
        <div className="flex justify-center w-full h-[270px] gap-[80px]">
          <div className="w-[270px] bg-gray-500">이미지</div>
          <div className="flex flex-col justify-center w-[300px] gap-[17px] text-center">
            <div className="text-[18px] text-white">
              시나리오 시작하기(제목)
            </div>
            <textarea className="h-[140px] p-[5px] mb-[20px] border-dashed border-2 border-white bg-transparent text-white">
              알렉스는 지역에서 유명한 폐허가 된 저택을 탐험하기로 결심한다. 이
              저택은 오랫동안 불길한 소문이 돌아왔으며, 많은 사람들이 그곳에
              가는 것을 꺼려합니다.
            </textarea>
            <div className="text-center w-full h-[30px] bg-green-400 border-2 border-gray-500 text-black hover:bg-blue-600 hover:text-white hover:shadow-blue-600">
              사진 생성하기
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

export default ScenarioModal;
