import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Container, InputContainer, InputField, InputLabel } from './inputElement';
import { HiEyeSlash, HiEye } from 'react-icons/hi2';

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [pwdVisible, setPwdVisible] = useState(false);

  const togglePwdVisibility = (event) => {
    event.preventDefault();
    setPwdVisible((prev) => !prev);
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));

  return (
    <Container>
      <InputContainer>
        <InputField
          {...props}
          ref={inputRef}
          placeholder=' '
          type={props.type === 'password' ? (pwdVisible ? 'text' : 'password') : props.type}
          defaultType={props.type}
        />
        <InputLabel htmlFor={props.id} small={props.small}>
          {props.label}
        </InputLabel>
        {props.type === 'password' &&
          (pwdVisible ? (
            <HiEye
              onMouseDown={togglePwdVisibility}
              style={{
                cursor: 'pointer',
                color: 'var(--black-tertiary)',
                position: 'absolute',
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
              }}
            />
          ) : (
            <HiEyeSlash
              onMouseDown={togglePwdVisibility}
              style={{
                cursor: 'pointer',
                color: 'var(--black-tertiary)',
                position: 'absolute',
                top: '50%',
                right: '16px',
                transform: 'translateY(-50%)',
              }}
            />
          ))}
      </InputContainer>
    </Container>
  );
});

export default Input;
