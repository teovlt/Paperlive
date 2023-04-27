import React from 'react';
import {
  Main,
  NavPage,
  SideBar,
  GridWrapper,
  Link,
  Heading2,
  Caption,
  Select,
  DivTop,
  LinkIcon,
  Heading1,
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
  ButtonEdit,
  CaptionWarning,
  DivEditProfil,
} from './homeElements';
import CardContribution from '../../components/cardSoumission';
import NavBar from '../../components/navbar';
import Input from '../../components/Input';
import Popup from '../../components/popup';
import { useState } from 'react';
import {
  UilChart,
  UilBook,
  UilNewspaper,
  UilLinkAlt,
  UilLocationPoint,
  UilBooks,
  UilExclamationTriangle,
} from '@iconscout/react-unicons';

const Home = () => {
  const [showEditAccount, setshowEditAccount] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditWarning, setShowEditWarning] = useState(true);
  const [teamName, setTeamName] = useState('Mon équipe');
  const [teamDesc, setteamDesc] = useState('Notre description');
  const [teamLoc, setTeamLoc] = useState('Ma ville');
  const [teamWebSite, setTeamWebSite] = useState('Mon website');
  const [teamVisibility, setTeamVisibility] = useState('Private');

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
        handleEditAccount();
      } else {
        handleEditAccount();
        console.log('tu na rien changé du tt');
      }
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
    const selectElement = e.target.elements.visibility; // récupère l'élément select
    const selectedIndex = selectElement.selectedIndex; // récupère l'index de l'option sélectionnée
    const selectedOptionText = selectElement.options[selectedIndex].text;
    setTeamVisibility(() => selectedOptionText);

    //sauvegarde

    setShowPopup(false);
    handleEditAccount();
  }

  function handleCancel() {
    console.log('Changements NON sauvegardés !');
    //Ne fait rien
    setShowPopup(false);
  }

  function handleEditWarning() {
    setShowEditWarning(!showEditWarning);
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
              <UilBook /> Overview
            </LinkIcon>
            <LinkIcon>
              <UilNewspaper /> Contributions
            </LinkIcon>
            <LinkIcon>
              <UilChart /> Statistics
            </LinkIcon>
          </NavPage>

          {showEditAccount ? (
            <SideBar>
              <Img src='/userGroupe.jpg' alt='ProfileImage' onClick={handleEditWarning} />
              <div>
                <Heading1>{teamName}</Heading1>
                <Caption>Visibility: {teamVisibility}</Caption>
              </div>
              <DivEditProfil>
                {showEditWarning && (
                  <CaptionWarning>
                    Configure your profile <UilExclamationTriangle />
                  </CaptionWarning>
                )}
                <ButtonEdit onClick={handleEditAccount}>Edit team profil</ButtonEdit>
              </DivEditProfil>
              <span>
                <UilBooks />8 contributions
              </span>
              <span>
                <UilLocationPoint /> {teamLoc}
              </span>
              <span>
                <UilLinkAlt />
                <Link to='https://www.amazon.com'>{teamWebSite}</Link>
              </span>
            </SideBar>
          ) : (
            <SideBar>
              <Img src='/userGroupe.jpg' alt='' />
              <Form onSubmit={handleSubmit}>
                <DivCheck>
                  <p>Visibility:</p>
                  <Select id='visibility' defaultValue={teamVisibility}>
                    <option value='option1'>Private</option>
                    <option value='option2'>Public</option>
                  </Select>
                </DivCheck>

                <Input label='Name of the team' id='name' type='text' defaultValue={teamName} />

                <Input label='About us' id='about' type='text' defaultValue={teamDesc} />

                <Input label='Location' id='location' type='text' defaultValue={teamLoc} />

                <Input label='WebSite' id='webSite' type='text' defaultValue={teamWebSite} />

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
