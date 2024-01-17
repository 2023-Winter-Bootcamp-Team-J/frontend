import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [user_id, setUser_Id] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/nicknames/${user_id}`);

        if (response.status === 201) {
          setNickname(response.data.data.nickname);
        }
      } catch (error) {
        console.error('닉네임 불러오기 중에 오류가 발생했습니다.', error);
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <div className="flex w-full h-[60px] my-[10px] justify-between items-center">
      <div className="ml-[30px] text-[25px] font-Minecraft text-white">
        Next-Page
      </div>
      <div className="mr-[30px] text-white">
        {nickname ? `${nickname}님 환영합니다!` : '로딩 중...'}
      </div>
    </div>
  );
};

export default Navbar;
