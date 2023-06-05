import React, { useEffect, useState } from 'react';
import { Button } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { LinearContainer } from '../../Contributions/contributionsElements';

const FormStep4 = ({ submissionData, setSubmissionData, next, previous }) => {
  const { t } = useTranslation();

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

export default FormStep4;
