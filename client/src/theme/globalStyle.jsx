import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap');

  :root {
    font-size: 62.5%;

    /* Variables */
    --accent: #3788a1;

    --positive: #52B788;
    --positive-vibrant: #52b78833;
    --notice: #FF9500;
    --notice-vibrant: #FF950033;
    --destructive: #FF001F;
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
