import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;

    /* Variables */
    --accent: #3788a1;

    --positive: #52B788;
    --positive-vibrant: #52b78833;
    --notice: #FF950099;
    --notice-vibrant: #FF950033;
    --destructive: #ff001f99;
    --destructive-vibrant: #FF001F33;

    --black: #222222;
    --black-secondary: rgba(34, 34, 34, 0.75);
    --black-tertiary: #2222227f;
    --black-quaternary: #2222221e; 
    
    --white: #ffffff;
    --white-50: #ffffff80
  }

  *, ::before, ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    list-style: none;
    text-decoration: none;
    text-transform: none;
    background: none;
    border: none;
    outline: none;
  }

  body {
    font-size: 1.6rem;
    font-smooth: auto;
    font-family: 'Poppins', 'Helvetica', 'Arial';
  }
`;

export default GlobalStyle;
