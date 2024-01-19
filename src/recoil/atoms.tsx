import { atom } from "recoil";

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
});
