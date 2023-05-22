import React, { useState, useEffect } from 'react';
import { Heading2 } from '../../theme/appElements';
import Input from '../../components/Input';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const SecuritySettings = () => {
  const { t } = useTranslation();
  const { auth, setAuth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const [profilData, setProfilData] = useState(auth);

  useEffect(() => {
    setProfilData(auth);
  }, [auth]);

  const verifyPassword = () => {
    console.log(e.target.value);
  };

  return (
    <>
      <Heading2 style={{ borderBottom: '1px solid var(--black-quaternary)' }}>
        Password and authentification
      </Heading2>
    </>
  );
};

export default SecuritySettings;
