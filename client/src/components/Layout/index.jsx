import React from 'react';
import { Container, MainSection } from './layoutElements';
import NavBar from '../Navbar';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Layout = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <NavBar />
      <Container>
        {props.head}
        {props.sidebar}
        <MainSection>
          <Outlet />
        </MainSection>
      </Container>
    </>
  );
};

export default Layout;
