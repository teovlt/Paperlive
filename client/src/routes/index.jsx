import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

// Import components
import PersistLogin from '../components/PersistLogin';

// Import pages
import Home from '../pages/Home';
import SignIn from '../pages/Authentication/Login';
import SignUp from '../pages/Authentication/SignUp';

const Routes = () => {
  return (
    <Switch>
      {/* public route */}
      <Route path='/login' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />

      {/* protected routes */}
      <Route element={<PersistLogin />}>
        <Route path='/' element={<Home />} />
      </Route>

      {/* catch all */}
      {/* <Route path='*' element={} /> */}
    </Switch>
  );
};

export default Routes;
