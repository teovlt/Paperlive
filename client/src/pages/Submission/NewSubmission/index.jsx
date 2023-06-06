import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Informations from './Informations';
import Authors from './Authors';
import Venue from './Venue';
import Summary from './Summary';
import Files from './Files';

const NewSubmission = () => {
  const { step } = useParams();

  const [data, setData] = useState({
    contribution: '',
    title: '',
    state: 'draft',
    type: '',
  });

  switch (step) {
    case 'informations':
      return <Informations data={data} setData={setData} />;
    case 'authors':
      return <Authors data={data} setData={setData} />;
    case 'venue':
      return <Venue data={data} setData={setData} />;
    case 'files':
      return <Files data={data} setData={setData} />;
    case 'summary':
      return <Summary data={data} />;
  }
};

export default NewSubmission;
