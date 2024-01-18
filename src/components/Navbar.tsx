import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms';

const Navbar = () => {
  // Recoil에서 전역 상태를 가져옵니다.
  const user = useRecoilValue(userState);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex w-full h-[60px] my-[10px] justify-between items-center">
      <div className="ml-[30px] text-[25px] font-Minecraft text-white">
        Next-Page
      </div>
      <div className="mr-[30px] text-white">
        {user.nickname ? `${user.nickname}님 환영합니다!` : '로딩 중...'}
      </div>
    </div>
  );
};

export default Navbar;
