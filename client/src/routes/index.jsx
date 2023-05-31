import React from 'react';
import { Route, Routes as Switch, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
import ContributionStatistics from '../pages/Contributions/Contribution/Statistics';
import ContributionSettings from '../pages/Contributions/Contribution/Settings';
import AccountSettings from '../pages/Settings/Account';
import AppearanceSettings from '../pages/Settings/Appearance';
import SecuritySettings from '../pages/Settings/Security';
import Submission from '../pages/Submission';
import SubmissionSettings from '../pages/Submission/Settings';
import NewSubmission from '../pages/Submission/NewSubmission';
import SidebarProfile from '../components/SidebarProfile';
import SidebarNavigation from '../components/SidebarNavigation';
import Navigation from '../components/Navigation';
import { HiLockClosed, HiSwatch, HiUserCircle } from 'react-icons/hi2';

const Routes = () => {
  const { t } = useTranslation();

  return (
    <Switch>
      {/* anonymous routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<PersistLogin />}>
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          {/* profile layout */}
          <Route path='/' element={<Layout sidebar={<SidebarProfile />} head={<Navigation />} />}>
            <Route path='' element={<Home />} />
            <Route path='contributions' element={<Contributions />} />
            <Route path='statistics' element={<Statistics />} />
          </Route>

          <Route
            path='/contributions/:id'
            element={
              <Layout
                sidebar={
                  <SidebarNavigation
                    template={[
                      {
                        title: t('global.contribution'),
                        links: [
                          { label: t('contribution.overview'), to: '' },
                          { label: t('contribution.statistics'), to: 'statistics' },
                          { label: t('contribution.settings'), to: 'settings' },
                        ],
                      },
                    ]}
                  />
                }
                head={<Navigation />}
              />
            }>
            <Route path='' element={<Contribution />} />
            <Route path='statistics' element={<ContributionStatistics />} />
            <Route path='settings' element={<ContributionSettings />} />
          </Route>

          <Route path='/contributions/new' element={<NewContribution />} />

          <Route
            path='/submissions/:id'
            element={
              <Layout
                sidebar={
                  <SidebarNavigation
                    template={[
                      {
                        title: t('global.submission'),
                        links: [
                          // TODO: change translation
                          { label: t('contribution.overview'), to: '' },
                          { label: t('contribution.statistics'), to: 'statistics' },
                          { label: t('contribution.settings'), to: 'settings' },
                        ],
                      },
                    ]}
                  />
                }
                head={<Navigation />}
              />
            }>
            <Route path='' element={<Submission />} />
            <Route path='statistics' element={<ContributionStatistics />} />
            <Route path='settings' element={<SubmissionSettings />} />
          </Route>

          <Route path='/submissions/new' element={<NewSubmission />} />

          <Route
            path='/settings/'
            element={
              <Layout
                sidebar={
                  <SidebarNavigation
                    template={[
                      {
                        title: t('settings.sections.profile'),
                        links: [
                          {
                            label: t('settings.pages.myAccount'),
                            icon: <HiUserCircle />,
                            to: '/settings/profile',
                          },
                        ],
                      },
                      {
                        title: t('settings.sections.security'),
                        links: [
                          {
                            label: t('global.password'),
                            icon: <HiLockClosed />,
                            to: '/settings/security',
                          },
                        ],
                      },
                      {
                        title: t('settings.sections.accessibility'),
                        links: [
                          {
                            label: t('settings.pages.appearance'),
                            icon: <HiSwatch />,
                            to: '/settings/appearance',
                          },
                        ],
                      },
                    ]}
                  />
                }
              />
            }>
            <Route path='' element={<Navigate to='profile' replace />} />
            <Route path='profile' element={<AccountSettings />} />
            <Route path='security' element={<SecuritySettings />} />
            <Route path='appearance' element={<AppearanceSettings />} />
          </Route>
        </Route>
      </Route>

      {/* catch all */}
      <Route path='*' element={<NotFound />} />
    </Switch>
  );
};

export default Routes;
