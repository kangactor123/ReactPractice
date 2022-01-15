import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius:5px;
  margin-bottom:5px;
  padding:10px 10px;
  background-color: ${props => props.theme.cardColor};
`;

interface IDraggableCard {
    key:string;
    todo: string;
    index: number;
}

//react memo : react.js에게 Prop이 바뀌지 않는다면 컴포넌트를 렌더링 하지 말라고 한다.
function DraggableCard({ key, todo, index }: IDraggableCard) {
    console.log(todo, "has been randered");
    return (
        <Draggable key={todo} draggableId={todo} index={index}>
            {(magic) =>
                <Card ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
                    {todo}
                </Card>}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
//react 에게 prop이 변하지 않으면 rerendering 하지 말라고 말해주는 것