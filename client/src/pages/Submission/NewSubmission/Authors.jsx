import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../../components/Loading';
import { Group, SectionContainer } from '../submissionElements';
import FormSelector from '../../../components/FormSelector';
import { Button, Heading2 } from '../../../theme/appElements';
import { useNavigate } from 'react-router-dom';

const Authors = ({ data, setData }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    async function fetchAuthors() {
      const response = await axiosPrivate.get('/authors');
      setAuthors(response.data);
    }

    fetchAuthors();
  }, []);

  if (!authors) return <Loading />;

  return (
    <SectionContainer>
      <Heading2>Authors</Heading2>
      <FormSelector
        list={authors}
        setList={setAuthors}
        selected={data.authors || []}
        setSelected={(selected) => {
          const updatedData = { ...data, authors: selected };
          setData(updatedData);
        }}
        displayedAttribute='name'
        label='Authors'
        modelName='authors'
        schema={{
          name: {
            label: 'Name',
            type: 'text',
            default: '',
            required: true,
          },
          grade: {
            label: 'Grade',
            type: 'text',
            default: '',
            required: true,
          },
          country: {
            label: 'Country',
            type: 'text',
            default: '',
            required: true,
          },
          isMainAuthor: {
            label: 'Is Main Author',
            type: 'boolean',
            default: false,
            required: true,
          },
          workTime: {
            label: 'Work Time',
            type: 'number',
            default: '',
            required: true,
          },
          hourlyCost: {
            label: 'Hourly Cost',
            type: 'number',
            default: '',
            required: true,
          },
        }}
      />
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../informations')}>
          Previous
        </Button>
        <Button onClick={() => navigate('../venue')}>Next</Button>
      </Group>
    </SectionContainer>
  );
};

export default Authors;
