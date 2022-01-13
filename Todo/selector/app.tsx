import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atom";

//string 앞에 +를 붙이면 number로 형변환이 된다.
//selector을 쓰고있더라도 array를 리턴받는다
function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onChangeMinute = (event:React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  }
  const onHourChange = (event:React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  }
  return (
    <div>
      <input value={minutes} onChange={onChangeMinute} type="number" placeholder="MINUTES" />
      <input value={hours} onChange={onHourChange} type="number" placeholder="HOURS" />
    </div>
  );
}

export default App;
