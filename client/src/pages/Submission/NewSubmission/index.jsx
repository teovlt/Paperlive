import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Informations from './Informations';
import Authors from './Authors';
import Venue from './Venue';
import Files from './Files';
import Summary from './Summary';

const NewSubmission = () => {
  const { contributionId, step } = useParams();

  const [data, setData] = useState({
    contributionId,
    title: '',
    submissionDate: '',
    state: 'draft',
    type: '',
    authors: [],
    venue: '',
    abstract: null,
    zipFolder: null,
    compiledPDF: null,
    diffPDF: null,
    commentPDF: null,
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
