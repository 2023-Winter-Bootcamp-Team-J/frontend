import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import SwiperComponent from "@/components/Swiper";
import ScenarioModal from "@/components/ScenarioModal";
import ThreeParticles from "@/components/ThreeParticles";

const MainPage = () => {
  // 선택된 슬라이드의 인덱스를 기억하는 상태
  // const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(
  //   null
  // );
  const [stories, setStories] = useState<[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  //시나리오 모달 관련 함수
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
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

    if (stories.length === 0) {
      RootStory();
    }
  }, [stories]);

  // Swiper 슬라이드를 클릭할 때 스토리 모달 열도록 하는 함수
  const handleSlideClick = (index: number, storyId: string) => {
    // 여기에 슬라이드 클릭 시 수행할 로직 추가
    console.log(`Slide clicked! Index: ${index}, Story ID: ${storyId}`);
  };
  // useEffect(() => {
  //   // selectedSlideIndex가 변경될 때마다 해당 값을 출력
  //   console.log(selectedSlideIndex);
  // }, [selectedSlideIndex]);

  return (
    <div>
      <ThreeParticles />
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col w-full h-full gap-[50px]">
          <Navbar />
          <div className="flex flex-col items-center">
            <hr className="border-white w-[600px]" />
            <div className="flex items-center justify-between gap-[50px] px-[30px] py-[10px]">
              <div className="text-[20px] text-white">닉네임</div>
              <div className="w-[400px] text-[20px] text-white">
                여기에는 제목이 들어갈 자리입니다. 여기에는 제목이 들어갈
                자리입니다. 여기에는 제목이 들어갈 자리입니다.
              </div>
            </div>
            <hr className="border-white w-[600px]" />
          </div>
          <div className="flex justify-center">
            <SwiperComponent onSlideClick={handleSlideClick} />
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
            <ScenarioModal
              isOpen={modalOpen}
              closeModal={() => {
                closeModal();
                // setSelectedSlideIndex(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
