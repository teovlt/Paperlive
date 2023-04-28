import React, { useState } from 'react';
import { Backdrop, Caption, Container, Title, ActionsContainer } from './popupElements';
import { Button } from '../../theme/appElements';

const Popup = ({ template }) => {
  const [isOpen, setIsOpen] = useState(false);

  // if (!isOpen) return null;

  const handleConfirm = () => {
    setIsOpen(false);
    template.onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
    template.onCancel();
  };

  return (
    <Backdrop>
      <Container>
        <>
          <Title>{template.title}</Title>
          <Caption>{template.caption}</Caption>
        </>
        <ActionsContainer>
          <Button onClick={handleCancel}>{template.cancelLabel}</Button>
          <Button onClick={handleConfirm} type='negative'>
            {template.confirmLabel}
          </Button>
        </ActionsContainer>
      </Container>
    </Backdrop>
  );
};

export default Popup;
