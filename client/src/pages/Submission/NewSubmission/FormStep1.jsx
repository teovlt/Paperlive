import React from 'react';
import { LinearContainer } from '../contributionsElements';
import { Button } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const FormStep1 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <>
      <LinearContainer>
        <Button style={{ width: '160px' }} type='neutral' onClick={() => navigate(-1)}>
          {t('global.cancel')}
        </Button>
        <Button style={{ width: '160px' }}>{t('global.next')}</Button>
      </LinearContainer>
    </>
  );
};

export default FormStep1;
