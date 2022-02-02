import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

//selector -> atom의 output을 변형시켜서 output할 수 있는 선택자
//get : atom의 output을 변형시켜줌
//set : state 를 set하는걸 도와주는 친구. (atom을 변경하는걸 도와준다!)
//동시에 다른 여러개의 atom을 변경할 수 있다고 생각해봐!
export const hourSelector = selector<number>({
  key: "selector",
  get: ({ get }) => {
    const minute = get(minuteState);
    return Math.floor(minute / 60);
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
