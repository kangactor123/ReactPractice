import React from 'react';
import ReactDOM from 'react-dom';
import App, { Global } from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <Global/>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

