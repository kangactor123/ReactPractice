import styled from "styled-components";
import Circle from "./Circle"

const Compt = styled.div`
  width:200px;
  height:200px;
  background-color:tomato;
  border-radius:100px;
`;

function App() {
  return (
    <div>
      <Circle bgColor="teal" borderColor="yellow" />
      <Circle bgColor="tomato" text="hi im tomato" />
    </div>
  );
}

export default App;
