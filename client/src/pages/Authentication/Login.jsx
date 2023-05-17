import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, OptionsContainer, Button } from './authenticationElements';
import { Caption, Heading1, Heading2, Link, Small } from '../../theme/appElements';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from '../../api/axios';
import DropdownMenu from '../../components/Dropdown';
import Chips from '../../components/Chips';
import { HiGlobeAlt } from 'react-icons/hi2';
import i18n from '../../translations/i18n';
const LOGIN_URL = '/auth/login';

const Login = () => {
  const { t, i18n } = useTranslation();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const nameRef = useRef();
  const errorRef = useRef();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const lngs = {
    en: { nativeName: t('language.english'), flag: '🇬🇧' },
    fr: { nativeName: t('language.french'), flag: '🇫🇷' },
    de: { nativeName: `${t('language.german')} (${t('global.beta')})`, flag: '🇩🇪' },
    es: { nativeName: `${t('language.spanish')} (${t('global.beta')})`, flag: '🇪🇸' },
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [name, password, t]);

  useEffect(() => {
    const errorMessages = {
      serverError: t('authentication.servorError'),
      invalidLogin: t('login.invalidLogin'),
      loginError: t('login.loginError'),
    };

    Object.entries(errorMessages).forEach(([key, value]) => {
      if (errMsg && errMsg === value) {
        setErrMsg(errorMessages[key]);
      }
    });
  }, [t]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({ name, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const accessToken = res?.data?.accessToken;
      setAuth({ accessToken });
      setName('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg(t('authentication.servorError'));
      } else if (error.response?.status === 400) {
        setErrMsg(t('login.invalidLogin'));
      } else {
        setErrMsg(t('login.loginError'));
      }
    }
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

  return (
    <>
      <OptionsContainer>
        <DropdownMenu template={languagesDropdownTemplate} gap={27} />
      </OptionsContainer>
      <Container>
        <Heading1>PaperLive</Heading1>
        <Form onSubmit={handleSubmit}>
          <Heading2>{t('login.welcome')}</Heading2>
          <Input
            type='text'
            ref={nameRef}
            id='name'
            label={t('authentication.teamName')}
            autoComplete='off'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <Input
            type='password'
            id='password'
            label={t('authentication.password')}
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {errMsg && <Chips type='negative'>{errMsg}</Chips>}
          <Button type='submit'>{t('authentication.signIn')}</Button>
          <Caption>
            {t('login.textSignUp')} <Link to='/register'>{t('authentication.signUp')}</Link>
          </Caption>
        </Form>
        <Small style={{ textAlign: 'center' }}>{t('login.bottom')}</Small>
      </Container>
    </>
  );
};

export default Login;
