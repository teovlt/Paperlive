import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Informations from './Informations';
import Files from './Files';
import Summary from './Summary';

const NewContribution = () => {
  const { step } = useParams();

  const [data, setData] = useState({
    title: '',
    startDate: '',
    teamRole: '',
    relatedContributions: [],
    abstract: null,
  });

  switch (step) {
    case 'informations':
      return <Informations data={data} setData={setData} />;
    case 'files':
      return <Files data={data} setData={setData} />;
    case 'summary':
      return <Summary data={data} />;
  }
};

export default NewContribution;
