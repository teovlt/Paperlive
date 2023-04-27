import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Loading } from '../theme/appElements';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        // console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading>
          <UilSpinnerAlt />
        </Loading>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
