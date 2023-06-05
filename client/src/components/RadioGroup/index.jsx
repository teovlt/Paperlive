import React, { Fragment } from 'react';
import { Container, Label, RadioButton, RadioInput } from './radioGroupElements';

const RadioGroup = ({ name, label, onChange = () => {}, template }) => {
  const handleOnChange = (event) => {
    onChange(event);
  };

  return (
    <Container>
      <Label>{label}</Label>
      {template.radios.map((radio, index) => (
        <Fragment key={index}>
          <RadioInput
            type='radio'
            name={name}
            value={radio.value}
            id={`${name}${index}`}
            defaultChecked={radio.defaultChecked}
            onChange={onChange && handleOnChange}
          />

          <RadioButton htmlFor={`${name}${index}`}>{radio.label}</RadioButton>
        </Fragment>
      ))}
    </Container>
  );
};

export default RadioGroup;
