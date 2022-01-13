import { atom, selector, useSetRecoilState } from "recoil";
//selector은 atom의 output을 변형시키는 도구
//selector는 state를 가져가 뭔가를 리턴할거다

const localStorageToDos = localStorage.getItem("ToDos");
const parsedToDos = JSON.parse(localStorageToDos as any);

type categories = "TO_DO"|"DONE"|"DOING";

//enum 열거형은 기본적으로 숫자로 표현된다. (0, 1, 2 ...)
export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface IToDo {
    text:string;
    id: number;
    category:Categories;
}

export const categoryState = atom<Categories>({
    key:"category",
    default:Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
    key:"todo",
    default: parsedToDos?.length > 0 ? parsedToDos : []
});

//selector은 key와 get을 필요로한다
//selector은 atom의 output을 변형시키는 도구다
//selector은 state를 가져다가 atom을 변형시킬 수 있다.
//selector의 get프로퍼티는 get함수를 가지고있는 객체를 첫번째 인자로 받는다
//get 함수가 있어야 atom을 받을 수 있다.
//filter() 배열에서 조건에 맞지 않는 원소를 제거해서 배열을 return 
export const toDoSelector = selector({
    key:"toDoSelector",
    get:({get}) => {
        const toDos = get(toDoState);
        //return 값이 toDoSelector의 value
        const category = get(categoryState);
        return toDos.filter(toDo => toDo.category === category);
    }
});
