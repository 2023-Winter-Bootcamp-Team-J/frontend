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
    <div className="flex w-full h-[60px] my-[10px] justify-between items-center z-10">
      <button
        className="ml-[30px] text-[25px] font-Minecraft text-white"
        onClick={handleNavigate}
      >
        Next-Page
      </button>
      <div className="mr-[30px] text-white cursor-pointer">
        {user.nickname ? `${user.nickname}님 환영합니다!` : "로딩 중..."}
      </div>
    </div>
  );
};

export default Navbar;
