import React, { useState, useEffect, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import GlobalStyle from './theme/globalStyle';

export const AccentContext = createContext();

function App() {
  const [accentColor, setAccentColor] = useState(localStorage.getItem('accentColor') || '#3788a1');

  useEffect(() => {
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
  };
  return (
    <>
      <AccentContext.Provider value={{ accentColor, handleAccentColorChange }}>
        <ThemeProvider theme={{ accentColor }}>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </AccentContext.Provider>
    </>
  );
}

export default App;
