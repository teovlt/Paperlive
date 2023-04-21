import React from 'react';
import { NavLink } from 'react-router-dom';
import { Main, NavPage, SideBar, GridWrapper, Container, Button } from '../../theme/appElements';
import { TableContribution } from './homeElements';
import CardContribution from '../../components/CardContribution';
import NavBar from '../../components/navbar';

const Home = () => {
  return (
    <>
      <NavBar />
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
            <Button>Edit team profil</Button>
            <span>11 members</span>
            <span>8 contributions</span>
            <br />
            <span>grenoble,france</span>
            <span>www.amazon.com</span>
          </SideBar>
          <Main>
            <h2>ABOUT US</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vero tempore
              reprehenderit quibusdam. Totam maiores expedita ea ut et tempore necessitatibus,
              voluptas, aspernatur tempora autem consectetur placeat iste explicabo similique?
            </p>
            <h2>RECENT ACTIVITY</h2>
            <TableContribution>
              <CardContribution />
              <CardContribution />
              <CardContribution />
              <CardContribution />
            </TableContribution>
          </Main>
        </GridWrapper>
      </Container>
    </>
  );
};

export default Home;
