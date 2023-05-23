import React, { useContext, useState, useEffect } from 'react';
import { Button, Heading2 } from '../../theme/appElements';
import { AccentContext } from '../../App';
import { DivTheme, DivThemeDispo } from './settingsElements';

const SecuritySettings = () => {
  const { accentColor, handleAccentColorChange } = useContext(AccentContext);
  const [actualColor, setActualColor] = useState();

  useEffect(() => {
    if (accentColor === '#e74c3c') {
      setActualColor('Red');
    } else if (accentColor === '#8e44ad') {
      setActualColor('Purple');
    } else if (accentColor === '#338856') {
      setActualColor('Green');
    } else if (accentColor === '#db873d') {
      setActualColor('Orange');
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
      <span>
        Theme actuel : <strong style={{ color: 'var(--accent)' }}>{actualColor}</strong>{' '}
      </span>
      <DivThemeDispo>
        <span>
        Themes disponibles :</span>
        <DivTheme>
          {actualColor !== 'Blue' && (
            <Button secondary onClick={() => changeAccentColor('#3788a1', 'Blue')}>
              Blue
            </Button>
          )}
          {actualColor !== 'Red' && (
            <Button secondary onClick={() => changeAccentColor('#e74c3c', 'Red')}>
              Red
            </Button>
          )}
          {actualColor !== 'Purple' && (
            <Button secondary onClick={() => changeAccentColor('#8e44ad', 'Purple')}>
              Purple
            </Button>
          )}
          {actualColor !== 'Green' && (
            <Button secondary onClick={() => changeAccentColor('#338856', 'Green')}>
              Green
            </Button>
          )}
          {actualColor !== 'Orange' && (
            <Button secondary onClick={() => changeAccentColor('#db873d', 'Orange')}>
              Orange
            </Button>
          )}
        </DivTheme>
      
      </DivThemeDispo>
      
    </>
  );
};

export default SecuritySettings;
