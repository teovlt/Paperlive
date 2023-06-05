import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import FormSelector from '../../../components/FormSelector';

const FormStep3 = ({ submissionData, setSubmissionData, previous, next }) => {
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
    <>
      <FormSelector
        list={authors}
        setList={(list) => setAuthors(list)}
        selected={[]}
        setSelected={(selected) => setSubmissionData({ ...submissionData, authors: selected })}
        displayedAttribute='name'
        label='Authors'
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
            label: 'Main Author',
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
    </>
  );
};

export default FormStep3;
