import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface StoryModalProps {
  story_id: number;
  isOpen: boolean;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({
  story_id,
  isOpen,
  onClose,
}) => {
  const [storyId, setStoryId] = useState(story_id);
  const [story, setStory] = useState<{
    user_nickname: string;
    content: string;
    image_url: string;
    child_id: number[];
    child_content: string[];
  } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  // console.log("story_id: ", story_id);

  const handleClickChildren = (childId: number) => {
    console.log("child: ", childId);
    if (childId) {
      setStoryId(childId);
    }
  };

  // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 외부 클릭 이벤트 리스너 등록
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // 모달이 닫힐 때 외부 클릭 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // 컴포넌트 언마운트 시에 이벤트 리스너 정리
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    console.log("**story_id: ", storyId);
    const storyAPI = async () => {
      try {
        const response = await axios.get(`api/v1/stories/${storyId}`);
        console.log("response: ", response.data.data);
        if (response.data.data) {
          // 데이터가 존재할 때만 state 업데이트
          setStory({
            user_nickname: response.data.data.user_nickname,
            content: response.data.data.content,
            image_url: response.data.data.image_url,
            child_id: response.data.data.child_id,
            child_content: response.data.data.child_content,
          });
        }
      } catch (error) {
        console.error("Error fetching story data:", error);
      }
    };

    storyAPI();
  }, [storyId]);

  useEffect(() => {
    console.log("story: ", story);
  }, [story]);

  return (
    <div
      className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div ref={modalRef} className="flex flex-col w-[800px] h-[450px] z-10">
        <div className="flex gap-[15px] w-full h-[55px] justify-center items-center bg-blue-800 border-2 border-gray-400 text-green-400 text-[33px] font-Minecraft">
          STORY
          <div className="text-gray-400 text-[18px]">
            by {story?.user_nickname ? `${story.user_nickname}` : "LOADING..."}
          </div>
        </div>
        <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] bg-black text-white border-2 border-gray-400 ">
          <div className="flex justify-center w-full h-[270px] gap-[80px]">
            <div className="w-[270px] bg-gray-500">
              <img
                className="w-full block"
                src={story?.image_url ? `${story.image_url}` : ""}
                alt="슬라이드4"
              />
            </div>
            <div className="flex flex-col justify-center w-[300px] gap-[10px]">
              <div className="flex items-center w-[300px] gap-[20px]">
                <div className="w-[300px] h-[120px] p-[5px] mb-[20px] border-dashed border-2 border-gray-500 bg-transparent ">
                  {story?.content ? `${story.content}` : "LOADING..."}
                </div>
              </div>
              <div className="flex items-center w-[300px] gap-[20px] hover:scale-105 hover:border-2 border-dashed hover:border-blue-600">
                <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
                <div
                  onClick={() => {
                    handleClickChildren(
                      story?.child_id && story.child_id[0]
                        ? story.child_id[0]
                        : 0
                    );
                  }}
                  className="w-[300px] h-[50px] p-[5px]"
                >
                  {story?.child_content && story.child_content[0] ? (
                    `${story.child_content[0]}`
                  ) : (
                    <span className="text-blue-600">
                      새로운 이야기를 만들어보세요!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center w-[300px] gap-[20px] hover:scale-105">
                <img className="flex w-[40px]" src="/asset/hand.svg" alt="손" />
                <div
                  onClick={() => {
                    handleClickChildren(
                      story?.child_id && story.child_id[1]
                        ? story.child_id[1]
                        : 0
                    );
                  }}
                  className="w-[300px] h-[50px] p-[5px] border-dashed  hover:border-2 hover:border-blue-600 bg-transparent "
                >
                  {story?.child_content && story.child_content[1] ? (
                    `${story.child_content[1]}`
                  ) : (
                    <span className="text-blue-600">
                      새로운 이야기를 만들어보세요!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button className="flex w-[50px] justify-center mt-[10px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
