import React from 'react';
import { Container } from './chipsElement';
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineXCircle,
} from 'react-icons/hi2';

const Chips = ({ type, children }) => {
  return (
    <Container type={type}>
      {type === 'positive' ? (
        <HiOutlineCheckCircle />
      ) : type === 'notice' ? (
        <HiOutlineExclamationCircle />
      ) : (
        <HiOutlineXCircle />
      )}
      {children}
    </Container>
  );
};

export default Chips;
