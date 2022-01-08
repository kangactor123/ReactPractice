import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
    bgColor:string;
    borderColor?:string;
    text?:string; //optional
}
interface ContainerProps {
    bgColor:string;
    borderColor:string;
}

const Container = styled.div<ContainerProps>`
    width:200px;
    height:200px;
    background-color:${(props)=>props.bgColor};
    border-radius:100px;
    border:1px solid ${(props)=>props.borderColor};
`;

//const[counter, setCounter] = useState<string|number>(0);
//state 값이 string이 될 수도 number가 될 수도 있다면 제네릭형을 붙여준다. <string | number>
//타입스크립트는 똑똑해서 useState() default value로 타입을 추론한다.
function Circle({bgColor, borderColor, text="default value"}:CircleProps) {
    const[counter, setCounter] = useState(0);
    return (
        <Container bgColor={bgColor} borderColor={borderColor??bgColor}>{text}</Container>
    );
}

export default Circle;
