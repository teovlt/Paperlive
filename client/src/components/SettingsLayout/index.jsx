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

  return (
    <>
      <NavBar />
      <Container>
        <SideBar>
          <IconLink to='/'>
            <HiArrowSmallLeft />
            {t('global.accueil')}
          </IconLink>
          <SectionParams>
            <Heading2>{t('settings.sections.profile')}</Heading2>
            <Link to='/settings/profile'>
              {/* <HiOutlineUserGroup /> */}
              {t('settings.pages.myAccount')}
            </Link>
          </SectionParams>
          <SectionParams>
            <Heading2>{t('settings.sections.security')}</Heading2>
            <Link to='/settings/security'>
              {/* <HiOutlineKey /> */}
              {t('settings.pages.passwordAndAuthentication')}
            </Link>
          </SectionParams>
          <SectionParams>
            <Heading2>{t('settings.sections.accessibility')}</Heading2>
            <Link to='/settings/appearance'>
              {/* <BsPalette /> */}
              {t('settings.pages.appearance')}
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
