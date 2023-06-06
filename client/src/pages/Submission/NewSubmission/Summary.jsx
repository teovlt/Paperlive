import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../theme/appElements';
import { Group } from '../submissionElements';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const Summary = ({ data }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleSave = async () => {
    if (data.title) {
      const submission = { contributionId: data.contribution._id, ...data };
      delete submission.contribution;
      const res = await axiosPrivate.post('/submissions/new', submission);
      console.log(res);
    }
  };

  return (
    <Group inline>
      <Button type='neutral' onClick={() => navigate('../files')}>
        Previous
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </Group>
  );
};

export default Summary;
