import { atom } from "recoil";

import { recoilPersist } from "recoil-persist"; // 새로고침 시에도 유지
const { persistAtom } = recoilPersist();

interface UserState {
  user_id: number;
  nickname: string;
}

export const userState = atom<UserState>({
  key: "userState",
  default: {
    user_id: 0,
    nickname: "",
  },
  effects_UNSTABLE: [persistAtom],
});
