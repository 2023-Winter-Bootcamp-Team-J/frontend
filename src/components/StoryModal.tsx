import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface StoryModalProps {
  storyId: number;
  isOpen: boolean;
  onClose: () => void;
  handleClickStory: (storyID: number) => void;
}

const StoryModal: React.FC<StoryModalProps> = ({
  storyId,
  isOpen,
  onClose,
  handleClickStory,
}) => {
  const [story, setStory] = useState<{
    user_nickname: string;
    content: string;
    image_url: string;
    child_id: number[];
    child_content: string[];
  } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  console.log(storyId);
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
        const response = await axios.get(`/api/v1/stories/${storyId}/`);
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
      className={`flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div ref={modalRef} className="flex gap-[100px]">
        <div className="flex flex-col w-[420px] h-[670px] z-1">
          <div className="flex gap-[15px] w-full h-[55px] justify-center items-center pt-[8px] pl-[35px] bg-blue-800 border-2 border-gray-400 text-green-400 text-[33px] font-Minecraft">
            STORY
            <div className="text-gray-400 text-[18px]">
              @ &nbsp;
              {story?.user_nickname ? `${story.user_nickname}` : "LOADING..."}
            </div>
          </div>
          <div className="flex flex-col w-full h-[615px] justify-center items-center gap-[16px] bg-black text-white border-2 border-gray-400 ">
            <img
              className="block w-[350px] bg-gray-500"
              style={{
                filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.615))",
              }}
              src={story?.image_url ? `${story.image_url}` : ""}
              alt="Image"
            />
            <div className="flex flex-col items-center w-[330px] gap-[10px]">
              <div className="w-[350px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-transparent ">
                {story?.content ? `${story.content}` : "LOADING..."}
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex w-[90px] justify-center bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            >
              CLOSE
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-[80px] z-1">
          {/* Child Story Modal1 */}
          <div
            onClick={() => {
              handleClickStory(
                story?.child_id && story.child_id[0] ? story.child_id[0] : -1
              );
            }}
            className="flex gap-[40px] hover:scale-110"
          >
            <img className="w-[60px] h-[60px]" src="/asset/hand.svg" alt="" />
            <div className="flex flex-col w-[370px] h-[235px] z-1">
              <div className="flex gap-[15px] w-full h-[40px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-gray-400 text-green-400 text-[23px] font-Minecraft">
                CHILD
              </div>
              <div className="flex flex-col w-full h-[220px] justify-center items-center bg-black text-white border-2 border-gray-400 ">
                <div className="w-[330px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 hover:border-blue-600 bg-transparent ">
                  {story?.child_content && story.child_content[0] ? (
                    <p>{story.child_content[0]}</p>
                  ) : (
                    <span className="flex justify-center leading-[8rem] text-blue-600">
                      새로운 이야기를 만들어보세요!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Child Story Modal2 */}
          <div
            onClick={() => {
              handleClickStory(
                story?.child_id && story.child_id[1] ? story.child_id[1] : -1
              );
            }}
            className="flex gap-[40px] hover:scale-110"
          >
            <img className="w-[60px] h-[60px]" src="/asset/hand.svg" alt="" />
            <div className="flex flex-col w-[370px] h-[235px] z-1">
              <div className="flex gap-[15px] w-full h-[40px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-gray-400 text-green-400 text-[23px] font-Minecraft">
                CHILD
              </div>
              <div className="flex flex-col w-full h-[220px] justify-center items-center bg-black text-white border-2 border-gray-400 ">
                <div className="w-[330px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 hover:border-blue-600 bg-transparent ">
                  {story?.child_content && story.child_content[1] ? (
                    <p>{story.child_content[1]}</p>
                  ) : (
                    <span className="flex justify-center leading-[8rem] text-blue-600">
                      새로운 이야기를 만들어보세요!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
