import React from 'react';
import { Container, MainSection, NavLink, Navigation } from './layoutElements';
import ProfileSidebar from '../ProfileSidebar';
import NavBar from '../Navbar';
import { Outlet } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineChartPie, HiOutlineNewspaper } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const { t } = useTranslation();

  return (
    <>
      <NavBar />
      <Container>
        <Navigation>
          <NavLink to='/'>
            <HiOutlineBookOpen />
            {t('layout.overview')}
          </NavLink>
          <NavLink to='/contributions'>
            <HiOutlineNewspaper />
            {t('layout.contributions')}
          </NavLink>
          <NavLink to='/statistics'>
            <HiOutlineChartPie />
            {t('layout.statistics')}
          </NavLink>
        </Navigation>
        <ProfileSidebar />
        <MainSection>
          <Outlet />
        </MainSection>
      </Container>
    </>
  );
};

export default Layout;
