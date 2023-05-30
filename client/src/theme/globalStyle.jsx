import { createGlobalStyle } from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import { AccentContext, ThemeContext } from '../App';

const GlobalStyle = createGlobalStyle`

  :root {
    font-size: 62.5%;

    /* Variables */
   


  //  @media (prefers-color-scheme: light) {
       --accent: ${(props) => `rgb(${props.theme.accentColor})`};
    --accent-vibrant: ${(props) => `rgba(${props.theme.accentColor}, 0.15)`};
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
    --white-50: #ffffff80;
  //  }

    /* @media (prefers-color-scheme: dark) {
      --accent: ${(props) => `rgb(${props.theme.accentColor})`};
    --accent-vibrant: ${(props) => `rgba(${props.theme.accentColor}, 0.15)`};
    --positive: #1e6c23;
    --positive-vibrant: #1e6c2333;
    --notice: #e66700;
    --notice-vibrant: #e6670033;
    --negative: #bdbeb9;
    --negative-vibrant: #bdbeb933;
    --black: #ffffff;
    --black-secondary: rgba(255, 255, 255, 0.75);
    --black-tertiary: #ffffff7f;
    --black-quaternary: #ffffff1e;
    --white: #222222;
    --white-50: #22222280;
  } */
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
