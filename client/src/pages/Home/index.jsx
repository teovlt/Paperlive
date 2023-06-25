import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

import { Heading2, Paragraph, SectionContainer } from '../../theme/appElements';

const Home = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  return (
    <>
      <SectionContainer>
        <Heading2>{t('home.desc')}</Heading2>
        <Paragraph>{auth.description || t('home.noDesc')}</Paragraph>
      </SectionContainer>
      <SectionContainer>
        <Heading2>{t('home.appDemo')}</Heading2>
        <video controls>
          <source src='/videos/demo-paperlive.mp4' type='video/mp4' />
        </video>
      </SectionContainer>
    </>
  );
};

export default Home;
