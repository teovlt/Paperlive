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
  LinkIcon,
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
import { ChartPieIcon, CircleStackIcon, NewspaperIcon } from '@heroicons/react/20/solid';

const Home = () => {
  const [showEditAccount, setshowEditAccount] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [teamName, setTeamName] = useState('Mon équipe');
  const [teamDesc, setteamDesc] = useState('Notre description');
  const [teamLoc, setTeamLoc] = useState('Ma ville');
  const [teamWebSite, setTeamWebSite] = useState('Mon website');

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
      //nombreux problemes
      if (teamName != e.target.name.value) {
        console.log('ta changé le nom !!!!');
        setShowPopup(true);
      } else {
        handleEditAccount();

        console.log('tu na rien changé du tt');
      }

      //verif modif ou non
      /*
      if (e.target.name.value == '') {
      } else {
      }
      */
    } else if (dernierBoutonClique === 'btnSave') {
      handleSave(e);
      handleEditAccount();
    }
  }

  function handleSave(e) {
    console.log('Changements sauvegardés !');
    setTeamName(() => e.target.name.value);
    setteamDesc(() => e.target.about.value);
    setTeamLoc(() => e.target.location.value);
    setTeamWebSite(() => e.target.webSite.value);

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
            <LinkIcon>
              <CircleStackIcon /> <p>Overview</p>
            </LinkIcon>
            <LinkIcon>
              <NewspaperIcon /> Contributions
            </LinkIcon>
            <LinkIcon>
              <ChartPieIcon /> Statistics
            </LinkIcon>
          </NavPage>

          {showEditAccount ? (
            <SideBar>
              <Img src='/userGroupe.jpg' alt='' />
              <Heading2>{teamName}</Heading2>
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
                <p>icon</p>
                {teamLoc}
              </span>
              <span>
                <p>icon</p>
                <Link to='https://www.amazon.com'>{teamWebSite}</Link>
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

                <Input label='Name of the team' id='name' type='text' defaultValue={teamName} />

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
              <p>{teamDesc}</p>
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
