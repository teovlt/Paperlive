import React from 'react';
import { Container, Img, Title, DivError, ButtonBack } from './notFoundElements';
import { Heading1, Heading2 } from '../../theme/appElements';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <DivError>
          <Title>PAGE NOT FOUND</Title>
          <Heading1>The requested url was not found on this server.</Heading1>
          <ButtonBack onClick={() => navigate('/')}>Back to homePage</ButtonBack>
        </DivError>
        <Img src='../../../public/images/404.svg' alt='image404' />
      </Container>
    </>
  );
};
export default NotFound;
