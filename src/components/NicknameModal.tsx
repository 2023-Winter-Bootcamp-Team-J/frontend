import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms";

interface NicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NicknameModal: React.FC<NicknameModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useRecoilState(userState);
  const [modalnickname, setmodalNickname] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setmodalNickname(e.target.value);
  };

  // NicknameModal.tsx
  const handleOkClick = async () => {
    const nickname = modalnickname;
    try {
      // 사용자가 입력한 닉네임을 API에 전송
      const response = await axios.post("/api/v1/nicknames/", {
        nickname,
      });

      // HTTP 상태 코드에 따라 처리
      if (response.status === 201) {
        // 성공
        console.log("닉네임 생성에 성공했습니다.");
        console.log(user);
        // setUser 함수를 사용하여 user 정보 업데이트
        setUser({
          user_id: response.data.data.id,
          nickname: response.data.data.nickname,
        });
        onClose();
        navigate("/main");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 실패 (HTTP 상태 코드 400) 또는 다른 예외 발생 시 에러 상태 업데이트
      console.error("닉네임 생성 중에 오류가 발생했습니다.", error);

      // AxiosError일 경우 더 자세한 정보를 로깅
      if (axios.isAxiosError(error)) {
        console.error("AxiosError:", error.toJSON());
      }

      // 실제 서버에서 반환한 오류 메시지가 어떤 내용인지 콘솔에 로깅
      if (error.response && error.response.data) {
        console.error("서버 응답 오류:", error.response.data);
      }

      setError("닉네임 생성 중에 오류가 발생했습니다. 다시 시도해주세요.");
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

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
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
            value={modalnickname}
            onChange={handleInputChange}
            className="flex text-xl w-1/2 h-[35px] justify-center items-center text-center text-black font-Minecraft border-2 border-white"
            placeholder="Input Text"
          />
          {error && (
            <p className="text-gray-400 visible fixed bottom-[108px]">
              {error}
            </p>
          )}
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
