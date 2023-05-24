import React, { useState, useEffect, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import GlobalStyle from './theme/globalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AccentContext = createContext();

function App() {
  const [accentColor, setAccentColor] = useState(
    localStorage.getItem('accentColor') || '55, 136, 161'
  );

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
        <ToastContainer toastStyle={{ backgroundColor: 'var(--positive)' }} />
      </AccentContext.Provider>
    </>
  );
}

export default App;
