import React from 'react';
import { NavContainer, ShearchBar, Actions, H1 } from './navbarElements';
import { UilSearch, UilPlus, UilUsersAlt } from '@iconscout/react-unicons';
const NavBar = () => {
  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder='Shearch'></input>
        <UilSearch />
      </ShearchBar>

      <H1>PaperLive</H1>

      <Actions>
        <UilPlus />
        <UilUsersAlt />
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
