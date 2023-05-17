import React, { useState } from 'react';
import { NavContainer, Actions, Logo } from './navbarElements';
import { HiGlobeAlt, HiUserGroup, HiPlus, HiMoon, HiOutlineMoon } from 'react-icons/hi2';
import i18n from '../../translations/i18n';
import { useTranslation } from 'react-i18next';
import useLogout from '../../hooks/useLogout';
import DropdownMenu from '../Dropdown';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const NavBar = () => {
  const { t } = useTranslation();
  const lngs = {
    en: { nativeName: t('language.english'), flag: '🇬🇧' },
    fr: { nativeName: t('language.french'), flag: '🇫🇷' },
    es: { nativeName: `${t('language.spanish')} (${t('global.beta')})`, flag: '🇪🇸' },
  };

  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  const languagesDropdownTemplate = {
    toggle: <HiGlobeAlt />,
    groups: [
      {
        label: t('language.current'),
        value: lngs[i18n.resolvedLanguage].nativeName,
      },
      {
        actions: Object.keys(lngs).map((lng) => ({
          label: `${lngs[lng].flag} ${lngs[lng].nativeName}`,
          onClick: () => i18n.changeLanguage(lng),
        })),
      },
    ],
  };

  const profileDropdownTemplate = {
    toggle: <HiUserGroup />,
    groups: [
      {
        label: t('dropDown.signedAs'),
        value: auth.name?.toUpperCase(),
      },
      {
        actions: [
          {
            label: t('dropDown.profile'),
            onClick: () => navigate('/'),
          },
          {
            label: t('global.contributions'),
            onClick: () => navigate('/contributions'),
          },
          {
            label: t('dropDown.statistics'),
            onClick: () => navigate('/statistics'),
          },
        ],
      },
      {
        actions: [
          {
            label: t('dropDown.settings'),
            onClick: () => navigate('/settings'),
          },
          {
            label: t('dropDown.logout'),
            onClick: signOut,
          },
        ],
      },
    ],
  };

  const actionDropdownTemplate = {
    toggle: <HiPlus />,
    groups: [
      {
        actions: [
          {
            label: t('dropDown.newContribution'),
            onClick: () => navigate('/contributions/new'),
          },
          {
            label: t('dropDown.newSubmission'),
            onClick: () => navigate('/'),
          },
        ],
      },
    ],
  };

  // const themeDropdownTemplate = {
  //   toggle: <HiMoon />,
  //   groups: [
  //     {
  //       label: 'Theme actuel : ',
  //       value: theme,
  //     },
  //     {
  //       actions: Object.keys(themes).map((theme) => ({
  //         label: `${themes[theme].icon}${themes[theme].name} `,
  //         onClick: () => setTheme(theme),
  //       })),
  //     },
  //   ],
  // };

  return (
    <NavContainer>
      <Logo to='/'>PaperLive</Logo>

      <Actions>
        <DropdownMenu template={actionDropdownTemplate} />
        <DropdownMenu template={languagesDropdownTemplate} />
        <DropdownMenu template={profileDropdownTemplate} />
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
