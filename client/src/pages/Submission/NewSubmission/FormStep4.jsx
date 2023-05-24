import React from 'react';
import FileInput from '../../../components/FileInput';
import { Button, Heading3, Label } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { LinearContainer } from '../../Contributions/contributionsElements';
import Selector from '../../../components/Selector';

const FormStep4 = ({ submissionData, setSubmissionData, next, previous }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* 
        TODO: le faire mais pour toutes les venue dans la base et pouvoir en ajouter une
      
      <Selector
        list={auth.contributions}
        id='relatedContributions'
        name='relatedContributions'
        selected={contributionData.relatedContributions}
        label={t('contribution.related2')}
        onChange={(list) => {
          setContributionData((prev) => ({
            ...prev,
            relatedContributions: list.map((c) => ({ _id: c._id, title: c.title })),
          }));
        }}
      /> */}
      <LinearContainer>
        <Button style={{ width: '160px' }} type='neutral' onClick={previous}>
          {t('global.previous')}
        </Button>
        <Button style={{ width: '160px' }} onClick={next}>
          {t('global.next')}
        </Button>
      </LinearContainer>
    </>
  );
};

export default FormStep4;
