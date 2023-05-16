import React, { useState, useEffect } from 'react';
import { Backdrop, Caption, Container, Title, ActionsContainer } from './popupElements';
import { Button } from '../../theme/appElements';

const Popup = ({ template, open, onConfirm, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  return (
    <>
      <Backdrop></Backdrop>
      <Container>
        <>
          <Title>{template?.title}</Title>
          <Caption>{template?.caption}</Caption>
        </>
        <ActionsContainer>
          <Button
            onClick={() => {
              onCancel(); // Ajoutez les parenthèses ici
            }}
            style={{ width: '150px' }}>
            {template?.cancelLabel}
          </Button>

          <Button
            onClick={() => {
              onConfirm(); // Ajoutez les parenthèses ici
            }}
            type='negative'
            style={{ width: '150px' }}>
            {template?.confirmLabel}
          </Button>
        </ActionsContainer>
      </Container>
    </>
  );
};

export default Popup;
