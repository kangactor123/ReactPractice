import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding-top:10px;
  border-radius:5px;
  width:300px;
  min-height:300px;
  display:flex;
  flex-direction:column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow:1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width:100%;
  input {
    width:100%;
  }
`;

interface IAreaProps {
  isDraggingOver:boolean;
  isDraggingFromThis:boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

//useRef(null) 변수 만든 후 태그에 ref={ref} 연결해주면 (document.getElementById()) 같음
//typescript 에서 ? 조사하자.
function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({toDo}:IForm) => {
    const newToDo = {
      id:Date.now(),
      text: toDo
    }
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo,
        ]
      }
    })
    setValue("toDo","");
  };
  
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {required:true})} type="text" placeholder={`Add task on ${boardId}`}/>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area isDraggingFromThis={Boolean(info.draggingFromThisWith)} isDraggingOver={info.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Board);