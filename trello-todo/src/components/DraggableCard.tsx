import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
  border-radius:5px;
  margin-bottom:5px;
  padding:10px 10px;
  background-color: ${props => props.isDragging? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging?"0px 2px 5px rgba(0,0,0,0.05)":"none"}
`;

interface IDraggableCard {
    toDoId: number;
    toDoText: string;
    index: number;
}

//react memo : react.js에게 Prop이 바뀌지 않는다면 컴포넌트를 렌더링 하지 말라고 한다.
function DraggableCard({ toDoId, toDoText , index }: IDraggableCard) {
    return (
        <Draggable draggableId={toDoId+""} index={index}>
            {(magic, snapshot) =>
                <Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
                    {toDoText}
                </Card>}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
//react 에게 prop이 변하지 않으면 rerendering 하지 말라고 말해주는 것