import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';

const PersistLogin = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axiosPrivate.get('/teams/me');
      setAuth((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      // console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchUserData();

    return () => (isMounted = false);
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
