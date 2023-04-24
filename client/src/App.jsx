import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './theme/globalStyle';

// Import pages
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
