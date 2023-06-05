import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../../components/Loading';
import { Group, SectionContainer } from '../submissionElements';
import FormSelector from '../../../components/FormSelector';
import { Button } from '../../../theme/appElements';
import { useNavigate } from 'react-router-dom';

const Venue = ({ data, setData }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [venues, setVenues] = useState(null);

  useEffect(() => {
    async function fetchVenues() {
      const response = await axiosPrivate.get('/venues');
      setVenues(response.data);
    }

    fetchVenues();
  }, []);

  if (!venues) return <Loading />;

  return (
    <SectionContainer>
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../informations')}>
          Previous
        </Button>
        <Button onClick={() => navigate('../venue')}>Next</Button>
      </Group>
    </SectionContainer>
  );
};

export default Venue;
