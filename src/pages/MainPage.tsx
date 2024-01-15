import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Swiper from "@/components/Swiper";
import ScenarioModal from "@/components/ScenarioModal";
import ThreeParticles from "@/component/ThreeParticles";

const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <ThreeParticles />
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex flex-col w-full h-full gap-[50px]"
          // onClick={handleBackgroundClick}
        >
          <Navbar />
          <div className="flex flex-col items-center">
            <hr className="border-white w-[600px]" />
            <div className="flex items-center justify-between gap-[50px] px-[30px] py-[10px]">
              <div className="text-[20px] text-white">닉네임</div>
              {/* <img className="w-[50px]" src="/asset/diamond.svg" alt="이미지" /> */}
              <div className="w-[400px] text-[20px] text-white">
                여기에는 제목이 들어갈 자리입니다. 여기에는 제목이 들어갈
                자리입니다. 여기에는 제목이 들어갈 자리입니다.
              </div>
            </div>
            <hr className="border-white w-[600px]" />
          </div>
          <div className="flex justify-center">
            <Swiper />
          </div>
          <button className="flex justify-end pb-[10px] pr-[50px]">
            <img
              className="hover:scale-125 hover:opacity-35 h-[50px] drop-shadow"
              style={{
                filter: "drop-shadow(7px 1px 8px rgba(255, 255, 255, 0.7))",
              }}
              onClick={openModal}
              src="/asset/write.svg"
              alt="글버튼"
            />
          </button>
          {modalOpen && (
            <ScenarioModal isOpen={modalOpen} closeModal={closeModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
