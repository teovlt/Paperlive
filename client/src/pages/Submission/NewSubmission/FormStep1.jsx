import React from 'react';
import { LinearContainer } from '../../Contributions/contributionsElements';
import { Button } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import Chips from '../../../components/Chips';

const FormStep1 = ({ submissionData, setSubmissionData, errorMsg, setErrorMsg, next }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Input
        small
        id='title'
        value={submissionData?.title}
        label={t('submission.title')}
        autoComplete='off'
        onChange={(event) => {
          const newSubmissionData = { ...submissionData, title: event.target.value };
          setSubmissionData(newSubmissionData);
        }}
      />
      <Input
        small
        id='date'
        type='date'
        value={submissionData?.submissionDate}
        label={t('submission.date')}
        autoComplete='off'
        onChange={(event) => {
          const newSubmissionData = { ...submissionData, submissionDate: event.target.value };
          setSubmissionData(newSubmissionData);
        }}
      />
      <RadioGroup
        name='type'
        onChange={(event) => {
          const newSubmissionData = { ...submissionData, type: event.target.value };
          setSubmissionData(newSubmissionData);
        }}
        template={{
          label: t('submission.type'),
          radios: [
            {
              label: t('submission.poster'),
              value: 'poster',
              defaultChecked: submissionData?.type === 'poster',
            },
            {
              label: t('submission.shortPaper'),
              value: 'shortPaper',
              defaultChecked: submissionData?.type === 'shortPaper',
            },
            {
              label: t('global.contribution'),
              value: 'contribution',
              defaultChecked: submissionData?.type === 'contribution',
            },
          ],
        }}
      />
      <RadioGroup
        name='state'
        onChange={(event) => {
          const newSubmissionData = { ...submissionData, state: event.target.value };
          setSubmissionData(newSubmissionData);
        }}
        template={{
          label: t('submission.state'),
          radios: [
            {
              label: t('submission.draft'),
              value: 'draft',
              defaultChecked: submissionData?.state === 'draft' || true,
            },
            {
              label: t('submission.submitted'),
              value: 'submitted',
              defaultChecked: submissionData?.state === 'submitted',
            },
            {
              label: t('submission.approved'),
              value: 'approved',
              defaultChecked: submissionData?.state === 'approved',
            },
            {
              label: t('submission.rejected'),
              value: 'rejected',
              defaultChecked: submissionData?.state === 'rejected',
            },
          ],
        }}
      />
      {errorMsg && <Chips type='negative'>{errorMsg}</Chips>}
      <LinearContainer>
        <Button style={{ width: '160px' }} type='neutral' onClick={() => navigate(-1)}>
          {t('global.cancel')}
        </Button>
        <Button
          style={{ width: '160px' }}
          onClick={() => {
            const missings = Object.keys(submissionData).filter(
              (key) => key === 'title' && submissionData[key] === ''
            );
            if (missings.length <= 0) {
              next();
            } else {
              const errorMsg = `${t('contribution.errorMsg')} ${missings
                .map((key) => t(`submission.${key}`))
                .join(', ')}`;
              setErrorMsg(errorMsg);
            }
          }}>
          {t('global.next')}
        </Button>
      </LinearContainer>
    </>
  );
};

export default FormStep1;
