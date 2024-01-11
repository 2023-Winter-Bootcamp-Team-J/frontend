import React from 'react';

const NicknameModal = () => {
  return (
    <div className="flex flex-col w-[600px] h-[350px]">
      <div className="flex w-full h-[8vh] justify-center items-center bg-blue-800 border-2 border-white  text-green-400 text-[33px] font-Minecraft">
        WELCOME
      </div>
      <div className="flex flex-col w-full h-[90vh]  justify-center items-center gap-[30px] bg-black border-2 text-white">
        <div className=" text-2xl text-white">닉네임을 입력하세요</div>
        <div className="flex text-xl w-1/2 h-[35px] justify-center items-center text-white font-Minecraft border-2 border-white ">
          Input Text
        </div>
        <button className="flex w-[50px] justify-center items-center mt-[20px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600">
          OK
        </button>
      </div>
    </div>
  );
};

export default NicknameModal;
