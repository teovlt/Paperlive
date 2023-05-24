import React from 'react';

import { Button} from '../../../theme/appElements';
import { LinearContainer } from '../../Contributions/contributionsElements';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';

const FormStep5 = ({ submissionData, previous, goTo }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const save = async () => {
    //enregistrer la soumission
    navigate('/contributions');
  };

  return (
    <>
      <LinearContainer>
        <Button style={{ width: '160px' }} type='neutral' onClick={() => previous()}>
          {t('global.previous')}
        </Button>
        <Button style={{ width: '160px' }} onClick={() => save()}>
          {t('global.save')}
        </Button>
      </LinearContainer>
    </>
  );
};

export default FormStep5;
