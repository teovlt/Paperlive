import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import { Heading2, SectionContainer } from '../../theme/appElements';

const Statistics = () => {
  const { auth } = useAuth();

  const contributions = auth.contributions;
  const submissions = auth.contributions.reduce((acc, curr) => acc.concat(curr.submissions), []);

  return (
    <>
      <SectionContainer>
        <Heading2>Statistics</Heading2>
      </SectionContainer>
    </>
  );
};

export default Statistics;
