import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap');

  :root {
    font-size: 62.5%;

    /* Variables */
    --accent: #3788a1;
    --black: #222222;
    --white: #ffffff;
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
    font-family: 'Poppins', 'Helvetica', 'Arial';
  }
`;

export default GlobalStyle;
