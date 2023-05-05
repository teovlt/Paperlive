import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;

    /* Variables */
    --accent: #3788a1;

    --positive: #42b983;
    --positive-vibrant: #42b98333;
    --notice: #ff9800;
    --notice-vibrant: #ff980033;
    --negative: #f44336;
    --negative-vibrant: #f4433633;

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
    font-family: 'Poppins', 'Helvetica', 'Arial';
    font-size: 1.6rem;
    font-smooth: auto;
  }

  svg {
    font-size: 2rem;
  }

  button, textarea, input, select {
    font-family: 'Poppins';
  }
`;

export default GlobalStyle;
