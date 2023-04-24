import React from 'react';
import { NavContainer, ShearchBar, Actions } from './navbarElements';
import { MagnifyingGlassIcon, PlusIcon, UserGroupIcon } from '@heroicons/react/20/solid';

const NavBar = () => {
  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder='Shearch'></input>
        <MagnifyingGlassIcon />
      </ShearchBar>

      <h1>PaperLive</h1>

      <Actions>
        <PlusIcon />
        <UserGroupIcon />
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
