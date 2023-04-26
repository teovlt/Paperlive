import React from 'react';
import { NavContainer, ShearchBar, Actions, H1 } from './navbarElements';
import { Heading1 } from '../../theme/appElements';
//import { MagnifyingGlassIcon, PlusIcon, UserGroupIcon } from '@heroicons/react/20/solid';

const NavBar = () => {
  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder='Shearch'></input>
        <p>icon</p>
      </ShearchBar>

      <H1>PaperLive</H1>

      <Actions>
        <p>icon</p>
        <p>icon</p>
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
