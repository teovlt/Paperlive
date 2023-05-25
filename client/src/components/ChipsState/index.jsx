import React from 'react';
import { Container } from './chipsStateElements';
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle } from 'react-icons/hi2';

const ChipsState = ({ type, children }) => {
  return (
    <Container type={type} style={{ height: '30px' }}>
      {type === 'positive' ? (
        <HiOutlineCheckCircle />
      ) : type === 'notice' ? (
        <HiOutlineClock />
      ) : (
        <HiOutlineXCircle />
      )}
      {children}
    </Container>
  );
};

export default ChipsState;
