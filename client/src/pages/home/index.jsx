import React from 'react';
import { NavLink } from 'react-router-dom';
import { Main, NavPage, SideBar, GridWrapper, Button, Link } from '../../theme/appElements';
import {
  TableContribution,
  Container,
  MainText,
  MainTab,
  DivInfos,
  DivCheck,
  DivBtns,
} from './homeElements';
import CardContribution from '../../components/cardSoumission';
import NavBar from '../../components/navbar';
import Input from '../../components/input';

const Home = () => {
  return (
    <>
      <NavBar />
      <Container>
        <GridWrapper>
          <NavPage>
            <Link>overview</Link>
            <Link>contributions</Link>
            <Link>statistics</Link>
          </NavPage>

          <SideBar>
            <img src='/vite.svg' alt='' />
            <h2>Erods</h2>
            <h4>Computer sciences</h4>
            <Button>Edit team profil</Button>
            <span>
              <p>icon</p>11 members
            </span>
            <span>
              <p>icon</p>8 contributions
            </span>
            <br />
            <span>
              <p>icon</p>grenoble,france
            </span>
            <span>
              <p>icon</p>
              <Link to='https://www.amazon.com'>www.amazon.com</Link>
            </span>
          </SideBar>
          <Main>
            <MainText>
              <h2>ABOUT US</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vero tempore
                reprehenderit quibusdam. Totam maiores expedita ea ut et tempore necessitatibus,
                voluptas, aspernatur tempora autem consectetur placeat iste explicabo similique?
              </p>
            </MainText>
            <MainTab>
              <h2>RECENT ACTIVITY</h2>
              <TableContribution>
                <CardContribution />
                <CardContribution />
                <CardContribution />
                <CardContribution />
              </TableContribution>
            </MainTab>
          </Main>
        </GridWrapper>
      </Container>
    </>
  );
};

export default Home;

// a mettre dans main si editProfil
/*

                  <DivCheck>
              <h2>PUBLIC PROFIL </h2>
              <input type='checkbox' name='public' />
            </DivCheck>
            <DivInfos>
              <h2>NAME OF THE TEAM</h2>
              <Input placeholder={'ERODS'} type={'text'} />
            </DivInfos>
            <DivInfos>
              <h2>ABOUT US</h2>
              <Input placeholder={'WE ARE THE BEST TEAM OF THE LIG'} type={'text'} />
            </DivInfos>
            <DivInfos>
              <h2>LOCATION</h2>
              <Input placeholder={'PARIS'} type={'text'} />
            </DivInfos>
            <DivInfos>
              <h2>WEBSITE URL</h2>
              <Input placeholder={'www.teamWeb.com'} type={'text'} />
            </DivInfos>
            <DivBtns>
              <Button>Cancel</Button>
              <Button>Save</Button>
            </DivBtns>
*/
