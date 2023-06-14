import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../../components/Loading';
import { Group } from '../submissionElements';
import FormSelector from '../../../components/FormSelector';
import { Button, SectionContainer, Heading2 } from '../../../theme/appElements';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Authors = ({ data, setData }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();

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
      <Heading2>{t('submission.authors')}</Heading2>
      <FormSelector
        list={authors}
        setList={setAuthors}
        selected={data.authors || []}
        setSelected={(selected) => {
          const updatedData = { ...data, authors: selected };
          setData(updatedData);
        }}
        displayedAttribute='name'
        label={t('submission.authors')}
        modelName='authors'
        schema={{
          name: {
            label: t('author.name'),
            type: 'text',
            default: '',
            required: true,
          },
          email: {
            label: t('author.email'),
            type: 'email',
            default: '',
            required: true,
          },
          grade: {
            label: t('author.grade'),
            type: 'text',
            default: '',
            required: true,
          },
          country: {
            label: t('author.country'),
            type: 'text',
            default: '',
            required: true,
          },
          isMainAuthor: {
            label: t('author.isMainAuthor'),
            type: 'boolean',
            default: false,
            required: true,
          },
          workTime: {
            label: t('author.workTimeMonth'),
            type: 'number',
            default: '',
            required: true,
          },
          hourlyCost: {
            label: t('author.hourlyCost'),
            type: 'number',
            default: '',
            required: true,
          },
        }}
      />
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../informations')}>
          {t('global.previous')}
        </Button>
        <Button onClick={() => navigate('../venue')}> {t('global.next')}</Button>
      </Group>
    </SectionContainer>
  );
};

export default Authors;
