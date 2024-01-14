// NicknameModal.tsx
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';

interface NicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NicknameModal: React.FC<NicknameModalProps> = ({ isOpen, onClose }) => {
  const [nickname, setNickname] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleOkClick = () => {
    console.log('Selected nickname:', nickname);
    onClose();
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
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // 모달이 닫힐 때 외부 클릭 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // 컴포넌트 언마운트 시에 이벤트 리스너 정리
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
        className="flex flex-col w-[600px] h-[350px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 overflow-hidden"
      >
        <div className="flex w-full h-[8vh] justify-center items-center bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          WELCOME
        </div>
        <div className="flex flex-col w-full h-[90vh] justify-center items-center gap-[30px] bg-black border-2 text-white">
          <div className="text-2xl text-white">닉네임을 입력하세요</div>
          <input
            type="text"
            value={nickname}
            onChange={handleInputChange}
            className="flex text-xl w-1/2 h-[35px] justify-center items-center text-center text-black font-Minecraft border-2 border-white"
            placeholder="Input Text"
          />
          <button
            className="flex w-[50px] justify-center items-center mt-[20px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            onClick={handleOkClick}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;
