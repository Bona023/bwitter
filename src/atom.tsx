import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const darkMode = atom({
    key: "bwitter-darkMode",
    default: false,
    effects_UNSTABLE: [persistAtom],
});
export const loginUserNameAtom = atom({
    key: "bwitterLoginUserName",
    default: "익명",
});
export const loginUserAvatarAtom = atom({
    key: "bwitterLoginUserAvatar",
    default: "",
});
