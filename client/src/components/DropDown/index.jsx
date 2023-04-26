import React, { useState } from 'react';
import { ContainerDropDown, DivActions, DivSignedAs } from './dropDownElements';
import { Caption } from '../../theme/appElements';

const DropDown = ({ options, teamName }) => {
  if (!Array.isArray(options)) {
    options = [];
  }

  const [showSignedAs, setShowSignedAs] = useState(true);

  if ((teamName = '')) {
    setShowSignedAs(!showSignedAs);
    console.log('Il ny a pas de teamname dans ce dropdown');
  }

  return (
    <ContainerDropDown>
      <DivSignedAs>
        {showSignedAs ? (
          <Caption>
            Signed as <strong>{teamName}</strong>{' '}
          </Caption>
        ) : (
          <p>cc</p>
        )}
      </DivSignedAs>
      <DivActions>
        {options.map((option) => (
          <Caption>{option.label}</Caption>
        ))}
      </DivActions>
    </ContainerDropDown>
  );
};

export default DropDown;
