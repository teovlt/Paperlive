import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Informations from './Informations';
import Authors from './Authors';
import Venue from './Venue';

const NewSubmission = () => {
  const { step } = useParams();

  const [data, setData] = useState({
    contribution: '',
    title: '',
    state: 'draft',
    type: '',
  });

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  switch (step) {
    case 'informations':
      return <Informations data={data} setData={setData} />;
    case 'authors':
      return <Authors data={data} setData={setData} />;
    case 'venue':
      return <Venue data={data} setData={setData} />;
  }
};

export default NewSubmission;
