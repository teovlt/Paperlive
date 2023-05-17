import React, { useEffect, useRef, useState } from 'react';
import Input from '../../../components/Input';
import RadioGroup from '../../../components/RadioGroup';
import { LinearContainer } from '../contributionsElements';
import Chips from '../../../components/Chips';
import { Button } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Selector from '../../../components/Selector';

const FormStep1 = ({ contributionData, setContributionData, errorMsg, setErrorMsg, next }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <>
      <Input
        small
        id='title'
        value={contributionData?.title}
        label={t('contribution.title')}
        autoComplete='off'
        onChange={(event) => {
          const newContributionData = { ...contributionData, title: event.target.value };
          setContributionData(newContributionData);
        }}
      />
      <Input
        small
        id='date'
        type='date'
        value={contributionData?.startDate}
        label={t('contribution.startDate')}
        autoComplete='off'
        onChange={(event) => {
          const newContributionData = { ...contributionData, startDate: event.target.value };
          setContributionData(newContributionData);
        }}
      />
      <RadioGroup
        name='role'
        onChange={(event) => {
          const newContributionData = { ...contributionData, teamRole: event.target.value };
          setContributionData(newContributionData);
        }}
        template={{
          label: t('contribution.teamRole'),
          radios: [
            {
              label: t('contribution.leader'),
              value: 'leader',
              defaultChecked: contributionData?.teamRole === 'leader',
            },
            {
              label: t('contribution.coLeader'),
              value: 'coLeader',
              defaultChecked: contributionData?.teamRole === 'coLeader',
            },
            {
              label: t('contribution.guest'),
              value: 'guest',
              defaultChecked: contributionData?.teamRole === 'guest',
            },
          ],
        }}
      />
      <Selector
        list={auth.contributions}
        id='relatedContributions'
        name='relatedContributions'
        label={t('contribution.related2')}
        onChange={(list) => {
          setContributionData((prev) => ({
            ...prev,
            relatedContributions: list.map((c) => ({ _id: c._id, title: c.title })),
          }));
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
            const missings = Object.keys(contributionData).filter(
              (key) =>
                key !== 'filename' && key !== 'relatedContribution' && contributionData[key] === ''
            );
            if (missings.length <= 0) {
              next();
            } else {
              const errorMsg = `${t('contribution.errorMsg')} ${missings
                .map((key) => t(`contribution.${key}`))
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
