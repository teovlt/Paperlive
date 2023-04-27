import React, { useState, useEffect, useRef } from 'react';
import { NavContainer, ShearchBar, Actions, H1 } from './navbarElements';
import { UilSearch, UilPlus, UilUsersAlt } from '@iconscout/react-unicons';
import DropDown from '../DropDown';

const NavBar = () => {
  const options = [
    { label: 'Profile', value: 'param1' },
    { label: 'Contributions', value: 'param2' },
    { label: 'Statistics', value: 'param3' },
    { label: 'Settings', value: 'param4' },
    { label: 'SignOut', value: 'param5', action: '/login' },
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
  const ref = useRef(null);

  const handleClose = () => {
    setShowDropDown(false);
    setShowDropDown2(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handleClose]);

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
    setShowDropDown2(false);
  };

  const handleDropDown2 = () => {
    setShowDropDown2(!showDropDown2);
    setShowDropDown(false);
  };

  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder='Shearch'></input>
        <UilSearch />
      </ShearchBar>

      <H1>PaperLive</H1>

      <Actions ref={ref}>
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
