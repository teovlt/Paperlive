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
  Img,
  Form,
} from './homeElements';
import CardContribution from '../../components/cardSoumission';
import NavBar from '../../components/navbar';
import Input from '../../components/Input';
import Popup from '../../components/popup';
import { useState } from 'react';

const Home = () => {
  const [showEditAccount, setshowEditAccount] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  // let nameOfTeam = document.querySelector('#name');
  //let nameOfTeamForm = document.querySelector('#nomEquipe');

  const handleEditAccount = () => {
    setshowEditAccount(!showEditAccount);
  };

  let dernierBoutonClique = null;

  function handleClick(buttonId) {
    dernierBoutonClique = buttonId;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (dernierBoutonClique === 'btnCancel') {
      if (e.target.name.value == '') {
        handleEditAccount();
      } else {
        setShowPopup(true);
      }
      //handleEditAccount();
    } else if (dernierBoutonClique === 'btnSave') {
      //pr l'instant
      handleSave();
      handleEditAccount();
    }
  }

  function handleSave() {
    console.log('Changements sauvegardés !');
    //sauvegarde

    setShowPopup(false);
    handleEditAccount();
  }

  function handleCancel() {
    console.log('Changements NON sauvegardés !');
    //Ne fait rien
    setShowPopup(false);
  }

  return (
    <>
      <NavBar />
      <DivTop></DivTop>
      {showPopup && (
        <Popup
          title='Unsaved changements !'
          desc='Watch out, you got some unsaved changements. Do you want to save them ?'
          confirm={handleSave}
          cancel={handleCancel}
        />
      )}
      <Container>
        <GridWrapper>
          <NavPage>
            <Link>overview</Link>
            <Link>contributions</Link>
            <Link>statistics</Link>
          </NavPage>

          {showEditAccount ? (
            <SideBar>
              <Img src='/userGroupe.jpg' alt='' />
              <Heading2 id='nomEquipe'>Erods</Heading2>
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
          ) : (
            <SideBar>
              <Img src='/userGroupe.jpg' alt='' />
              <Form onSubmit={handleSubmit}>
                <DivCheck>
                  <p>Visibility:</p>
                  <Select>
                    <option value='option1'>Private</option>
                    <option value='option2'>Public</option>
                  </Select>
                </DivCheck>

                <Input label='Name of the team' id='name' type='text' defaultValue='Erods' />

                <Input
                  label='About us'
                  id='about'
                  type='text'
                  defaultValue='Lorem ipsum tt ca tt ca tta vu ctes al s;ofnensfnoqsfinisbf'
                />

                <Input label='Location' id='location' type='text' defaultValue='GRENOBLE' />

                <Input label='WebSite' id='webSite' type='text' defaultValue='www.erods.com' />

                <DivBtnsEdit>
                  <BtnCancel onClick={() => handleClick('btnCancel')} id='btnCancel' type='submit'>
                    Cancel
                  </BtnCancel>
                  <BtnSave onClick={() => handleClick('btnSave')} id='btnSave' type='submit'>
                    Save
                  </BtnSave>
                </DivBtnsEdit>
              </Form>
            </SideBar>
          )}
          <Main>
            <MainText>
              <Heading2>About us</Heading2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vero tempore
                reprehenderit quibusdam. Totam maiores expedita ea ut et tempore necessitatibus,
                voluptas, aspernatur tempora autem consectetur placeat iste explicabo similique?
              </p>
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
    </>
  );
};

export default Home;
