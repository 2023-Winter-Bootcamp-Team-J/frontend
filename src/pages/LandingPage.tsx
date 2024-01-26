import React from "react";
import { useState } from "react";
import ThreeParticles from "../components/ThreeParticles";
import NicknameModal from "../components/NicknameModal";
import Onboarding1 from "@/components/Onboarding1";
import Onboarding2 from "@/components/Onboarding2";
import Onboarding3 from "@/components/Onboarding3";
import Onboarding4 from "@/components/Onboarding4";

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
      <div className="fixed">
        <ThreeParticles />
      </div>
      {/* <div className="flex gap-1 text-blue-100 text-[14px] absolute left-8 top-8"> */}
      <div className="flex gap-1 text-gray-400 text-[14px] absolute left-8 top-8">
        <svg
          className="w-[15px]"
          data-slot="icon"
          fill="none"
          strokeWidth={2.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
        <span>마우스 커서를 위아래로 움직여보세요!</span>
      </div>
      <div className="flex flex-col justify-center items-center w-[100vw] h-[960px] font-['NextPage'] absolute top-1/2 left-1/2 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex text-white text-[120px]">
          <span>
            <span className="text-blue-600">N</span>ext-
            <span className="text-green-400">P</span>age
          </span>
        </div>
        <div className="flex text-white text-center font-bold text-[23px]">
          <span>
            사용자와 <span className="text-blue-600">AI</span>가 함께
            <br></br>
            다음 페이지를 창조해 나가는 서비스
          </span>
        </div>
        <div className="flex relative w-[1100px] h-[275px] justify-center top-20">
          <img
            className="flex w-5/6 absolute  text-white "
            src="/asset/book.svg"
            alt="책 이미지"
          ></img>
          <button
            className="flex absolute pt-[3px] mt-[20px] font-medium z-30 text-black w-[150px] h-[60px] text-4xl bg-green-400 rounded-2xl justify-center items-center hover:bg-blue-500 hover:text-green-400"
            onClick={openModal}
          >
            START
          </button>
        </div>
      </div>
      <div className="pt-[960px]">
        <Onboarding2 />
        <Onboarding1 />
        <Onboarding3 />
        <Onboarding4 />
      </div>

      <NicknameModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LandingPage;
