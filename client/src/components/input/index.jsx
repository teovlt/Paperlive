import React from 'react';
import {
  Container,
  InputContainer,
  InputField,
  InputLabel,
  ErrorContainer,
  ErrorLabel,
} from './inputElement';

const Input = (props) => {
  return (
    <Container>
      <InputContainer>
        <InputField {...props} placeholder=' ' />
        <InputLabel for={props.id}>{props.label}</InputLabel>
      </InputContainer>
      {props.error && (
        <ErrorContainer>
          <ErrorLabel>{props.error}</ErrorLabel>
        </ErrorContainer>
      )}
    </Container>
  );
};

export default Input;
