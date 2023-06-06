import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../../components/Loading';
import { Group } from '../submissionElements';
import FormSelector from '../../../components/FormSelector';
import { Button, Heading2, SectionContainer } from '../../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Venue = ({ data, setData }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();

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
      <Heading2>{t('submission.venue')}</Heading2>
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
        label={t('submission.venue')}
        modelName='venues'
        schema={{
          name: {
            label: t('venue.name'),
            type: 'text',
            default: '',
            required: true,
          },
          rank: {
            label: t('venue.rank'),
            type: 'text',
            default: '',
            required: true,
          },
        }}
      />
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../authors')}>
          {t('global.previous')}
        </Button>
        <Button onClick={() => navigate('../files')}> {t('global.next')}</Button>
      </Group>
    </SectionContainer>
  );
};

export default Venue;
