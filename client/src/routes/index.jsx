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
import Statistics from '../pages/Statistics';
import NotFound from '../pages/NotFound';
import Contribution from '../pages/Contributions/Contribution';
import ContributionSettings from '../pages/Contributions/Contribution/Settings';
import NewContribution from '../pages/Contributions/NewContribution';
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
import About from '../pages/About';

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
            <Route path='about' element={<About />} />
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
            <Route path='settings' element={<ContributionSettings />} />
          </Route>

          <Route
            path='/contributions/new'
            element={
              <Layout
                sidebar={
                  <SidebarNavigation
                    template={[
                      {
                        title: t('contribution.newContribution'),
                        links: [
                          { label: t('submission.informations'), to: 'informations' },
                          { label: t('submission.files'), to: 'files' },
                          { label: t('submission.recap'), to: 'summary' },
                        ],
                      },
                    ]}
                  />
                }
              />
            }>
            <Route path='' element={<Navigate to='informations' replace />} />
            <Route path=':step' element={<NewContribution />} />
          </Route>

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
                          { label: t('contribution.overview'), to: '' },
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
            <Route path='settings' element={<SubmissionSettings />} />
          </Route>

          <Route
            path='/submissions/new'
            element={
              <Layout
                sidebar={
                  <SidebarNavigation
                    template={[
                      {
                        title: t('submission.newSubmission'),
                        links: [
                          { label: t('submission.informations'), to: 'informations' },
                          { label: t('submission.authors'), to: 'authors' },
                          { label: t('submission.venue'), to: 'venue' },
                          { label: t('submission.files'), to: 'files' },
                          { label: t('submission.recap'), to: 'summary' },
                        ],
                      },
                    ]}
                  />
                }
              />
            }>
            <Route path='' element={<Navigate to='informations' replace />} />
            <Route path=':step' element={<NewSubmission />} />
          </Route>

          <Route
            path='/settings'
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
                            to: 'profile',
                          },
                        ],
                      },
                      {
                        title: t('settings.sections.security'),
                        links: [
                          {
                            label: t('global.password'),
                            icon: <HiLockClosed />,
                            to: 'security',
                          },
                        ],
                      },
                      {
                        title: t('settings.sections.accessibility'),
                        links: [
                          {
                            label: t('settings.pages.appearance'),
                            icon: <HiSwatch />,
                            to: 'appearance',
                          },
                        ],
                      },
                    ]}
                  />
                }
                head={<Navigation />}
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
