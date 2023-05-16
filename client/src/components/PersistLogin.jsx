import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axiosPrivate.get('/teams/me');
      setAuth((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    refresh();

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    // FIXME:
    fetchUserData();
  }, [auth.accessToken]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
