import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 50vw;
`;

const Box = styled(motion.div)`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  width: 60px;
  height: 30px;
  background-color: white;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  color: blue;
  font-weight: 500;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
`;

function App() {
  const [id, setId] = useState<null | string>(null);
  const [being, setBeing] = useState(false);
  const toggleBeing = () => {
    setBeing((prev) => !prev);
  };
  const to = (position: string) => {
    switch (position) {
      case "1":
        return "bottom right";
      case "2":
        return "bottom left";
      case "3":
        return "top right";
      case "4":
        return "top left";
    }
  };

  //transform origin : 중심을 정하는 것
  return (
    <Wrapper>
      <AnimatePresence exitBeforeEnter>
        <Grid>
          {["1", "2", "3", "4"].map((item) => (
            <Box
              whileHover={{
                transformOrigin: `${to(item)}`,
                scale: 1.1,
              }}
              onClick={() => setId(item)}
              key={item}
              layoutId={item}
            >
              {["2", "3"].includes(item) ? (
                item == "2" ? (
                  being ? (
                    <Circle layoutId="Circle" />
                  ) : null
                ) : !being ? (
                  <Circle layoutId="Circle" />
                ) : null
              ) : null}
            </Box>
          ))}
        </Grid>
        <Button
          onClick={toggleBeing}
          whileTap={{ scale: 1.2, color: "tomato" }}
        >
          Click
        </Button>
        {id ? (
          <Overlay
            onClick={() => {
              setId(null);
            }}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 250,
                backgroundColor: "rgba(255,255,255,1)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
