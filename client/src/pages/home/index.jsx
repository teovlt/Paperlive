import React from 'react';
import { NavLink } from 'react-router-dom';
import { Main, NavPage, SideBar, GridWrapper, Container } from '../../theme/appElements';

const Home = () => {
  return (
    <Container>
      <GridWrapper>
        <NavPage>
          <NavLink>overview</NavLink>
          <NavLink>contributions</NavLink>
          <NavLink>statistics</NavLink>
        </NavPage>

        <SideBar>
          <img src='/vite.svg' alt='' />
          <h2>Erods</h2>
          <h4>Computer sciences</h4>
          <button>Edit team profil</button>
          <span>11 members</span>
          <span>8 contributions</span>
          <br />
          <span>grenoble,france</span>
          <span>www.amazon.com</span>
        </SideBar>
        <Main>
          <h2>ABOUT US</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vero tempore reprehenderit
            quibusdam. Totam maiores expedita ea ut et tempore necessitatibus, voluptas, aspernatur
            tempora autem consectetur placeat iste explicabo similique?
          </p>
          <h2>RECENT ACTIVITY</h2>
          <div className='tableContribution'>
            <p className='tab1'>cc</p>
            <p className='2'>ccc</p>
            <p className='3'>cccc</p>
            <p className='4'>ccccc</p>
          </div>
        </Main>
      </GridWrapper>
    </Container>
  );
};

export default Home;
