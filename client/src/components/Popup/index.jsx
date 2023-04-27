import React from 'react';
import { Container, PopupText, PopupBtn, Flou } from './popupElements';
import { Button, Heading1 } from '../../theme/appElements';

const Popup = ({ title, desc, cancel, confirm }) => {
  return (
    <Flou>
      <Container>
        <PopupText>
          <Heading1>{title}</Heading1>
          <p>{desc}</p>
        </PopupText>

        <PopupBtn>
          <Button onClick={confirm}>Yes</Button>
          <Button onClick={cancel}>No</Button>
        </PopupBtn>
      </Container>
    </Flou>
  );
};

export default Popup;
