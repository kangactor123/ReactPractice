import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

interface IDummy {
  text?: string;
  bgColor: string;
  active?:boolean;
}

function Dummy({text, bgColor, active=false}:IDummy) {
  return (
    <Container>
      {text?text:"default value"}
    </Container>
  );
}

function App() {
  const onClick = (event:React.FormEvent<HTMLButtonElement>) => {
    event.currentTarget.value
  }
  return (
    <Container>
      <Dummy text="hi" bgColor="tomato"/>
      <Dummy bgColor="teal" active/>
      <form>
        <button onClick={onClick}>onClick</button>
      </form>
    </Container>
  );
}

export default App;

/*
import styled from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="tomato" borderColor="blue"/>
      <Circle text="hello everybody" bgColor="teal"/>
    </div>
  );
}

export default App;
*/
