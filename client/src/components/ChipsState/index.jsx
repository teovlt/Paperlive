import React from 'react';
import { Container } from './chipsStateElements';
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlinePencil,
} from 'react-icons/hi2';

const ChipsState = ({ type, children }) => {
  return (
    <Container type={type} style={{ height: '30px' }}>
      {type === 'positive' ? (
        <HiOutlineCheckCircle />
      ) : type === 'notice' ? (
        <HiOutlineClock />
      ) : type === 'destructive' ? (
        <HiOutlineXCircle />
      ) : (
        <HiOutlinePencil />
      )}
      {children}
    </Container>
  );
};

export default ChipsState;
