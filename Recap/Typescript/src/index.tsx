import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


//App이 ThemeProvider 밑에 있기 때문에 설정된 theme 에 접근 가능
//theme의 property의 이름은 같아야한다!
ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);