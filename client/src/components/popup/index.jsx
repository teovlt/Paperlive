import React from 'react';
import { Container, PopupText, PopupBtn } from './popupElements';

const Popup = () => {
  return (
    <Container>
      <PopupText>
        <h1>Titre du popup</h1>
        <p>Description du popup</p>
      </PopupText>

      <PopupBtn>
        <button>btn1</button>
        <button>btn2</button>
      </PopupBtn>
    </Container>
  );
};

export default Popup;
