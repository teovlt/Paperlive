import React, { useContext, useState, useEffect } from 'react';
import { Button, Heading2 } from '../../theme/appElements';
import { AccentContext } from '../../App';
import { DivTheme, DivThemeDispo } from './settingsElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SecuritySettings = () => {
  const { accentColor, handleAccentColorChange } = useContext(AccentContext);
  const [actualColor, setActualColor] = useState();

  const notify = (color) => {
    toast.success(' Your new color is now : ' + color, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

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
    notify(nameColor);
  };

  return (
    <>
      <Heading2 style={{ borderBottom: `1px solid ${accentColor}` }}>
        Password and authentication
      </Heading2>
      <Caption>
        Theme actuel : <strong style={{ color: 'var(--accent)' }}>{actualColor}</strong>{' '}
      </Caption>

      <DivTheme>
        <Button secondary onClick={() => changeAccentColor('#3788a1', 'Blue')}>
          Blue
        </Button>

        <Button secondary onClick={() => changeAccentColor('#e74c3c', 'Red')}>
          Red
        </Button>

        <Button secondary onClick={() => changeAccentColor('#8e44ad', 'Purple')}>
          Purple
        </Button>

        <Button secondary onClick={() => changeAccentColor('#338856', 'Green')}>
          Green
        </Button>
        <Button secondary onClick={() => changeAccentColor('#db873d', 'Orange')}>
          Orange
        </Button>
      </DivTheme>
      <ToastContainer toastStyle={{ backgroundColor: 'var(--accent)' }} />
    </>
  );
};

export default SecuritySettings;
