import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const darkTheme = {
  textColor:"whitesmoke",
  backgroundColor:"#111"
}

const lightTheme = {
  textColor:"#111",
  backgroundColor:"whitesmoke"
}

//App이 ThemeProvider 밑에 있기 때문에 설정된 theme 에 접근 가능
//theme의 property의 이름은 같아야한다!
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
