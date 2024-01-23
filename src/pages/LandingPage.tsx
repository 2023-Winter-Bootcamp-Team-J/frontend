import React from "react";
import { useState } from "react";
import ThreeParticles from "../components/ThreeParticles";
import NicknameModal from "../components/NicknameModal";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ThreeParticles />
      <div className="flex flex-col justify-center items-center w-[80vw] h-[80vh] absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex text-white text-8xl  p-10 font-['Minecraft']">
          Next-Page
        </div>
        <div className="flex text-white text-center font-bold text-2xl">
          사용자와 AI가 함께<br></br>다음 페이지를 창조해 나가는 서비스
        </div>
        <div className="flex relative w-3/4 h-1/2 justify-center top-20">
          <img
            className="flex w-5/6 absolute  text-white "
            src="/asset/book.svg"
            alt="책 이미지"
          ></img>
          <button
            className="flex absolute font-medium z-30 text-black w-1/6 h-1/6 text-4xl  bg-green-400 rounded-2xl font-['Minecraft'] justify-center items-center hover:bg-blue-500 hover:text-green-400"
            onClick={openModal}
          >
            START
          </button>
        </div>
      </div>
      <NicknameModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LandingPage;
