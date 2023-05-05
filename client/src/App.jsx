import React, { useEffect } from 'react';
import GlobalStyle from './theme/globalStyle';
import Routes from './routes';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import useAuth from './hooks/useAuth';

function App() {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchAuth() {
      const res = await axiosPrivate.get('/teams/me');
      setAuth((prev) => ({ ...prev, ...res.data }));
    }

    if (auth.accessToken) fetchAuth();
  }, [auth.accessToken]);

  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
}

export default App;
