import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, toDoSelector, categoryState, toDoState, IToDo } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import React from "react";

const Header = styled.header`
    position:fixed;
    top:0;
    left:0;
    right:0;
    display:flex;
    background-color:#131515;
    height:9vh;
    justify-content:center;
    align-items:center;
    span {
        color:${props => props.theme.textColor};
        font-size:24px;
        font-weight:600;
    }
`
const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    padding:12px;
    max-width:600px;
    margin:0 auto;
    margin-top:60px;
`;
const ListWrapper = styled(Wrapper)`
    margin-top:0px;
`

const ToDoUl = styled.ul`
    width:100%;
`

interface IForm {
    toDo:string;
}


//const value = useRecoilValue(toDoState); value만 가져오고 싶을 때
//const modFn = useSetRecoilState(toDoState); value를 변경하고만 싶을 때
function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    return (
        <div>
            <Header>
                <span>My Todo</span>
            </Header>
            <Wrapper>
                <CreateToDo/>
                <select value={category} onInput={onInput}>
                    <option value={Categories.TO_DO}>To Do</option>
                    <option value={Categories.DOING}>Doing</option>
                    <option value={Categories.DONE}>Done</option>
                </select>
            </Wrapper>
            <ListWrapper>
                <ToDoUl>
                    {toDos?.map((aTodo) => 
                      <ToDo key={aTodo.id} {...aTodo}/>
                    )}
                </ToDoUl>
            </ListWrapper>
            
        </div>

    );
}

export default ToDoList;