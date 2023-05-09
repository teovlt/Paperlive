import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { HiPlus } from 'react-icons/hi2';
import { SectionMain, Btn } from './contributionsElements';
import { useTranslation } from 'react-i18next';

function Contributions() {
  const { t } = useTranslation();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h2>{auth.contributions?.length} contribution(s)</h2>
      <SectionMain>
        <input type='text' placeholder='Rechercher une contribution' />
        <Btn onClick={() => navigate('/contributions/new')}>
          {t('contribution.addContribution')}
          <HiPlus />
        </Btn>
      </SectionMain>
    </>
  );
}

export default Contributions;
