import styled, { createGlobalStyle } from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef } from "react";

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

const Wrapper = styled(motion.div)`
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  //background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:600px;
  height:600px;
  background-color: rgba(255,255,255,0.4);
  border-radius:40px; 
  overflow:hidden;
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
  hover: {
    scale: 1.2, rotateZ: 90
  },
  click: {
    borderRadius: "100px", scale: 1.0
  },

};
//color를 숫자값(정수)으로 줬기 때문에 animation으로 변함
/*
drag: {
    backgroundColor:"rgb(46, 204, 113)",
    transition:{
      duration:10
    }
}
*/

const Svg = styled.svg`
  width:300px;
  height:300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const svg = {
  start: {
    fill:"rgba(255,255,255,0)",
    pathLength:0,
  },
  end: {
    fill:"rgba(255,255,255,1)",
    pathLength:1,
    
  }
}

//animation을 설정했다.
//설정을 분리된 object로 옮긴거다.
//시작하는 방식 initial
//final style : animate
//부모 컨테이너에 initial, animate가 있다면 자식 컴퍼넌트에 전달된다.
//부모랑 자식이랑 initial, animate 이름이 똑같기 때문에 props로 전달해주지 않아도 된다.
function App() {
  // const biggerBoxRef = useRef<HTMLDivElement>(null);
  //motionValue가 업데이트 될 때 랜더링이 일어나지 않는다. (state가 아니다)
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 194, 238), rgb(0, 87, 238))",
      "linear-gradient(135deg, rgb(0, 238, 127), rgb(186, 238, 0))"
    ]);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  return (
    //이름이 같기에 shortcut
    <Wrapper style={{ background: gradient }}>
      <Svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          default: {duration:5},
          fill: {duration:1, delay:3}
        }}
        d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"></motion.path>
      </Svg>
    </Wrapper>
  );

}
export default App;

/*
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          variants={boxVariants}
          drag
          dragElastic={0.5}
          dragSnapToOrigin
          dragConstraints={biggerBoxRef}
          whileHover="hover"
          whileTap="click"
        />
      </BiggerBox>
    </Wrapper>

*/
