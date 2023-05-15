import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

import { Heading2, Paragraph } from '../../theme/appElements';
import { SectionMain } from './homeElements';

const Home = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  return (
    <>
      <SectionMain>
        <Heading2>{t('home.desc')}</Heading2>
        <Paragraph>{auth.description || t('home.noDesc')}</Paragraph>
      </SectionMain>
      <SectionMain>
        <Heading2>{t('home.activity')}</Heading2>
        <Paragraph>{t('home.noActivity')}</Paragraph>
      </SectionMain>
    </>
  );
};

export default Home;
