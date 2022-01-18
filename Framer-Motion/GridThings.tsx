import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  gap:300px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width:50vw;
  gap:10px;
  div:first-child,
  div:last-child {
    grid-column:span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  display:flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position:absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;


function App() {
  const [id, setId] = useState<null | string>(null);
  
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map(n => (
        <Box onClick={() => setId(n)} key={n} layoutId={n}/>
        ))}
      </Grid>
      <AnimatePresence>
        {id?<Overlay
            onClick={() => setId(null)}
            initial={{backgroundColor:"rgba(0,0,0,0)"}}
            animate={{backgroundColor:"rgba(0,0,0,0.6)"}} 
            exit={{backgroundColor:"rgba(0,0,0,0)"}}>
          <Box style={{width:400,height:200}} layoutId={id}>
          </Box>
        </Overlay>:null}
      </AnimatePresence>
    </Wrapper>
  );

}
export default App;
