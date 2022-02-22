import { useEffect, useRef } from "react";

const useClick = (onClick) => {
  const ele = useRef();
  useEffect(() => {
    //componentDidMount, componentDidUpdate
    if (ele.current) {
      ele.current.addEventListener("click", onClick);
    }
    //componentWillUnmount
    return () => {
      if (ele.current) {
        ele.current.removeEventListener("click", onClick);
      }
    };
    //componentWillUpdate
  }, []);
  return ele;
};

export default function App() {
  const onClick = () => {
    console.log("say hello");
  };
  const title = useClick(onClick);
  return (
    <div className="App">
      <h1 ref={title}>hi</h1>
    </div>
  );
}
