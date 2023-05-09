import React from 'react';
import { Container, Label, RadioButton } from './radioGroupElements';

const RadioGroup = ({ name, onChange, template }) => {
  const handleOnChange = (event) => {
    onChange((prev) => ({ ...prev, [name]: JSON.parse(event.target.value) }));
  };

  return (
    <Container>
      <Label>{template.label}</Label>
      {template.radios.map((radio, index) => (
        <RadioButton key={index}>
          {radio.label}
          <input
            type='radio'
            name={name}
            value={radio.value}
            defaultChecked={radio.defaultChecked}
            onChange={onChange && handleOnChange}
          />
        </RadioButton>
      ))}
    </Container>
  );
};

export default RadioGroup;
