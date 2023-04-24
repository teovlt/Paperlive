import React from 'react';
import { InputType } from './inputElement';

const Input = ({ placeholder, type}) => {
  return (
    <div>
      <label htmlFor=''></label>
      <InputType type={type} placeholder={placeholder} />
    </div>
  );
};

export default Input;
