import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StoryModalProps {
  isOpen: boolean;
  closeStory: () => void;
  storyId: string;
}

const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  closeStory,
  storyId,
}) => {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [childContent, setChildContent] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [user_nickname, setUserNickname] = useState<string>("");

  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기\
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeStory();
    }
  };
  useEffect(() => {
    const ShowRootScenario = async () => {
      try {
        const response = await axios.get(`/api/v1/stories/${storyId}/`, {});
        if (response.status === 200) {
          console.log("단일 시나리오 조회");
          setContent(response.data.data.content);
          setChildContent(response.data.data.child_content);
          setImgUrl(response.data.data.image_url);
          setUserNickname(response.data.data.user_nickname);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen && storyId) {
      // isOpen이 true이고 storyId가 존재할 때에만 API 호출
      ShowRootScenario();
    }
  }, [isOpen, storyId]);

  const handleOkButtonClick = () => {
    // OK 버튼 클릭 시 ScenarioPage로 이동
    navigate("/scenario");
    // ShowRootScenario();
  };
  // console.log(storyId);

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
      className={`fixed z-999 top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="flex flex-col w-[800px] h-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex w-full h-[55px] justify-center items-center bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          STORY
          <div className="text-gray-400 text-[18px] ml-[20px]">
            by {user_nickname}
          </div>
        </div>
        <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] bg-black border-2 border-white text-white">
          <div className="flex justify-center w-full h-[270px] gap-[80px]">
            <div className="w-[270px]">
              <img className="flex" src={imgUrl} alt="Loading..."></img>
            </div>
            <div className="flex flex-col justify-center w-[300px] gap-[17px] text-center">
              <div className="flex items-center w-[300px] gap-[20px]">
                <div className="flex items-center w-[300px] h-[120px] p-[5px] mb-[20px] border-dashed border-2 border-gray-500 bg-transparent ">
                  {content}
                </div>
              </div>
              <div className="flex items-center w-[300px] gap-[20px]">
                <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
                <div className="flex items-center w-[300px] h-[50px] p-[5px] text-gray-400 ">
                  {childContent ||
                    "ok 버튼을 클릭해 이어지는 스토리를 입력해보세요!"}
                </div>
              </div>
              <div className="flex items-center w-[300px] gap-[20px]">
                <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
                <div className="flex items-center w-[300px] h-[50px] p-[5px]  text-gray-400 ">
                  {childContent ||
                    "ok 버튼을 클릭해 이어지는 스토리를 입력해보세요!"}
                </div>
              </div>
            </div>
          </div>
          <button
            className="flex w-[50px] justify-center mt-[10px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            onClick={handleOkButtonClick}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
