import React from 'react';
import { Route, Routes as Switch, Navigate } from 'react-router-dom';

// Import components
import PersistLogin from '../components/PersistLogin';
import RequireAuth from '../components/RequireAuth';
import Layout from '../components/Layout';

// Import pages
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Home from '../pages/Home';
import Contributions from '../pages/Contributions';
import NewContribution from '../pages/Contributions/NewContribution';
import Statistics from '../pages/Statistics';
import NotFound from '../pages/NotFound';
import Contribution from '../pages/Contributions/Contribution';
import SettingsLayout from '../components/SettingsLayout';
import ProfilSettings from '../pages/Settings/profile';
import ThemeSettings from '../pages/Settings/theme';
import SecuritySettings from '../pages/Settings/security';

const Routes = () => {
  return (
    <Switch>
      {/* anonymous routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<PersistLogin />}>
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          {/* profile layout */}
          <Route path='/' element={<Layout />}>
            <Route path='' element={<Home />} />
            <Route path='/contributions/' element={<Contributions />} />
            <Route path='/statistics' element={<Statistics />} />
          </Route>

          <Route path='/contributions/new' element={<NewContribution />} />
          <Route path='/contributions/:contributionId' element={<Contribution />} />

          <Route path='/settings' element={<SettingsLayout />}>
            <Route path='/settings/profile' element={<ProfilSettings />} />
            <Route path='/settings/security' element={<SecuritySettings />} />
            <Route path='/settings/theme' element={<ThemeSettings />} />
          </Route>
        </Route>
      </Route>

      {/* catch all */}
      <Route path='*' element={<NotFound />} />
    </Switch>
  );
};

export default Routes;
