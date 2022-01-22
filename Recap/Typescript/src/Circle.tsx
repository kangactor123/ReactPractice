import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
    bgColor:string;
    borderColor?:string;
    text?:string;
}
//optional : ?    ,   | undefined

const Container = styled.div<CircleProps>`
    width:200px;
    height:200px;
    border-radius: 100px;
    background-color: ${(props) => props.bgColor};
    border: 1px solid ${(props) => props.borderColor};
`;

// optional 일 때  props에 ??를 통해서 default 값을 넘겨줄 수 있다.
// state가 number일수도 있고 string일 수 있다 <number | string>
function Circle({bgColor, borderColor, text = "Default value (syntx ES6)"}:CircleProps) {
    const [counter, setCounter] = useState<number|string>(0);
    return(
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    );
}

export default Circle;
