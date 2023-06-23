import React, { useState } from 'react';
import { NavContainer, Actions, Logo, Input, Recherche } from './navbarElements';
import { HiGlobeAlt, HiUserGroup, HiPlus, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import i18n from '../../translations/i18n';
import { useTranslation } from 'react-i18next';
import useLogout from '../../hooks/useLogout';
import DropdownMenu from '../Dropdown';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const NavBar = () => {
  const { t } = useTranslation();
  const lngs = {
    en: { nativeName: t('language.english'), flag: '🇬🇧' },
    fr: { nativeName: t('language.french'), flag: '🇫🇷' },
  };

  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  const notify = () => {
    toast.success(t('toast.languageChangementSucess'), {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
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
          onClick: () => {
            i18n.changeLanguage(lng), notify();
          },
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
            label: t('navigation.overview'),
            onClick: () => navigate('/'),
          },
          {
            label: t('navigation.contributions'),
            onClick: () => navigate('/contributions'),
          },
          {
            label: t('navigation.statistics'),
            onClick: () => navigate('/statistics'),
          },
        ],
      },
      {
        actions: [
          {
            label: t('dropDown.about'),
            onClick: () => navigate('/about'),
          },
          {
            label: t('dropDown.settings'),
            onClick: () => navigate('/settings/profile'),
          },
        ],
      },
      {
        actions: [
          {
            label: t('dropDown.logout'),
            onClick: signOut,
          },
        ],
      },
    ],
  };

  return (
    <>
      <NavContainer>
        <Logo to='/'>PaperLive</Logo>
        <Actions>
          <DropdownMenu template={languagesDropdownTemplate} />
          <DropdownMenu template={profileDropdownTemplate} />
        </Actions>
      </NavContainer>
    </>
  );
};

export default NavBar;
