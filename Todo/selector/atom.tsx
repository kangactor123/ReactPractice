import {atom, selector} from "recoil";

// 하나의 atom으로 hour minute 상태를 관리했다. (1 atom, 1 selector)
export const minuteState = atom({
    key:"minute",
    default:0
});

//set : atom을 수정하는걸 도와줌
//hours가 unknown이기에 selector에 타입을 줬다
export const hourSelector = selector<number>({
    key:"hour",
    get: ({get}) => {
        const minute = get(minuteState);
        return minute/60;
    },
    set: ({set},newValue) => {
        const minutes = Number(newValue)*60;
        set(minuteState, minutes);
    }
})
