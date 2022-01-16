import {atom, selector} from "recoil";


export interface IToDo {
    id:number;
    text:string;
}

interface ITodoState {
    [key:string] : IToDo[];
}

export const toDoState = atom<ITodoState>({
    key:"toDo",
    default:{
        "To Do": [],
        doing: [],
        done: [],
    },
})