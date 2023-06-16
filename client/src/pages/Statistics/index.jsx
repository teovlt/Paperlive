import React from 'react';
import ProductionTime from './Charts/ProductionTime';
import useAuth from '../../hooks/useAuth';

const Statistics = () => {
  const { auth } = useAuth();
  const contributions = auth.contributions;
  return <ProductionTime contributions={contributions}></ProductionTime>;
};

export default Statistics;
