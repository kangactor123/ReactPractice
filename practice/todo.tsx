import { IToDo, toDoState } from "../atoms";
import styled from "styled-components";
import React from "react";
import { useSetRecoilState } from "recoil";

const ToDoList = styled.li`
    width:70%;
    height:100px;
    padding:10px;
    margin:0 auto;
    margin-top:10px;
    background-color:#FFC8FF;
    border-radius:15px;
`
const ToDoText = styled.div`
    height:80%;
    text-align:center;
    font-size:16px;
    color:gray;
`;
const ButtonWrap = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`
const ToDoButton = styled.button`
    width:60px;
    height:20px;
    border:0;
    background-color:tomato;
    border-radius:15px;
    color:white;
    margin:0 5px;
    font-size:10px;
    &:hover {
        cursor:pointer;
        color:black;
    }
`

//argument를 담아서 주려면 익명함수 만들어서 함수를 호출하고 매개변수를 담아 그 함수를 리턴해야함
//리액트의 어떤 이벤트이고 어떤 인자에서온

//불변성을 지키면서 원소 교체하는 법
//1. 교체하려는 원소의 위치를 알아야한다.
//2. 교체하려는 원소의 앞, 뒤 배열을 잘라낸다.
//3. 합친다 const final = [...front, 'gamst', ...back];
//... => 안에 있는 원소를 풀어넣는다.
//slice(from, end) 매개변수에 end를 넣지 않는다면 알아서 끝까지 잘라온다.
//target의 경로를 알아야한다.
function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget:{name}} = event;

        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id===id);
            const newToDo = {text, id, category:name as any};
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)];
        });
    }
    return (
        <ToDoList>
            <ToDoText>{text}</ToDoText>
            <ButtonWrap>
                {category !== "DOING" && <ToDoButton name="DOING" onClick={onClick}>Doing</ToDoButton>}
                {category !== "DONE" && <ToDoButton name="DONE" onClick={onClick}>Done</ToDoButton>}
                {category !== "TO_DO" && <ToDoButton name="TO_DO" onClick={onClick}>ToDo</ToDoButton>}
            </ButtonWrap>
        </ToDoList>
    )
}

export default ToDo;
