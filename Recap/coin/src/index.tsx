import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';


//App이 ThemeProvider 밑에 있기 때문에 설정된 theme 에 접근 가능
//ThemeProvider에 컴포넌트가 들어간다면 그 아래 컴포넌트는 모두 Theme에 접근 가능하다.
//theme의 property의 이름은 같아야한다!
//Nested Router -> 라우터 안에 또 다른 라우터가 있는것 (코인 페이지에서 차트, 가격 페이지 생각)
ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);