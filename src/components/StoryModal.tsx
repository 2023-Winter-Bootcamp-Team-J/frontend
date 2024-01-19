import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface StoryModalProps {
  isOpen: boolean;
  closeStory: () => void;
  // storyId: string;
}

const StoryModal: React.FC<StoryModalProps> = ({ isOpen, closeStory }) => {
  const navigate = useNavigate();
  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기\
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeStory();
    }
  };

  const handleOkButtonClick = () => {
    // OK 버튼 클릭 시 ScenarioPage로 이동
    navigate("/scenario");
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
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="flex flex-col w-[800px] h-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex w-full h-[55px] justify-center items-center bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          STORY
          <div className="text-gray-400 text-[18px] ml-[20px]">by Lena</div>
        </div>
        <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] bg-black border-2 border-white text-white">
          <div className="flex justify-center w-full h-[270px] gap-[80px]">
            <div className="w-[270px]">
              <img className="flex" src="/asset/test.png" alt="손" />
            </div>
            <div className="flex flex-col justify-center w-[300px] gap-[17px] text-center">
              <div className="flex items-center w-[300px] gap-[20px]">
                <div className="flex items-center w-[300px] h-[120px] p-[5px] mb-[20px] border-dashed border-2 border-gray-500 bg-transparent ">
                  2012년에 개봉한 영화 건축학개론을 올해 재개봉 할 예정이야.
                  여자 주인공은 한소희가 남자 주인공은 차은우가 등장해.
                </div>
              </div>
              <div className="flex items-center w-[300px] gap-[20px] hover:scale-105 hover:border-2 border-dashed hover:border-blue-600">
                <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
                <div className="flex items-center w-[300px] h-[50px] p-[5px]">
                  여자 주인공은 매일 알바를 2개씩...
                </div>
              </div>
              <div className="flex items-center w-[300px] gap-[20px] hover:scale-105">
                <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
                <div className="flex items-center w-[300px] h-[50px] p-[5px] border-dashed  hover:border-2 hover:border-blue-600 bg-transparent ">
                  남자 주인공의 직업은 아이돌인데...
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
