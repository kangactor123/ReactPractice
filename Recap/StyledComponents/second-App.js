import styled, {keyframes} from "styled-components";

//theme = 기본적으로 모든 색상을 가지고 있는 object

const rotateAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    border-radius:100px;
  }
  100% {
    transform:rotate(360deg);
    border-radius:0px;
  }
`;

const Father = styled.div`
  display:flex;
  background-color:${(props) => props.theme.backgroundColor}
`;

const Emoji = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
`;

/**
  span {
    font-size: 30px;
    &:hover {
      font-size:60px;
    }
  }
  &:active {
    background-color: blue;
  }
 */

//psuedo selector
const Box = styled.div`
  width:200px;
  height:200px;
  background-color: tomato;
  animation: ${rotateAnimation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Emoji}:hover {
    font-size:98px;
  }
`;

function App() {
  return (
    <Father>
      <Box>
        <Emoji>hi</Emoji>
      </Box>
      <Emoji>🥶</Emoji>
    </Father>
  );
}

export default App;

/*
1. styled-component
 props를 전달해줄 때 그냥 props를 입력해주고 컴포넌트 안에서 사용하면 된다. 
 (타입스크립트를 사용할 땐 해당 property가 어떤 타입인지 명시해야한다.)
*/
//Styled-components를 확장하자 styled(arg)
//as attrs을 이용하면 컴포넌트의 HTML 태그를 바꿀 수 있다.
//styled-componets 의 attrs() 함수를 통해서 attrs을 전달
