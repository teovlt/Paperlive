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
      <FormSelector
        unique
        list={venues}
        setList={setVenues}
        selected={data.venue ? [data.venue] : []}
        setSelected={(selected) => {
          const updatedData = { ...data, venue: selected[0] };
          setData(updatedData);
        }}
        displayedAttribute='name'
        label='Venue'
        modelName='venues'
        schema={{
          name: {
            label: 'Name',
            type: 'text',
            default: '',
            required: true,
          },
          rank: {
            label: 'Rank',
            type: 'text',
            default: '',
            required: true,
          },
        }}
      />
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../authors')}>
          Previous
        </Button>
        <Button onClick={() => navigate('../files')}>Next</Button>
      </Group>
    </SectionContainer>
  );
};

export default Venue;
