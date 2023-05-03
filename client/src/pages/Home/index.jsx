import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';

import { DashboardNav, Heading2, Paragraph } from '../../theme/appElements';
import { Container, SectionMain } from './homeElements';
import NavBar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import LayoutMain from '../../components/LayoutMain';

const Home = () => {
  const { t } = useTranslation();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchUser() {
      const res = await axiosPrivate.get('/teams/me');
      setAuth((prev) => {
        return {
          ...res.data,
          ...prev,
        };
      });
    }

    fetchUser();
  }, [auth.accessToken]);

  return (
    <>
      <NavBar />
      <Container>
        <DashboardNav></DashboardNav>
        <Sidebar />
        <LayoutMain>
          <SectionMain>
            <Heading2>{t('home.desc')}</Heading2>
            {auth.description ? (
              <Paragraph>{auth.description}</Paragraph>
            ) : (
              <Paragraph>{t('home.noDesc')}</Paragraph>
            )}
          </SectionMain>
          <SectionMain>
            <Heading2>{t('home.activity')}</Heading2>
            <Paragraph>Nothing here for the moment</Paragraph>
          </SectionMain>
        </LayoutMain>
      </Container>
    </>
  );
};

export default Home;
