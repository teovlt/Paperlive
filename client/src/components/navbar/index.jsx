import React from 'react';
import { NavContainer, ShearchBar, Actions, H1 } from './navbarElements';
import { UilSearch, UilPlus, UilUsersAlt } from '@iconscout/react-unicons';
import DropDown from '../DropDown';
import { useState } from 'react';
const NavBar = () => {
  const options = [
    { label: 'Profile', value: 'param1' },
    { label: 'Contributions', value: 'param2' },
    { label: 'Statistics', value: 'param3' },
    { label: 'Settings', value: 'param4' },
    { label: 'SignOut', value: 'param5' },
  ];
  const options2 = [
    { label: 'New contribution', value: 'param1' },
    { label: 'aa', value: 'param2' },
    { label: 'aaa', value: 'param3' },
    { label: 'aaaa', value: 'param4' },
    { label: 'aaaaa', value: 'param5' },
  ];

  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleDropDown2 = () => {
    setShowDropDown2(!showDropDown2);
  };

  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder='Shearch'></input>
        <UilSearch />
      </ShearchBar>

      <H1>PaperLive</H1>

      <Actions>
        <div onClick={handleDropDown2}>
          <UilPlus />
        </div>
        {showDropDown2 && <DropDown options={options2} />}

        <div onClick={handleDropDown}>
          <UilUsersAlt />
        </div>
        {showDropDown && <DropDown options={options} teamName={'ERODS'} />}
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
