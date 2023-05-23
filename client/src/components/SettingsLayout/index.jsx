import React, { useState } from 'react';
import NavBar from '../../components/Navbar';
import { SideBar, Container, MainSection, SectionParams, Link } from './settingsLayoutElements';
import { Heading2, IconLink } from '../../theme/appElements';
import {
  HiArrowSmallLeft,
  HiEyeDropper,
  HiLockClosed,
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
  HiSwatch,
  HiUserCircle,
} from 'react-icons/hi2';
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
              <HiUserCircle />
              {t('settings.pages.myAccount')}
            </Link>
          </SectionParams>
          <SectionParams>
            <Heading2>{t('settings.sections.security')}</Heading2>
            <Link to='/settings/security'>
              <HiLockClosed />
              {t('settings.pages.password')}
            </Link>
          </SectionParams>
          <SectionParams>
            <Heading2>{t('settings.sections.accessibility')}</Heading2>
            <Link to='/settings/appearance'>
              <HiSwatch />
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
