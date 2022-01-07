import styled, {keyframes} from "styled-components";

/*
const Father = styled.div`
  display: flex;
`;

//props 전달을 통해서 중복된 코드를 줄인다.
const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;

//컴포넌트 확장 (코드가 중복된다.)
const Circle = styled(Box)`
  border-radius:50px;
`;
const Text = styled.span`
  color:white;
`;

const Btn = styled.button`
  width:150px;
  height:40px;
  color:white;
  background-color:tomato;
  border:0;
  border-radius:30px;
`;

//attrs() 함수 안에 object (html attribute)
const Input = styled.input.attrs({ required:true, minLength:10 })`
  background-color:tomato;
  border:0;
`;
*/

const Wrapper = styled.div`
  display:flex;
  width:100%;
  height:100%;
  background-color:${props=>props.theme.backgroundColor};
`;


//animation을 사용하는 방법
export const rotateAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius:0;
  }
  50% {
    border-radius:120px;
  }
  100% {
    transform:rotate(350deg);
    border-radius:0px;
  }
`;

const Emoji = styled.p`
  font-size:36px;
  &:hover{
    font-size:98px;
  }
`;

//animation을 활용하고 또 다른 selector(내부 자식태그를 지정하고 스타일 변경)
const Box = styled.div`
width:200px;
height:200px;
background-color:${(props) => props.bgColor};
display:flex;
justify-content:center;
align-items:center;
animation:${rotateAnimation} 3s linear infinite;
  ${Emoji}:hover {
    font-size:98px;
    cursor:pointer; 
  }
`;

//extend Box
const Circle = styled(Box)`
  border-radius:50px;
  ${Emoji}:hover{
    opacity:0;
  }
`;

const Title = styled.h1`
  color:${props=>props.theme.textColor};
`;

//as prop을 통해서 스타일은 같지만 태그를 변경해줄 수 있음
function App() {
  return (
    <Wrapper>
      <Title>hi</Title>
    </Wrapper>
  );
}

export default App;
