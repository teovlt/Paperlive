import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, OptionsContainer } from './authenticationElements';
import { Button, Caption, Heading1, Heading2, Link, Small } from '../../theme/appElements';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from '../../api/axios';
import DropdownMenu from '../../components/DropdownMenu';
import { HiGlobeAlt } from 'react-icons/hi2';
import i18n from '../../translations/i18n';
import { ErrorLabel } from './authenticationElements';
const REGISTER_URL = '/auth/register';

const Register = () => {
  const { t } = useTranslation();

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const nameRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPaswordConf] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s:])(?!.*\s).{8,}$/;

  const lngs = {
    en: { nativeName: `${t('language.english')}`, flag: '🇬🇧' },
    fr: { nativeName: `${t('language.french')}`, flag: '🇫🇷' },
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [name, password, passwordConf]);

  useEffect(() => {
    if (passwordConf && password !== passwordConf) {
      setErrMsg(`${t('register.errorPasswordConf')}`);
    }
    if (password && !passwordRegex.test(password)) {
      setErrMsg(`${t('register.errorPasswordFormat')}`);
    }
  }, [password, passwordConf, i18n.resolvedLanguage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!errMsg) {
        const res = await axios.post(REGISTER_URL, JSON.stringify({ name, password }), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const accessToken = res?.data?.accessToken;
        setAuth({ accessToken });
        setName('');
        setPassword('');
        setPaswordConf('');
        navigate('/', { replace: true });
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg(`${t('authentication.servorError')}`);
      } else {
        setErrMsg(`${t('register.registerError')}`);
      }
    }
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

  return (
    <>
      <OptionsContainer>
        <DropdownMenu template={languagesDropdownTemplate} gap={27} />
      </OptionsContainer>
      <Container>
        <Heading1>PaperLive</Heading1>
        <Form onSubmit={handleSubmit} autocomplete='off'>
          <Heading2>{t('register.welcome')}</Heading2>
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
          <Input
            type='password'
            id='passwordconf'
            label={t('register.password2')}
            autoComplete='off'
            onChange={(e) => setPaswordConf(e.target.value)}
            value={passwordConf}
            required
          />
          {errMsg && <ErrorLabel>{errMsg}</ErrorLabel>}
          <Button type='submit'>{t('register.signUp')}</Button>
          <Caption>
            {t('register.textSignIn')}
            <Link to='/login'>{t('register.signIn')}</Link>
          </Caption>
        </Form>
        <Small>{t('authentication.bottom')}</Small>
      </Container>
    </>
  );
};

export default Register;
