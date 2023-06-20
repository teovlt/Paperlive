import { Container, SelectInput } from './selectElements';

const Select = ({ label, defaultValue, onChange, children }) => {
  return (
    <Container label={label}>
      <SelectInput onChange={onChange} defaultValue={defaultValue}>
        {children}
      </SelectInput>
    </Container>
  );
};

export default Select;
