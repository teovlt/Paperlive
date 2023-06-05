import { useEffect, useState } from 'react';
import { Input, Label } from './checkboxElements';

const Checkbox = ({ defaultChecked = false, ...props }) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChanges = (event) => {
    if (props.onClick) {
      props.onClick(event);
    } else {
      props.onChange(!checked);
      setChecked(!checked);
    }
  };

  return (
    <Label className={`${checked && 'checked'}`}>
      <Input type='checkbox' checked={checked} onChange={handleChanges} />
      <span>{props.label}</span>
    </Label>
  );
};

export default Checkbox;
