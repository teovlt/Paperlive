import React from 'react';
import { FooterContainer } from './footerElements';
import { Caption } from '../../theme/appElements';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <Caption>{t('footer.label')}</Caption>
    </FooterContainer>
  );
};

export default Footer;
