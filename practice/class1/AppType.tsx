import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    //console.log(event.currentTarget.value);
    //setValue(event.target.value)
    const {
      currentTarget: {value},
    } = event;
    setValue(value);
  };
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello",value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={value} placeholder="username"/>
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;
