import React from 'react';
import { NavContainer, ShearchBar, Actions } from './navbarElements';

const NavBar = () => {
  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder='Shearch'></input>
        <p>loupe</p>
      </ShearchBar>

      <h1>PaperLive</h1>

      <Actions>
        <p>plus</p>
        <p>equipe</p>
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
