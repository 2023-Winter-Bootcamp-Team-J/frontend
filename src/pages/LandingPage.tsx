import React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ThreeParticles from "../components/ThreeParticles";
import NicknameModal from "../components/NicknameModal";
import Onboarding1 from "@/components/Onboarding1";
import Onboarding2 from "@/components/Onboarding2";
import Onboarding3 from "@/components/Onboarding3";
import Onboarding4 from "@/components/Onboarding4";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  // Recoil에서 전역 상태를 가져옵니다.
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topScroll = useRef(null);

  const handleClickStart = () => {
    // 닉네임 생성 기록이 있으면 바로 main으로
    if (user.nickname) {
      navigate("/main");
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div ref={topScroll}>
      <div className="fixed">
        <ThreeParticles />
      </div>
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 1,
              }}
            >
              <span className="text-blue-600">N</span>ext-
              <span className="text-green-400">P</span>age
            </motion.div>
          </span>
        </div>
        <div className="flex text-white text-center font-normal text-[23px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              delay: 0.2,
              duration: 1,
            }}
          >
            <span>
              " 나만의 <span className="text-blue-600">상상</span>을{" "}
              <span className="text-green-400">현실</span>로 "<br></br>
              여러분의 다음 페이지를 만들어보세요
            </span>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: "easeInOut",
            delay: 0.5,
            duration: 1.1,
          }}
        >
          <div className="flex relative w-[1100px] h-[275px] justify-center top-10">
            <img
              className="flex w-5/6 absolute text-white "
              src="/asset/book.svg"
              alt="책 이미지"
            ></img>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                delay: 0.5,
                duration: 1.1,
              }}
            >
              <div className="flex flex-col items-center gap-[10px]">
                <button
                  className="flex z-10 font-medium text-black w-[145px] h-[53px] mt-[30px] text-4xl bg-green-400 rounded-2xl justify-center items-center hover:bg-blue-500 hover:text-green-400"
                  onClick={handleClickStart}
                >
                  <span className="leading-none mt-[6px] ml-[4px]">START</span>
                </button>
                <div className="h-[20px]">
                  <span
                    className="text-white text-[18px]"
                    style={{ display: !user.nickname ? "none" : "block" }}
                  >
                    <span className="text-green-400">{user.nickname}</span>님
                    환영합니다 !
                  </span>
                </div>
              </div>
            </motion.div>
            <svg
              onClick={() => {
                window.scrollTo({
                  top: 960,
                  left: 0,
                  behavior: "smooth",
                });
              }}
              className="cursor-pointer absolute bottom-[-120px] text-white animate-bounce"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.324))",
                paddingTop: "30px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="90"
              viewBox="0 0 14 15"
              fill="none"
            >
              <path
                d="M6.99997 14.164L13.207 7.957L11.793 6.543L6.99997 11.336L2.20697 6.543L0.792969 7.957L6.99997 14.164ZM6.99997 8.514L13.207 2.307L11.793 0.892998L6.99997 5.686L2.20697 0.892998L0.792969 2.307L6.99997 8.514Z"
                fill="white"
              />
            </svg>
          </div>
        </motion.div>
      </div>
      <div className="pt-[960px]">
        <Onboarding2 />
        <Onboarding1 />
        <Onboarding3 />
        <Onboarding4 topScroll={topScroll} />
      </div>
      <NicknameModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LandingPage;
