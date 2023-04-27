import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Home = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosPrivate.get('/teams/me');

        setAuth((prev) => {
          return {
            ...prev,
            ...res.data,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [auth.accessToken]);

  return <div>Connected as {auth.name}</div>;
};

export default Home;
