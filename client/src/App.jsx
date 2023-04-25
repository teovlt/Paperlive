import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './theme/globalStyle';

// Import pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import PrivatePage from './pages/privatePage';
import PrivateRoutes from './components/PrivateRoutes';

// Import components

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/private' element={<PrivatePage />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
