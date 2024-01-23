import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SwiperComponent from "../components/Swiper";
import ScenarioModal from "../components/ScenarioModal";
import ThreeParticles from "../components/ThreeParticles";
import axios from "axios";

const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [update, setUpdate] = useState(-1);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [stories, setStories] = useState<
    Array<{
      story_id: number;
      user_id: number;
      user_nickname: string;
      content: string;
      image_url: string;
    }>
  >([]);

  //시나리오 모달 관련 함수
  const closeModal = () => {
    setModalOpen(false);
    setStories(stories);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const handleUpdate = () => {
    setUpdate(update * -1);
  };

  const RootStory = async () => {
    try {
      const response = await axios.get(`/api/v1/stories/`);
      if (response.status === 200) {
        console.log(response.data.message); //전체 루트 스토리 조회
        const stories = response.data.data;
        setStories(stories);
      }
    } catch (error) {
      console.error("루트 스토리 조회 중 에러 발생");
    }
  };

  const handleSwiper = (index: number) => {
    setCurrentStoryIndex(index);
  };

  useEffect(() => {
    RootStory();
  }, [update]);
  return (
    <div>
      <ThreeParticles />
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col w-full h-full gap-[50px]">
          <Navbar />
          <div className="flex flex-col items-center h-[145px]">
            <hr className="border-white w-[600px]" />
            <div className="flex items-center justify-between gap-[50px] px-[30px] py-[10px]">
              <div className="text-[20px] text-white">
                {stories[currentStoryIndex]?.user_nickname}
              </div>
              <div className="w-[400px] text-[20px] text-white">
                {stories[currentStoryIndex]?.content}
              </div>
            </div>
            <hr className="border-white w-[600px]" />
          </div>
          <div className="flex justify-center">
            <SwiperComponent
              stories={stories}
              modalOpen={modalOpen}
              onSlideClick={handleSwiper}
            />
          </div>
          <button className="absolute bottom-12 right-14 z-10">
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
            <ScenarioModal
              isOpen={modalOpen}
              closeModal={() => {
                closeModal();
              }}
              handleUpdate={() => {
                handleUpdate();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
