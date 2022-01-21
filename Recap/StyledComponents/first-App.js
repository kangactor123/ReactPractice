import styled from "styled-components";
/*
1. styled-component
 props를 전달해줄 때 그냥 props를 입력해주고 컴포넌트 안에서 사용하면 된다. 
 (타입스크립트를 사용할 땐 해당 property가 어떤 타입인지 명시해야한다.)
*/


const Father = styled.div`
  display:flex;
  justify-content: space-between;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width:100px;
  height:100px;
`;

//Styled-components를 확장하자 styled(arg)
const Circle = styled(Box)`
  border-radius: 50px;
`;

//as attrs을 이용하면 컴포넌트의 HTML 태그를 바꿀 수 있다.
const Btn = styled.button`
  color:white;
  background-color: tomato;
  border:0;
  border-radius: 15px;
`;

//styled-componets 의 attrs() 함수를 통해서 attrs을 전달
const Input = styled.input.attrs({required:true, minLength:10})`
  background-color: tomato;
`;


function App() {
  return (
    <Father>
      <Input/>
      <Input/>
      <Input/>
      <Input/>
    </Father>
  );
}

export default App;
