import { atom } from "recoil";

//atom은 두 가지를 요구 (key:고유해야함)
export const isDarkAtom = atom({
    key:"isDark",
    default:false,
})