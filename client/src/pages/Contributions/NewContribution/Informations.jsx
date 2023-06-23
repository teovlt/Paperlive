import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LineWrapper } from '../contributionsElements';
import { Button, SectionContainer } from '../../../theme/appElements';
import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import Selector from '../../../components/Selector';
import useAuth from '../../../hooks/useAuth';
import InputSelector from '../../../components/InputSelector';
import FormSelector from '../../../components/FormSelector';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../../components/Loading';

const Informations = ({ data, setData }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [keywords, setKeywords] = useState(null);

  useEffect(() => {
    async function fetchKeywords() {
      const response = await axiosPrivate.get('/keywords');
      setKeywords(response.data);
    }

    fetchKeywords();
  }, []);

  if (!keywords) return <Loading />;

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
      <InputSelector
        list={keywords}
        setList={(list) => setKeywords(list)}
        selected={data.keywords}
        setSelected={(selected) => setData((data) => ({ ...data, keywords: selected }))}
        displayedAttribute={'value'}
        label={t('contribution.keywords')}
        modelName={'keywords'}
        schema={{
          value: {
            label: t('keyword.value'),
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
      <Input
        small
        type='text'
        id='link'
        label={`${t('contribution.link')}*`}
        value={data.link}
        onChange={(e) => {
          const updatedData = { ...data, link: e.target.value };
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
        label={`${t('contribution.related')}*`}
        onChange={(selected) => {
          const updatedData = { ...data, relatedContributions: selected };
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
