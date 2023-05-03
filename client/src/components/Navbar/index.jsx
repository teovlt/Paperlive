import React from 'react';
import { NavContainer, ShearchBar, Actions, H1 } from './navbarElements';
import { HiGlobeAlt, HiUserGroup } from 'react-icons/hi2';
import { HiOutlineSearch } from 'react-icons/hi';
import i18n from '../../translations/i18n';
import { useTranslation } from 'react-i18next';
import useLogout from '../../hooks/useLogout';
import DropdownMenu from '../DropdownMenu';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const NavBar = () => {
  const { t } = useTranslation();
  const lngs = {
    en: { nativeName: `${t('language.english')}`, flag: '🇬🇧' },
    fr: { nativeName: `${t('language.french')}`, flag: '🇫🇷' },
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
        label: `${t('language.current')}`,
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
        label: `${t('dropDown.signedAs')}`,
        value: auth.name?.toUpperCase(),
      },
      {
        actions: [
          {
            label: `${t('dropDown.profile')}`,
            onClick: () => navigate('/'),
          },
          {
            label: `${t('dropDown.contributions')}`,
            onClick: () => navigate('/contributions'),
          },
          {
            label: `${t('dropDown.statistics')}`,
            onClick: () => navigate('/statistics'),
          },
        ],
      },
      {
        actions: [
          {
            label: `${t('dropDown.logout')}`,
            onClick: signOut,
          },
        ],
      },
    ],
  };

  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder={t('navbar.search')}></input>

        <HiOutlineSearch />
      </ShearchBar>

      <H1>PaperLive</H1>

      <Actions>
        <DropdownMenu template={profileDropdownTemplate} />
        <DropdownMenu template={languagesDropdownTemplate} />
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
