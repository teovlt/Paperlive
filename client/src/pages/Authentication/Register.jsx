import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, DivLanguageIcon } from './authenticationElements';
import { Button, Caption, Heading1, Heading2, Link, Small } from '../../theme/appElements';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
const REGISTER_URL = '/auth/register';
import { useTranslation } from 'react-i18next';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';

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

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [name, password, passwordConf]);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s:])(?!.*\s).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (passwordRegex.test(password) && password === passwordConf) {
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
        console.log('oui');
      } else {
        if (!passwordRegex.test(password)) {
          console.log(
            'Votre mot de passe doit contenir au moins 8 caractères, dont une majuscule une minuscule 1 chiffre et 1 caractère spécial'
          );
        }
        if (password !== passwordConf) {
          console.log('Vos mots de passe ne sont pas les mêmes');
        }
        //vérif nom de team déja pris

        console.log(password);
        console.log(passwordConf);
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Register Failed');
      }
    }
  };

  return (
    <Container>
      <DivLanguageIcon>
        <HiOutlineGlobeAlt />
      </DivLanguageIcon>
      <Heading1>PaperLive</Heading1>
      <Form onSubmit={handleSubmit} autocomplete='off'>
        <Heading2>{t('register.welcome')}</Heading2>
        <Input
          type='text'
          ref={nameRef}
          id='name'
          label={t('register.teamName')}
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <Input
          type='password'
          id='password'
          label={t('register.password')}
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
        <Button type='submit'>{t('register.signUp')}</Button>
        <Caption>
          {t('register.textSignIn')}
          <Link to='/login'>{t('register.signIn')}</Link>
        </Caption>
      </Form>
      <Small>{t('register.bottom')}</Small>
    </Container>
  );
};

export default Register;
