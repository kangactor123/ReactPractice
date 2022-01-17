import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

export const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.2;
    font-weight:300;
    color: black; 
    
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;

const Wrapper = styled.div`
  background-color:blue;
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255,255,255,0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

//place-self:center;
const Circle = styled(motion.div)`
  background-color:white;
  height:70px;
  width:70px;
  place-self:center;
  border-radius:35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

`;

const boxVariants = {
  start: {
    opacity:0,
    scale:0.5
  },
  end: {
    opacity:1,
    scale:1,
    transition: {
      type:"spring",
      duration:0.5,
      bounce:0.5,
      delayChildren:0.5,
      staggerChildren:0.1,
    }
  }
}

const circleVariants = {
  start:{
    opacity:0,
    y:10
  },
  end: {
    opacity:1,
    y:0
  }
}

//animation을 설정했다.
//설정을 분리된 object로 옮긴거다.
/*
const myVars = {
  start: {scale:0},
  end: {scale:1, rotateZ:360, transition: {type:"spring", delay:0.5}}
}
variants={myVars} initial="start" animate="end"
*/

//시작하는 방식 initial
//final style : animate
//부모 컨테이너에 initial, animate가 있다면 자식 컴퍼넌트에 전달된다.
//부모랑 자식이랑 initial, animate 이름이 똑같기 때문에 props로 전달해주지 않아도 된다.
function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants}/>
        <Circle variants={circleVariants}/>
        <Circle variants={circleVariants}/>
        <Circle variants={circleVariants}/>
      </Box>
    </Wrapper>
  );

}
export default App;