import React from 'react';
import {
  Main,
  NavPage,
  SideBar,
  GridWrapper,
  Button,
  Link,
  Heading2,
  Caption,
  Select,
  DivTop,
} from '../../theme/appElements';
import {
  TableContribution,
  Container,
  MainText,
  MainTab,
  DivCheck,
  DivBtnsEdit,
  BtnCancel,
  BtnSave,
} from './homeElements';
import CardContribution from '../../components/cardSoumission';
import NavBar from '../../components/navbar';
import Input from '../../components/Input';
import { useState } from 'react';

const Home = () => {
  const [showEditAccount, setshowEditAccount] = useState(true);

  const handleEditAccount = () => {
    setshowEditAccount(!showEditAccount);
  };

  return (
    <>
      <NavBar />
      <DivTop></DivTop>

      {showEditAccount ? (
        <div>
          <Container>
            <GridWrapper>
              <NavPage>
                <Link>overview</Link>
                <Link>contributions</Link>
                <Link>statistics</Link>
              </NavPage>

              <SideBar>
                <img src='/user.png' alt='' />
                <Heading2>Erods</Heading2>
                <Caption>Computer sciences</Caption>
                <Button onClick={handleEditAccount}>Edit team profil</Button>
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
                  <Heading2>About us</Heading2>
                  <Caption>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vero tempore
                    reprehenderit quibusdam. Totam maiores expedita ea ut et tempore necessitatibus,
                    voluptas, aspernatur tempora autem consectetur placeat iste explicabo similique?
                  </Caption>
                </MainText>
                <MainTab>
                  <Heading2>Recent activity</Heading2>
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
        </div>
      ) : (
        <div>
          <Container>
            <GridWrapper>
              <NavPage>
                <Link>overview</Link>
                <Link>contributions</Link>
                <Link>statistics</Link>
              </NavPage>

              <SideBar>
                <img src='/user.png' alt='' />
                <DivCheck>
                  <p>Visibility:</p>
                  <Select>
                    <option value='option1'>Private</option>
                    <option value='option2'>Public</option>
                  </Select>
                </DivCheck>

                <Input label='Name of the team' id='name' type='text' />

                <Input label='About us' id='about' type='text' />

                <Input label='Location' id='location' type='text' />

                <Input label='WebSite' id='webSite' type='text' />

                <DivBtnsEdit>
                  <BtnCancel onClick={handleEditAccount}>Cancel</BtnCancel>
                  <BtnSave onClick={handleEditAccount}>Save</BtnSave>
                </DivBtnsEdit>
              </SideBar>

              <Main>
                <MainText>
                  <Heading2>About us</Heading2>
                  <Caption>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vero tempore
                    reprehenderit quibusdam. Totam maiores expedita ea ut et tempore necessitatibus,
                    voluptas, aspernatur tempora autem consectetur placeat iste explicabo similique?
                  </Caption>
                </MainText>
                <MainTab>
                  <Heading2>Recent activity</Heading2>
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
        </div>
      )}
    </>
  );
};

export default Home;
