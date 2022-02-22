import { useEffect, useRef } from "react";

const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (confirm(message)) {
      onConfirm();
    } else {
      onCancel();
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
