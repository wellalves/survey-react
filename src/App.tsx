import React from 'react';
import { GlobalStyle } from './style/GlobalStyle';
import { ScreenProvider } from './context/ContextScreen';

import { Main } from './pages/Main';

function App() {
  return(
    <>
      <GlobalStyle />
      <ScreenProvider>
        <Main />
      </ScreenProvider>
    </>
  );
}

export default App;
