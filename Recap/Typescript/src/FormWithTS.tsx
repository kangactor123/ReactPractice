import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    const {currentTarget:{value}} = event;
    setValue(value);
  };
  //event가 어디서 왔지? 그리고 이 event는 누가 발생시켰지?
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`hello! ${value}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" placeholder="userName"/>
        <button>log in</button>
      </form>
    </div>
  );
}

export default App;
