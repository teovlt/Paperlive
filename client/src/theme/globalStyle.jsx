import { createGlobalStyle } from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import { AccentContext } from '../App';

const GlobalStyle = createGlobalStyle`

  :root {
    font-size: 62.5%;

    /* Variables */
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

    --data-visualisation-positive: #048ba8;
    --data-visualisation-positive-variant: #0db39e;
    --data-visualisation-negative: #edb21d;
    --data-visualisation-negative-variant: #e47a11;
    --data-visualisation-neutral: #e64c61;
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

    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome, IE and Edge */
    }
  }

  svg {
    font-size: 2rem;
  }

  button, textarea, input, select {
    font-family: 'Poppins';
  }
`;

export default GlobalStyle;
