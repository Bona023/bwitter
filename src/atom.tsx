import { atom } from "recoil";

export const darkMode = atom({
    key: "bwitter-darkMode",
    default: false,
});
export const loginUserNameAtom = atom({
    key: "bwitterLoginUserName",
    default: "익명",
});
export const loginUserAvatarAtom = atom({
    key: "bwitterLoginUserAvatar",
    default: "",
});
