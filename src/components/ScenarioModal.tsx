import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import Carousel from '../components/ImgCarousel';

interface ScenarioModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ScenarioModal: React.FC<ScenarioModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const imageUrls = [
    '/asset/test.png',
    '/asset/test2.jpeg',
    '/asset/test3.jpeg',
  ];
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기\
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };
  const [user_id, setUserIdValue] = useState(9);
  const [content, setContentValue] = useState('');
  const [parent_story, setParentValue] = useState(-1);
  const [characterCount, setCharacterCount] = useState<number>(0);
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    // 입력을 100글자로 제한
    if (inputValue.length <= 100) {
      setContentValue(inputValue);
      setCharacterCount(inputValue.length);
    }
  };
  const CreateScenario = async () => {
    type ErrorType = {
      response: {
        // data: ResponseType;
        status: number;
      };
    };
    try {
      if (!content.trim()) {
        // content가 공백인 경우 400에러 방지
        console.log('문장을 입력하세요!');
        alert('문장을 입력하세요!');
        return;
      }
      const response = await axios.post(`/api/v1/stories/`, {
        user_id,
        content,
        parent_story,
      });

      if (response.status === 201) {
        console.log('성공!');
        // 응답이 성공적인 경우 상태 업데이트
        setContentValue(content);
        setUserIdValue(user_id);
        setParentValue(response.data);
      }
    } catch (error) {
      console.error(error);
      const errorObj = error as ErrorType;
      console.log(errorObj.response.status);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 외부 클릭 이벤트 리스너 등록
      document.addEventListener('mousedown', handleBackgroundClick);
    } else {
      // 모달이 닫힐 때 외부 클릭 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleBackgroundClick);
    }

    // 컴포넌트 언마운트 시에 이벤트 리스너 정리
    return () => {
      document.removeEventListener('mousedown', handleBackgroundClick);
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div
        ref={modalRef}
        className="flex flex-col w-[800px] h-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex w-full h-[55px] justify-center items-center bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          SCENARIO
        </div>
        <div className="flex flex-col w-full h-[395px] justify-center items-center gap-[10px] bg-black border-2 border-white text-white">
          <div className="flex justify-center w-full h-[270px] gap-[80px]">
            <div className="w-[300px]">
              <Carousel images={imageUrls} />
            </div>

            <div className="flex flex-col justify-center w-[300px] gap-[17px] text-center">
              <div className="text-[18px] text-white">
                시나리오 시작하기 (제목)
              </div>
              <textarea
                // type="text"
                placeholder="문장을 입력하세요."
                className="h-[150px] p-[10px]  border-dashed border-2 border-white bg-transparent text-white"
                value={content}
                onChange={handleContentChange}
                maxLength={100}
                style={{ resize: 'none' }}
              ></textarea>
              <div className=" flex flex-col items-end  text-white top-10 ">
                {characterCount}/{100}
              </div>
              <button
                className="text-center w-full h-[30px] bg-green-400 border-2 border-gray-500 text-black hover:bg-blue-600 hover:text-white hover:shadow-blue-600"
                onClick={CreateScenario}
              >
                사진 생성하기
              </button>
            </div>
          </div>
          <button
            className="flex w-[50px] justify-center mt-[10px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioModal;
