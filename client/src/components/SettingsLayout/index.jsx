import React, { useState } from 'react';
import NavBar from '../../components/Navbar';
import { SideBar, Container, MainSection, SectionParams, Link } from './settingsLayoutElements';
import { Heading2, IconLink } from '../../theme/appElements';
import { HiOutlineUserGroup, HiOutlineKey, HiArrowSmallLeft } from 'react-icons/hi2';
import { BsPalette } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(true);

  const makeActive = () => {};

  return (
    <>
      <NavBar />
      <Container>
        <SideBar>
          <IconLink to='/'>
            <HiArrowSmallLeft />
            Accueil
          </IconLink>
          <SectionParams>
            <Heading2>Profile </Heading2>
            <Link to='/settings/profile' onClick={makeActive}>
              <HiOutlineUserGroup />
              My account
            </Link>
          </SectionParams>
          <SectionParams>
            <Heading2>Security</Heading2>
            <Link to='/settings/security'>
              <HiOutlineKey />
              Password and authentification
            </Link>
          </SectionParams>
          <SectionParams>
            <Heading2>Accessibility</Heading2>
            <Link to='/settings/theme'>
              <BsPalette />
              Appearance
            </Link>
          </SectionParams>
        </SideBar>
        <MainSection>
          <Outlet />
        </MainSection>
      </Container>
    </>
  );
};

export default Settings;
