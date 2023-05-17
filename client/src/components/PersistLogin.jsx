import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const { refresh } = useRefreshToken();

  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      console.log('hello');
      const response = await axiosPrivate.get('/teams/me');
      setAuth((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      setAuth(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      await refresh();
      if (auth.accessToken) await fetchUserData();
    };

    fetchData();

    return () => (isMounted = false);
  }, [auth.accessToken]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
