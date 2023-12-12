import { atom } from "recoil";

export const darkMode = atom({
    key: "bwitter-darkMode",
    default: false,
});

export const usernameAtom = atom({
    key: "bwitterLoginUser",
    default: "익명",
});
