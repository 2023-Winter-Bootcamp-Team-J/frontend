import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Carousel from "../components/ImgCarousel";
import Lottie from "lottie-react";
import lottieData from "../assets/lottie.json";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

interface CreateStoryModalProps {
  parentStoryID: number;
  isOpen: boolean;
  closeModal: () => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  parentStoryID,
  isOpen,
  closeModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const userId = useRecoilValue(userState).user_id;
  const [content, setContentValue] = useState("");
  const [taskID, setTaskID] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false); // Lottie를 트리거
  const [generationCount, setGenerationCount] = useState<number>(0);
  // Lottie 애니메이션 완료 시 호출되는 콜백
  const handleLottieComplete = () => {
    setIsGenerating(false); // Lottie 숨기기
  };

  // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기\
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    // 입력을 100글자로 제한
    if (inputValue.length <= 100) {
      setContentValue(inputValue);
      setCharacterCount(inputValue.length);
      // console.log(characterCount);
    }
  };
  const handleClick = () => {
    if (generationCount < 3) {
      CreateScenario(); // 이미지 생성 요청
      setIsGenerating(true); // Lottie 보여주기 시작
      setGenerationCount((count) => count + 1);
    } else {
      alert("이미지 생성 요청은 최대 3회까지 가능합니다.");
    }
  };

  const handleCurrentIndexChange = (index: number) => {
    setCurrentImageIndex(index);
    // currentIndex를 활용한 로직을 추가하세요.
  };
  const CreateScenario = async () => {
    try {
      if (!content.trim()) {
        // content가 공백인 경우 400에러 방지
        console.log("문장을 입력하세요!");
        alert("문장을 입력하세요!");
        return;
      }
      const response = await axios.post(`/api/v1/stories/images`, {
        content,
      });
      if (response.status === 202) {
        console.log("이미지 생성 요청 성공!");

        // 응답이 성공적인 경우 상태 업데이트
        setContentValue(content);
        setTaskID(response.data.task_id);
        console.log(response.data.task_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 이미지가 생성되었을 때만 ShowImage 함수 호출
      if (taskID) {
        ShowImage();
      }
    }, 5000);
    const ShowImage = async () => {
      try {
        if (!taskID) {
          console.log("taskID가 없습니다.");
          return;
        }
        const response = await axios.get(`/api/v1/stories/images`, {
          params: {
            task_id: taskID,
          },
        });

        if (response.status === 200) {
          console.log("이미지 조회 성공!");
          const newImageUrl = response.data.image_url.image_url;

          // 이전에 생성한 이미지 배열에 추가
          setImages((prevImages) => [...prevImages, newImageUrl]);

          // setImageUrl(newImageUrl);
          const imageUrl = response.data.image_url;
          setImageUrl(imageUrl.image_url);
          console.log(imageUrl.image_url);

          // 이미지가 정상적으로 받아졌으므로 타이머 중지
          clearInterval(intervalId);
          setIsGenerating(false); // Lottie 숨기기
        }
      } catch (error) {
        console.error(error);
      }
      console.log(images);
    };
    return () => clearInterval(intervalId);
  }, [taskID]);

  const handleClickOk = async () => {
    console.log("parent: ", parentStoryID);
    const latestImageUrl = images.length > 0 ? images[images.length - 1] : "";
    // Ok 버튼 클릭 시 /api/v1/stories/ 요청
    setIsGenerating(true); // Lottie 보여주기 시작
    try {
      const storiesResponse = await axios.post(`/api/v1/stories/`, {
        user_id: userId,
        content,
        image_url: latestImageUrl,
        parent_story: parentStoryID,
      });

      // 성공적으로 응답을 받았을 때 처리
      if (storiesResponse.status === 201) {
        console.log(storiesResponse.data.message);
        console.log(storiesResponse.data.data);
        closeModal();
      }
    } catch (error) {
      console.error("스토리 생성 중 에러 발생:", error);
    } finally {
      setIsGenerating(false); // Lottie 숨기기
    }
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
      className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="z-20 flex absolute flex-col w-[800px] h-[450px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex w-full h-[55px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          NEW STORY
        </div>
        <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] bg-black border-2 border-white text-white">
          {isGenerating && (
            <div className="absolute z-50 flex justify-center items-center gap-[10px] bg-gray-500 bg-opacity-50 w-full h-[395px]">
              <Lottie
                animationData={lottieData}
                onComplete={handleLottieComplete}
              />
            </div>
          )}
          <div className="flex justify-center w-full h-[270px] gap-[80px]">
            <div className="flex flex-col w-[270px] gap-[5px]">
              <div className="w-[270px] h-[270px] z-10 bg-[#1d1e1e]">
                {imageUrl && (
                  <Carousel
                    images={images}
                    onCurrentIndexChange={handleCurrentIndexChange}
                  />
                )}
              </div>
              <div className="flex justify-center text-white font-[16px] leading-[20px]">
                {currentImageIndex + 1} of 3
              </div>
            </div>
            <div className="flex flex-col justify-center w-[300px] gap-[17px] text-center">
              <div className="text-[18px] text-white">
                시나리오 시작하기 (제목)
              </div>
              <textarea
                placeholder="문장을 입력하세요."
                className="h-[140px] p-[5px] mb-[20px] border-dashed border-2 border-white bg-transparent text-white"
                value={content}
                onChange={handleContentChange}
                maxLength={100}
                style={{ resize: "none" }}
              ></textarea>
              <div className=" flex flex-col items-end  text-white top-10 ">
                {characterCount}/{100}
              </div>
              <button
                className="text-center w-full h-[30px] bg-green-400 border-2 border-gray-500 text-black hover:bg-blue-600 hover:text-white hover:shadow-blue-600"
                onClick={handleClick}
              >
                사진 생성하기 {currentImageIndex + 1} of 3
              </button>
            </div>
          </div>
          <button
            className="flex w-[70px] justify-center mt-[10px] pt-[3px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            onClick={handleClickOk}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateStoryModal;
