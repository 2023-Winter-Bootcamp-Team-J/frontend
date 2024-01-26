import React from "react";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RootModalProps {
  isOpen: boolean;
  closeStory: () => void;
  storyId: number;
}

const RootModal: React.FC<RootModalProps> = ({
  isOpen,
  closeStory,
  storyId,
}) => {
  const navigate = useNavigate();
  const [story, setStory] = useState<{
    user_nickname: string;
    content: string;
    image_url: string;
    child_content: string[];
  } | null>(null);

  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeStory();
    }
  };
  useEffect(() => {
    const ShowRootScenario = async () => {
      try {
        const response = await axios.get(`/api/v1/stories/${storyId}/`);
        if (response.status === 200) {
          console.log("단일 시나리오 조회");
          setStory({
            user_nickname: response.data.data.user_nickname,
            content: response.data.data.content,
            image_url: response.data.data.image_url,
            child_content: response.data.data.child_content,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen) {
      // isOpen이 true이고 storyId가 존재할 때에만 API 호출
      ShowRootScenario();
    }
  }, []);

  const handleOkButtonClick = () => {
    const rootId = storyId;
    navigate(`/scenario/${rootId}`);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 외부 클릭 이벤트 리스너 등록
      document.addEventListener("mousedown", handleBackgroundClick);
    } else {
      // 모달이 닫힐 때 외부 클릭 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleBackgroundClick);
    }
    // 컴포넌트 언마운트 시에 이벤트 리스너 정리
    return () => {
      document.removeEventListener("mousedown", handleBackgroundClick);
    };
  }, [isOpen]);
  return (
    <div
      className={`flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="flex flex-col w-[800px] h-[450px] z-1 absolute top-[25%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 animate-scale-up-ver-center"
      >
        <div className="flex w-full h-[55px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          SCENARIO
          <div className="text-gray-400 text-[18px] ml-[20px]">
            by {story?.user_nickname}
          </div>
        </div>
        <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] bg-black border-2 border-white text-white">
          <div className="flex justify-center w-full h-[270px] gap-[80px]">
            <div className="w-[270px]">
              <img
                className="flex"
                src={story?.image_url}
                alt="Loading..."
              ></img>
            </div>
            <div className="flex flex-col justify-center w-[300px] gap-[17px] text-center text-white">
              <div className="flex items-center w-[300px] gap-[20px]">
                <div className="flex items-center w-[300px] h-[120px] p-[5px] mb-[20px] border-dashed border-2 border-gray-500 bg-transparent ">
                  {story?.content}
                </div>
              </div>
              <div className="flex items-center w-[300px] gap-[20px]">
                <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
                <div className="w-full">
                  {story?.child_content && story.child_content[0] ? (
                    <p className="w-[240px] text-[1rem] ellipsis2 ">
                      {story.child_content[0]}
                    </p>
                  ) : (
                    <span className="text-gray-400">
                      새로운 이야기를 만들어보세요!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center w-[300px] gap-[20px]">
                <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
                <div className="w-full">
                  {story?.child_content && story.child_content[1] ? (
                    <p className="w-[240px] text-[1rem] ellipsis2 ">
                      {story.child_content[1]}
                    </p>
                  ) : (
                    <span className="text-gray-400">
                      새로운 이야기를 만들어보세요!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            className="flex w-[55px] justify-center mt-[10px] pt-[3px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            onClick={handleOkButtonClick}
          >
            GO!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RootModal;
