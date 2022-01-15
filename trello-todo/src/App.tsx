import { useRecoilState } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled, { createGlobalStyle } from "styled-components";
import { toDoState } from "./atom";
import Board from "./components/Board";

const Global = createGlobalStyle`
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
    background-color : ${(props) => props.theme.bgColor};
    color: black; 
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;

const Wrapper = styled.div`
  display:flex;
  margin: 0 auto;
  width:100vw;
  justify-content:center;
  align-items:center;
  height:100vh;
`;

const Boards = styled.div`
  width:100%;display: flex;
  justify-content: center;
  align-items: flex-start;
  height:50vh;
  gap:10px;
`;

//source from , destination to
// 복사해서 하는 이유 : none-mutation을 위해서 (state/atom은 modifier 함수로만 변경되어야한다.)
//splice(whereIndex, deleteCount, insertItem)
function App() {
  const [toDos, setToDo] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //same board movements
      setToDo((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]
        //1. Delete Item on Source.Index
        boardCopy.splice(source.index, 1);
        //2. Put back the item on the destination index
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };

      });
    }
    if (destination?.droppableId !== source.droppableId) {
      //cross board movement
      setToDo((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index,0,draggableId);
        return {
          ...allBoards,
          [source.droppableId]:sourceBoard,
          [destination.droppableId]:destinationBoard
        }
      });
    }
  };
  //droppable의 children은 함수여야만 한다.
  //provided의 handleProps 가 손잡이 역할?
  //beautiful dnd에서는 draggable id와 key는 같아야함
  return (
    <>
      <Global />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );

}
export default App;