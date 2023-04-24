import React from 'react';
import { NavContainer, ShearchBar, Actions } from './navbarElements';
//import { MagnifyingGlassIcon, PlusIcon, UserGroupIcon } from '@heroicons/react/20/solid';

const NavBar = () => {
  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder='Shearch'></input>
        <p>icon</p>
      </ShearchBar>

      <h1>PaperLive</h1>

      <Actions>
        <p>icon</p>
        <p>icon</p>
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
