import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(2, 1fr); //한 프레임에 두개 들어간다
`;

const Circle = styled(motion.div)`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  place-self: center;
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1.5,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2, //자식 컴포넌트가 차등적으로 하도록
    },
  },
};

const CircleVariants = {
  start: {
    opacity: 0,
    x: -100,
  },
  end: {
    opacity: 1,
    x: 0,
  },
};

//부모의 animate initial props가 자식 컴포넌트에 상속된다
function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
      </Box>
    </Wrapper>
  );
}

export default App;
