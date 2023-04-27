import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

// Import components
import PersistLogin from '../components/PersistLogin';
import RequireAuth from '../components/RequireAuth';

// Import pages
import Home from '../pages/Home';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';

const Routes = () => {
  return (
    <Switch>
      {/* public route */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* protected routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Route>

      {/* catch all */}
      {/* <Route path='*' element={} /> */}
    </Switch>
  );
};

export default Routes;
