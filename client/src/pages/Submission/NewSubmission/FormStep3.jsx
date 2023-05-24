import React from 'react';
import { Button, Heading3, Label } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LinearContainer } from '../../Contributions/contributionsElements';

const FormStep3 = ({
  submissionData,
  setSubmissionData,
  previous,
  next,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <>
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

export default FormStep3;
