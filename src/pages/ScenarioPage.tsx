import ParticleTutorial from "../components/ThreeParticles";
import ForceGraph from "../components/ForceGraph";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StoryModal from "../components/StoryModal";
import CreateStoryModal from "../components/CreateStoryModal";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";

const ScenarioPage = () => {
  const user = useRecoilValue(userState);
  const { rootId } = useParams() as { rootId: string };
  console.log("rootId: ", rootId);
  const story_id = parseInt(rootId, 10);
  const navigate = useNavigate(); // 뒤로 가기

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // 모달 관리

  const [scenario, setScenario] = useState([]); // d3 시나리오
  const [clickStoryId, setClickStoryId] = useState(story_id); // 클릭한 시나리오 조회

  const handleClickBack = () => {
    // 메인 페이지로 가기
    navigate("/main");
  };

  const openModal = (storyId: number) => {
    console.log("click_id: ", storyId);
    // 클릭한 스토리 아이디로 모달 열기
    setClickStoryId(storyId);
    setIsStoryModalOpen(true);
  };

  const closeModal = () => {
    // 둘 다 닫히게
    setIsStoryModalOpen(false);
    setIsCreateModalOpen(false);
  };

  const handleClickStory = (storyId: number) => {
    // 스토리 생성 or 조회
    if (storyId < 0) {
      if (user.user_id) {
        // 로그인 상태일 때만 시나리오 생성하게 하기
        setIsStoryModalOpen(false);
        setIsCreateModalOpen(true);
      } else {
        alert("로그인 후 생성이 가능합니다.");
      }
    } else {
      // 조회
      setClickStoryId(storyId);
    }
  };

  useEffect(() => {
    console.log("storyId: ", story_id);
    const scenarioAPI = async () => {
      try {
        const response = await axios.get(
          `/api/v1/stories/branches/${story_id}/`
        );
        console.log("response: ", response.data.data);
        if (response.status == 200) {
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
          <ForceGraph openmodal={openModal} scenario={scenario} />
        </div>
      </div>
      {/* <div className="flex gap-1 text-blue-100 text-[14px] absolute right-10 bottom-8"> */}
      <div className="flex gap-1 text-gray-400 text-[14px] absolute right-10 bottom-8">
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
        {/* <span>마우스 휠과 키보드 이동키를 이용해 이동해보세요!</span> */}
        <span>마우스 휠과 키보드 이동키를 이용해 스토리를 따라가보세요!</span>
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
          strokeWidth="2"
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
