import {atom, selector} from "recoil";

interface ITodoState {
    [key:string] : string[];
}

export const toDoState = atom<ITodoState>({
    key:"toDo",
    default:{
        "to do": ["a","b"],
        doing: ["c","d","e"],
        done: ["f","g","h"],
    },
})