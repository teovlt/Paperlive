import React, { forwardRef } from 'react';
import {
  Container,
  InputContainer,
  InputField,
  InputLabel,
  ErrorContainer,
  ErrorLabel,
} from './inputElement';

const Input = forwardRef((props, ref) => {
  return (
    <Container>
      <InputContainer>
        <InputField {...props} ref={ref} placeholder=' ' />
        <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      </InputContainer>
    </Container>
  );
});

export default Input;
