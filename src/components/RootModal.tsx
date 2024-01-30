import React from "react";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const modalRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [isAnimationComplete1, setIsAnimationComplete1] = useState(false);
  const [isAnimationComplete2, setIsAnimationComplete2] = useState(false);

  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기
    if (
      modalRefs.every(
        (modalRef) => !modalRef.current?.contains(e.target as Node)
      )
    ) {
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
      <div className="flex gap-[100px] z-10">
        <motion.div
          ref={modalRefs[0]}
          className={`flex flex-col w-[420px] h-[670px] z-1`}
          initial={{ opacity: 0, y: 80, rotateY: 700 }}
          animate={{
            opacity: 1,
            y: 0,
            rotateY: 0,
            transition: {
              rotateY: {
                duration: 1,
              },
              y: {
                type: "spring",
                damping: 3,
                stiffness: 50,
                restDelta: 0.01,
                duration: 0.3,
              },
            },
          }}
        >
          <div className="relative flex gap-[15px] w-full h-[55px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 text-[33px] font-Minecraft">
            <span>SCENARIO</span>
            <div className="text-gray-400 text-[14px] absolute bottom-[8px] right-[32px]">
              @ {story?.user_nickname ? `${story.user_nickname}` : "LOADING..."}
            </div>
          </div>
          <div className="flex flex-col w-full h-[615px] justify-center items-center gap-[16px] bg-[#000000ae] text-white border-2 border-gray-400 ">
            <img
              className="block w-[350px] bg-gray-500"
              style={{
                filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.615))",
              }}
              src={story?.image_url ? `${story.image_url}` : ""}
              alt="Image"
            />
            <div className="flex flex-col items-center w-[330px] gap-[10px]">
              <div className="w-[350px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-black ">
                {story?.content ? `${story.content}` : "LOADING..."}
              </div>
            </div>
            <button
              onClick={handleOkButtonClick}
              className="flex w-[70px] h-[35px] justify-center items-center bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            >
              <p className="pt-[4px]">GO !</p>
            </button>
          </div>
        </motion.div>
        <div className="flex flex-col justify-center gap-[80px] z-1">
          {/* NEXT Story Modal1 */}
          {story?.child_content && story.child_content[0] && (
            <motion.div
              className={`flex gap-[40px]`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isAnimationComplete1 ? 1 : 0,
                scale: isAnimationComplete1 ? 1 : 0.5,
              }}
              transition={{ duration: isAnimationComplete1 ? 1 : 1 }}
              onAnimationComplete={() => {
                setIsAnimationComplete1(true);
              }}
            >
              <img className="w-[60px] h-[60px]" src="/asset/hand.svg" alt="" />
              <div
                ref={modalRefs[1]}
                className="flex flex-col w-[370px] h-[235px] z-1"
              >
                <div className="flex gap-[15px] w-full h-[40px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 hover:bg-green-400 hover:text-blue-800 text-[23px] font-Minecraft">
                  NEXT
                </div>
                <div className="flex flex-col w-full h-[220px] justify-center items-center bg-[#000000ae] text-white border-2 border-gray-400 ">
                  <div className="w-[330px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-black">
                    {story?.child_content && story.child_content[0] ? (
                      <p>{story.child_content[0]}</p>
                    ) : (
                      <span className="flex justify-center leading-[8rem] text-gray-400 hover:text-white hover:scale-110">
                        새로운 이야기를 만들어보세요 !
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* NEXT Story Modal2 */}
          <motion.div
            className={`flex gap-[40px]`}
            style={{
              opacity: isOpen ? 0 : 1,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isAnimationComplete2 ? 1 : 0,
              scale: isAnimationComplete2 ? 1 : 0.5,
            }}
            transition={{ duration: isAnimationComplete1 ? 1 : 1 }}
            onAnimationComplete={() => {
              setIsAnimationComplete2(true);
            }}
          >
            <img className="w-[60px] h-[60px]" src="/asset/hand.svg" alt="" />
            <div
              ref={modalRefs[2]}
              className="flex flex-col w-[370px] h-[235px] z-1"
            >
              <div className="flex gap-[15px] w-full h-[40px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 hover:bg-green-400 hover:text-blue-800 text-[23px] font-Minecraft">
                NEXT
              </div>
              <div className="flex flex-col w-full h-[220px] justify-center items-center bg-[#000000ae] text-white border-2 border-gray-400 ">
                <div className="w-[330px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-black hover:text-white ">
                  {story?.child_content && story.child_content[1] ? (
                    <p>{story.child_content[1]}</p>
                  ) : (
                    <span className="flex justify-center leading-[8rem] text-gray-400">
                      새로운 이야기를 만들어보세요 !
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RootModal;
