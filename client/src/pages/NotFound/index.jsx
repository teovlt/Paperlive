import React from 'react';
import { Container, Img, Title, DivError, ButtonBack } from './notFoundElements';
import { Heading1, Heading2 } from '../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <DivError>
          <Title>{t('404.notFound')}</Title>
          <Heading1>{t('404.error')}</Heading1>
          <ButtonBack onClick={() => navigate('/')}>{t('404.back')}</ButtonBack>
        </DivError>
        <Img src='../../../public/images/404.svg' alt='image404' />
      </Container>
    </>
  );
};
export default NotFound;
