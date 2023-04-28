import React, { useState, useEffect, useRef } from 'react';
import { NavContainer, ShearchBar, Actions, H1 } from './navbarElements';
import { HiGlobeAlt, HiOutlinePlus, HiUserGroup } from 'react-icons/hi2';
import { HiOutlineSearch } from 'react-icons/hi';
import DropDown from '../DropDown';
import i18n from '../../translations/i18n';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const options = [
    { label: 'Profile', value: 'param1' },
    { label: 'Contributions', value: 'param2' },
    { label: 'Statistics', value: 'param3' },
    { label: 'Settings', value: 'param4' },
    { label: 'SignOut', value: 'param5', action: '/login' },
  ];
  const options2 = [
    { label: 'New contribution', value: 'param1' },
    { label: 'aa', value: 'param2' },
    { label: 'aaa', value: 'param3' },
    { label: 'aaaa', value: 'param4' },
    { label: 'aaaaa', value: 'param5' },
  ];

  const options3 = [
    { label: 'English', value: 'param1' },
    { label: 'French', value: 'param2' },
  ];

  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [showDropDown3, setShowDropDown3] = useState(false);
  const ref = useRef(null);

  const handleClose = () => {
    setShowDropDown(false);
    setShowDropDown2(false);
    setShowDropDown3(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handleClose]);

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
    setShowDropDown2(false);
    setShowDropDown3(false);
  };

  const handleDropDown2 = () => {
    setShowDropDown2(!showDropDown2);
    setShowDropDown(false);
    setShowDropDown3(false);
  };

  const handleDropDown3 = () => {
    setShowDropDown3(!showDropDown3);
    setShowDropDown2(false);
    setShowDropDown(false);
  };
  const { t } = useTranslation();
  const lngs = {
    en: { nativeName: `${t('navbar.english')}` },
    fr: { nativeName: `${t('navbar.french')}` },
  };

  return (
    <NavContainer>
      <ShearchBar>
        <input type='text' placeholder={t('navbar.search')}></input>

        <HiOutlineSearch />
      </ShearchBar>

      <H1>PaperLive</H1>

      <Actions ref={ref}>
        <div onClick={handleDropDown3}>
          <HiGlobeAlt />
        </div>
        {showDropDown3 && <DropDown options={options3} />}
        <div onClick={handleDropDown2}>
          <HiOutlinePlus />
        </div>
        {showDropDown2 && <DropDown options={options2} />}

        <div onClick={handleDropDown}>
          <HiUserGroup />
        </div>
        {showDropDown && <DropDown options={options} teamName={'ERODS'} />}

        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
                color: 'white',
              }}
              type='submit'
              onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </Actions>
    </NavContainer>
  );
};

export default NavBar;
