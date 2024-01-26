import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // Recoil에서 전역 상태를 가져옵니다.
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  // user가 변경되면 실행
  useEffect(() => {
    // console.log("user: ", user);
  }, [user]);
  const handleNavigate = () => {
    // '/landingpage'로 페이지 이동
    navigate("/");
  };
  return (
    <div className="flex w-full h-[60px] my-[10px] justify-between items-center z-1">
      <button
        className="ml-[30px] text-[25px] font-Minecraft text-white"
        onClick={handleNavigate}
      >
        <span>
          <span className="text-blue-600">N</span>ext-
          <span className="text-green-400">P</span>age
        </span>
      </button>
      {/* <div className="mr-[30px] text-white cursor-pointer"> */}
      <div className="mr-[30px] text-white">
        {user.nickname && (
          <>
            <span className="text-green-400">{user.nickname}</span>
            <span className="text-white">님 환영합니다!</span>
          </>
        )}
        {!user.nickname && "로딩 중..."}
      </div>
    </div>
  );
};

export default Navbar;
