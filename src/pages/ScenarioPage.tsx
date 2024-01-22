import ParticleTutorial from "@/components/ThreeParticles";
import ForceGraph from "@/components/ForceGraph";
import Navbar from "@/components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StoryModal from "@/components/StoryModal";
import CreateStoryModal from "@/components/CreateStoryModal";
import axios from "axios";

const ScenarioPage = () => {
  const location = useLocation();
  const state = location.state as { story_id: number };
  const story_id = state.story_id; // story_id 전달 받기
  const navigate = useNavigate(); // 뒤로 가기

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // 모달 관리

  const [scenario, setScenario] = useState([]); // d3 시나리오
  const [clickStoryId, setClickStoryId] = useState(story_id); // 클릭한 시나리오 조회

  const [ratio, setRatio] = useState(1); // 줌in/out비율 조작

  const handleClickBack = () => {
    // 뒤로 가기
    navigate(-1);
  };

  const openModal = (storyId: number) => {
    console.log("click_id: ", story_id);
    // 클릭한 스토리 아이디로 모달 열기
    setClickStoryId(storyId);
    setIsStoryModalOpen(true);
  };

  const closeModal = () => {
    // 둘 다 닫히게
    setIsStoryModalOpen(false);
    setIsCreateModalOpen(false);
  };

  const handleClickStory = (story_id: number) => {
    // 스토리 생성 or 조회
    if (story_id < 0) {
      // 생성
      setIsStoryModalOpen(false);
      setIsCreateModalOpen(true);
    } else {
      // 조회
      setClickStoryId(story_id);
    }
  };

  // zoom in/out 기능
  const wheelHandler = (e: React.WheelEvent) => {
    if (ratio <= 2.5) {
      setRatio((ratio) => (ratio >= 0.7 ? ratio + 0.001 * e.deltaY : 0.7));
    } else {
      setRatio(2.5);
    }
  };

  useEffect(() => {
    const scenarioAPI = async () => {
      try {
        const response = await axios.get(
          `api/v1/stories/branches/${story_id}/`
        );
        // console.log("response: ", response.data.data);
        if (response.data.data.length > 0) {
          setScenario(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching scenario data:", error);
      }
    };

    scenarioAPI();
  }, [story_id, isCreateModalOpen]);

  return (
    <div className="overflow-hidden">
      <ParticleTutorial />
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden flex flex-col w-full h-full">
          <Navbar />
          <div
            id="StockContainer"
            className="relative top-0 left-0 overflow-hidden"
            style={{
              width: `${200 / ratio}%`,
              height: `${200 / ratio}%`,
              transform: `scale(${ratio})`,
              transformOrigin: "left top",
            }}
            onWheel={wheelHandler}
            draggable
          >
            <div
              id="Frame"
              className="overflow-hidden w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <ForceGraph openmodal={openModal} scenario={scenario} />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleClickBack}
        className="w-[50px] h-[50px] text-white absolute left-8 bottom-8"
      >
        <svg
          className="hover:scale-125 hover:opacity-35 h-full drop-shadow"
          style={{
            filter: "drop-shadow(7px 1px 8px rgba(255, 255, 255, 0.7))",
          }}
          data-slot="icon"
          fill="none"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          ></path>
        </svg>
      </div>
      {isStoryModalOpen && (
        <div className="z-10 w-full h-full">
          <StoryModal
            storyId={clickStoryId}
            isOpen={isStoryModalOpen}
            onClose={closeModal}
            handleClickStory={handleClickStory}
          />
        </div>
      )}
      {isCreateModalOpen && (
        <div className="z-20">
          <CreateStoryModal
            parentStoryID={clickStoryId}
            isOpen={isCreateModalOpen}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default ScenarioPage;
