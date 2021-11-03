import React, { useState, createContext } from 'react';

interface IScreenOptions {
  getScreen: number,
  setScreen: React.Dispatch<React.SetStateAction<number>>
}

export const ScreenContext = createContext<IScreenOptions>({
  getScreen: 1,
  setScreen: () => {}
});

export const ScreenProvider: React.FC = ({ children }) => {

  const [ ScreenState, setScreenState ] = useState(1);

  return(
    <ScreenContext.Provider value={{
      getScreen: ScreenState,
      setScreen: setScreenState
    }}>
      {children}
    </ScreenContext.Provider>
  );
} 