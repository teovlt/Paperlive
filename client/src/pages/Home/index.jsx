import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { DashboardNav } from '../../theme/appElements';
import { Container } from './homeElements';
import NavBar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

const Home = () => {
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
      </Container>
      <Footer/>
    </>
  );
};

export default Home;
