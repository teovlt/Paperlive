import React, { useEffect, useRef } from 'react';
import {
  TextAreaField,
  CharacterCounter,
  Container,
  TextAreaLabel,
  TextAreaContainer,
} from './textAreaElements';

const TextArea = (props) => {
  const textareaRef = useRef(null);

  const updateHeight = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  };

  useEffect(() => {
    updateHeight();
  }, []);

  return (
    <Container>
      <TextAreaContainer>
        <TextAreaField {...props} placeholder=' ' ref={textareaRef} onInput={updateHeight} />
        <TextAreaLabel htmlFor={props.id} small={props.small}>
          {props.label}
        </TextAreaLabel>
        <CharacterCounter>
          {props.value ? props.value.length : 0}
          {props.maxLength && `/${props.maxLength}`}
        </CharacterCounter>
      </TextAreaContainer>
    </Container>
  );
};

export default TextArea;
