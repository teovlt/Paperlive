import React, { useContext, useState, useEffect } from 'react';
import { Button, Heading2 } from '../../theme/appElements';
import { AccentContext } from '../../App';
import { DivTheme } from './settingsElements';

const SecuritySettings = () => {
  const { accentColor, handleAccentColorChange } = useContext(AccentContext);
  const [actualColor, setActualColor] = useState();

  useEffect(() => {
    if (accentColor === '#f44336') {
      setActualColor('Red');
    } else if (accentColor === '#5a2dad') {
      setActualColor('Purple');
    } else {
      setActualColor('Blue');
    }
  }, [accentColor]);

  const changeAccentColor = (color, nameColor) => {
    handleAccentColorChange(color);
    setActualColor(nameColor);
  };

  return (
    <>
      <Heading2 style={{ borderBottom: `1px solid ${accentColor}` }}>
        Password and authentication
      </Heading2>
      Theme actuel : {actualColor}
      <DivTheme>
        <Button secondary onClick={() => changeAccentColor('#f44336', 'Red')}>
          Red
        </Button>
        <Button secondary onClick={() => changeAccentColor('#5a2dad', 'Purple')}>
          Purple
        </Button>
        <Button secondary onClick={() => changeAccentColor('#3788a1', 'Blue')}>
          Blue
        </Button>
      </DivTheme>
    </>
  );
};

export default SecuritySettings;
