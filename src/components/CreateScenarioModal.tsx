import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Carousel from "./ImgCarousel";
import Lottie from "lottie-react";
import lottieData from "../assets/lottie.json";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

interface CreateScenarioModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleUpdate: () => void;
}
const CreateScenarioModal: React.FC<CreateScenarioModalProps> = ({
  isOpen,
  closeModal,
  handleUpdate,
}) => {
  const userId = useRecoilValue(userState).user_id;
  // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기\
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      !isGenerating
    ) {
      closeModal();
    }
  };
  const modalRef = useRef<HTMLDivElement>(null);
  const [content, setContentValue] = useState("");
  const [taskID, setTaskID] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false); // Lottie를 트리거
  const [generationCount, setGenerationCount] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false); // 안내 메시지

  const errorEvent = (error: any) => {
    if (error.request.status >= 500) {
      console.log("status: ", error.request.status);
      alert("네트워크 연결이 불안정합니다.");
      setIsGenerating(false); // Lottie 보여주기 중지
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Lottie 애니메이션 완료 시 호출되는 콜백
  const handleLottieComplete = () => {
    setIsGenerating(false); // Lottie 숨기기
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
      // setIsGenerating(true); // Lottie 보여주기 시작
      // setGenerationCount((count) => count + 1);
    } else {
      alert("이미지 생성 요청은 최대 3회까지 가능합니다.");
    }
  };
  const handleCurrentIndexChange = (index: number) => {
    setCurrentImageIndex(index);
    // currentIndex를 활용한 로직을 추가하세요.
    // console.log("image_index: ", index);
  };
  const CreateScenario = async () => {
    try {
      if (!content.trim()) {
        // content가 공백인 경우 400에러 방지
        console.log("문장을 입력하세요!");
        alert("문장을 입력하세요!");
      } else {
        setIsGenerating(true); // Lottie 보여주기 시작
        const response = await axios.post(`/api/v1/stories/images`, {
          content,
        });
        if (response.status === 202) {
          console.log("이미지 생성 요청 성공!");

          // 응답이 성공적인 경우 상태 업데이트
          setGenerationCount((count) => count + 1);
          setContentValue(content);
          setTaskID(response.data.task_id);
          setCurrentImageIndex(0);
        }
      }
    } catch (error) {
      console.error("이미지 생성 요청 중 에러: ", error);
      errorEvent(error);
    }
  };

  useEffect(() => {
    console.log("currentIndex: ", currentImageIndex);
  }, [currentImageIndex]);

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
          console.log("newImageUrl: ", newImageUrl);

          if (newImageUrl !== undefined) {
            // 이전에 생성한 이미지 배열에 추가
            setImages((prevImages) => [...prevImages, newImageUrl]);

            // setImageUrl(newImageUrl);
            const imageUrl = response.data.image_url;
            setImageUrl(imageUrl.image_url);
            console.log("imageUrl: ", imageUrl.image_url);

            // 이미지가 정상적으로 받아졌으므로 타이머 중지
            clearInterval(intervalId);
            setIsGenerating(false); // Lottie 숨기기
            setCurrentImageIndex(0);
          } else {
            clearInterval(intervalId); // 인터벌 끝내기
            alert("생성에 실패하였습니다. 다시 시도해주세요.");
            setIsGenerating(false); // Lottie 숨기기
          }
        }
      } catch (error) {
        console.error("이미지 불러오기 중 에러: ", error);
        errorEvent(error);
      }
      // console.log(images);
    };
    return () => clearInterval(intervalId);
  }, [taskID]);

  const handleClickOk = async () => {
    const selectedImageUrl = images[currentImageIndex] || ""; // 현재 선택된 이미지
    setIsGenerating(true); // Lottie 보여주기 시작
    try {
      const storiesResponse = await axios.post(`/api/v1/stories/`, {
        user_id: userId,
        content,
        image_url: selectedImageUrl,
        parent_story: -1,
      });

      // 성공적으로 응답을 받았을 때 처리
      if (storiesResponse.status === 201) {
        console.log(storiesResponse.data.message);
        console.log(storiesResponse.data.data);
        handleUpdate();
        closeModal();
      }
    } catch (error) {
      console.error("스토리 생성 중 에러 발생:", error);
      errorEvent(error);
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
  }, [isOpen, isGenerating]);

  return (
    <div
      className={`flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="flex flex-col w-[800px] h-[450px] animate-scale-up-ver-center"
      >
        <div className="flex w-full h-[55px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          NEW SCENARIO
        </div>
        <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[17px] bg-black border-2 border-white text-white">
          {isGenerating && (
            <div className="absolute z-50 flex justify-center items-center gap-[10px] bg-gray-500 bg-opacity-50 w-full h-[395px]">
              <Lottie
                animationData={lottieData}
                onComplete={handleLottieComplete}
              />
            </div>
          )}
          <div className="flex justify-center w-full h-[270px] gap-[80px]">
            <div className="flex flex-col w-[270px] h-[300px]">
              <div className="w-[270px] h-[270px] mb-[10px] z-10 bg-[#1d1e1e]">
                {imageUrl && (
                  <Carousel
                    images={images}
                    onCurrentIndexChange={handleCurrentIndexChange}
                  />
                )}
              </div>
              <div className="flex justify-center text-green-400 font-[16px] leading-[20px]">
                {currentImageIndex + 1}
                <span className="text-white"> &nbsp; / &nbsp; 3</span>
              </div>
            </div>
            <div className="relative flex flex-col justify-center w-[300px] gap-[10px] text-center text-white">
              <div className="w-full flex items-center justify-center">
                <span className="text-[18px]">새로운 시나리오 작성</span>
                <svg
                  className="h-[20px] absolute right-0 hover:text-green-400"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
              </div>
              <div
                className="w-[185px] absolute top-[30px] left-[296px] text-[12px] bg-[#1d1e1e] text-green-400 p-2 text-left"
                style={{ display: isHovered ? "block" : "none" }}
              >
                장면을 자세히 묘사하면 그림의 정확도가 올라갑니다!
                <br />
                (인물, 상황, 장소, 기분 등)
              </div>
              <textarea
                placeholder="문장을 입력하세요."
                className="focus:outline-none font-['DungGeunMo'] h-[140px] p-[7px] border-dashed border-2 border-white bg-transparent"
                value={content}
                onChange={handleContentChange}
                maxLength={100}
                style={{ resize: "none" }}
              ></textarea>
              <div className="flex flex-col items-end text-white">
                {characterCount}/{100}
              </div>
              <button
                className="text-center w-full h-[30px] pl-[40px] bg-green-400 border-2 border-gray-500 text-black hover:bg-blue-600 hover:text-white hover:shadow-blue-600"
                onClick={handleClick}
              >
                사진 생성하기 &nbsp;
                <span className="font-['DungGeunMo'] text-[13px] text-gray-600">
                  {3 - generationCount}회 남음
                </span>
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
export default CreateScenarioModal;
