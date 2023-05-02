import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, DivLanguageIcon } from './authenticationElements';
import { Button, Caption, Heading1, Heading2, Link, Small } from '../../theme/appElements';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from '../../api/axios';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';
const LOGIN_URL = '/auth/login';

const Login = () => {
  const { t } = useTranslation();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const nameRef = useRef();
  const errorRef = useRef();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [name, password]);

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
        setErrMsg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  return (
    <Container>
      <DivLanguageIcon>
        <HiOutlineGlobeAlt />
      </DivLanguageIcon>
      <Heading1>PaperLive</Heading1>
      <Form onSubmit={handleSubmit}>
        <Heading2>{t('login.welcome')}</Heading2>
        <Input
          type='text'
          ref={nameRef}
          id='name'
          label={t('login.teamName')}
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <Input
          type='password'
          id='password'
          label={t('login.password')}
          autoComplete='off'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <Button type='submit'>{t('login.signIn')}</Button>
        <Caption>
          {t('login.textSignUp')} <Link to='/register'>{t('login.signUp')}</Link>
        </Caption>
      </Form>
      <Small style={{ textAlign: 'center' }}>{t('login.bottom')}</Small>
    </Container>
  );
};

export default Login;
