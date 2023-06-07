import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { LineWrapper } from '../contributionsElements';
import { Button, SectionContainer } from '../../../theme/appElements';
import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import Selector from '../../../components/Selector';
import useAuth from '../../../hooks/useAuth';
import FormSelector from '../../../components/FormSelector';
import Loading from '../../../components/Loading';

const Informations = ({ data, setData }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [scientificFields, setScientificFields] = useState(null);

  useEffect(() => {
    async function fetchScientificFields() {
      const response = await axiosPrivate.get('/scientificfields');
      setScientificFields(response.data);
    }

    fetchScientificFields();
  }, []);

  if (!scientificFields) return <Loading />;

  return (
    <SectionContainer>
      <Input
        small
        type='text'
        id='title'
        label={t('contribution.title')}
        value={data.title}
        onChange={(e) => {
          const updatedData = { ...data, title: e.target.value };
          setData(updatedData);
        }}
      />
      <FormSelector
        list={scientificFields}
        setList={setScientificFields}
        selected={data.scientificField ? [data.scientificField] : []}
        setSelected={(selected) => setData((data) => ({ ...data, scientificField: selected[0] }))}
        label={t('contribution.scientificField')}
        modelName='scientificFields'
        unique
        displayedAttribute='label'
        schema={{
          label: {
            label: 'Label',
            type: 'text',
            default: '',
            required: true,
          },
        }}
      />
      <Input
        small
        type='date'
        id='startDate'
        label={t('contribution.startDate')}
        value={data.startDate}
        onChange={(e) => {
          const updatedData = { ...data, startDate: e.target.value };
          setData(updatedData);
        }}
      />
      <RadioGroup
        name='teamRole'
        label={t('contribution.teamRole')}
        template={{
          radios: [
            {
              label: t('contribution.leader'),
              value: 'leader',
              defaultChecked: data.teamRole === 'leader',
            },
            {
              label: t('contribution.coLeader'),
              value: 'coLeader',
              defaultChecked: data.teamRole === 'coLeader',
            },
            {
              label: t('contribution.guest'),
              value: 'guest',
              defaultChecked: data.teamRole === 'guest',
            },
          ],
        }}
        onChange={(e) => {
          const updatedData = { ...data, teamRole: e.target.value };
          setData(updatedData);
        }}
      />
      <Selector
        list={auth.contributions}
        selected={data.relatedContributions}
        displayedAttribute='title'
        label='related'
        onChange={(selected) => {
          const updatedData = { ...data, relatedContributions: selected };
          setData(updatedData);
        }}
      />
      <Input
        small
        type='text'
        id='link'
        label={t('contribution.link')}
        value={data.link}
        onChange={(e) => {
          const updatedData = { ...data, link: e.target.value };
          setData(updatedData);
        }}
      />
      <LineWrapper>
        <Button type='neutral' onClick={() => navigate('/')}>
          {t('global.cancel')}
        </Button>

        <Button onClick={() => navigate('../files')}>{t('global.next')}</Button>
      </LineWrapper>
    </SectionContainer>
  );
};

export default Informations;
