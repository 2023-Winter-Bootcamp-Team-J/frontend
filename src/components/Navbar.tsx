import React, { useEffect, useRef, useState } from "react";
import { userState } from "../recoil/atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";

const Navbar = () => {
  // Recoil에서 전역 상태를 가져옵니다.
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [onLogOut, setOnLogOut] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useRecoilState(userState);

  const handleNavigate = () => {
    // '/landingpage'로 페이지 이동
    navigate("/");
  };

  const handleLogOutModal = () => {
    setOnLogOut(true);
  };

  const handleClickLogOut = () => {
    localStorage.clear();
    setUser({
      user_id: 0,
      nickname: "",
    });
    navigate("/");
  };

  // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기\
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOnLogOut(false);
    }
  };

  const nicknameApi = async () => {
    try {
      const response = await axios.get(`/api/v1/nicknames/${user.user_id}`);
      console.log("nickname: ", response.data.data.nickname);
      setNickname(response.data.data.nickname);
    } catch (error) {
      console.error("Error: ", error);
      localStorage.clear();
      setUser({
        user_id: 0,
        nickname: "",
      });
    }
  };

  useEffect(() => {
    nicknameApi();
  }, []);

  useEffect(() => {
    if (onLogOut) {
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
  }, [onLogOut]);

  return (
    <div className="flex w-full h-[60px] px-[30px] my-[10px] justify-between items-center z-1">
      <button
        className="text-[25px] font-Minecraft text-white"
        onClick={handleNavigate}
      >
        <span>
          <span className="text-blue-600">N</span>ext-
          <span className="text-green-400">P</span>age
        </span>
      </button>
      <div className="text-white cursor-pointer">
        {nickname ? (
          <div className="relative">
            <span className="text-white">
              <span onClick={handleLogOutModal} className="text-green-400">
                {nickname}
              </span>
              님 환영합니다!
            </span>
            {onLogOut && (
              <div
                ref={modalRef}
                className="flex items-center gap-[5px] absolute left-0 top-[30px] p-[5px] bg-white text-black z-10 hover:text-blue-600"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.324))",
                }}
              >
                <svg
                  className="w-[10px] "
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
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                <div onClick={handleClickLogOut} className="text-[10px]">
                  LOGOUT
                </div>
              </div>
            )}
          </div>
        ) : (
          <span onClick={handleNavigate} className="text-gray-400">
            로그인 후 이용해주세요.
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
