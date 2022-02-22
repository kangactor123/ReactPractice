import { useEffect, useRef } from "react";

const useConfirm = (message = "", callback, rejection) => {
  if (typeof callback !== "function") {
    return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      callback();
    } else {
      rejection();
    }
  };
  return confirmAction;
};

export default function App() {
  const deleteWord = () => {
    console.log(`delete word`);
  };
  const abort = () => {
    console.log(`save word`);
  };
  const confirmDelete = useConfirm("are you sure?", deleteWord, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete word</button>
    </div>
  );
}
