import React from 'react';
import { Container, PopupText, PopupBtn, Flou } from './popupElements';

const Popup = ({ title, desc }) => {
  return (
    <Flou>
      <Container>
        <PopupText>
          <h1>{title}</h1>
          <p>{desc}</p>
        </PopupText>

        <PopupBtn>
          <button>Yes</button>
          <button>No</button>
        </PopupBtn>
      </Container>
    </Flou>
  );
};

export default Popup;
