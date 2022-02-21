import { useState } from "react";

const useInput = (initialValue, validator) => {
  let willUpdate = true;
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    console.log(willUpdate);
    if (willUpdate) {
      setValue(event.target.value);
    }
  };
  return { value, onChange };
};

export default function App() {
  const maxLength = (value) => {
    if (value.length > 10 || value.length < 0) {
      return false;
    } else {
      return true;
    }
  };
  const name = useInput("Mr. ", maxLength);
  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <input
        type="text"
        placeholder="write"
        value={name.value}
        onChange={name.onChange}
      />
    </div>
  );
}
