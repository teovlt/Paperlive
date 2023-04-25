import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './theme/globalStyle';
import PrivateRoutes from './components/PrivateRoutes';

// Import pages
import Home from './pages/Home';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

// Import components

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />

        <Route element={<PrivateRoutes />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
