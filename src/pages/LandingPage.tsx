import React from "react";
import { useState } from "react";
import ThreeParticles from "../components/ThreeParticles";
import NicknameModal from "../components/NicknameModal";
import Onboading3 from "@/components/OnBoarding3";
import Onboading4 from "@/components/Onboarding4";

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
      <div className="flex flex-col justify-center items-center w-[80vw] h-[80vh] font-['NextPage'] absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex text-white text-8xl  p-10">
          <span>
            <span className="text-blue-600">N</span>ext-
            <span className="text-green-400">P</span>age
          </span>
        </div>
        <div className="flex text-white text-center font-bold text-2xl">
          <span>
            사용자와 <span className="text-blue-600">AI</span>가 함께<br></br>
            다음 페이지를 창조해 나가는 서비스
          </span>
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
      <Onboading3 />
      <Onboading4 />
    </div>
  );
};

export default LandingPage;
