import React from 'react';
import { LinearContainer, Link, MainWrapper } from './contributionsElements';
import Chips from '../../components/Chips';
import { Button, Heading3, Label } from '../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const FormStep3 = ({ contributionData, errorMsg, previous, goTo }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const save = async () => {
    if (
      !Object.keys(contributionData)
        .filter((key) => key !== 'relatedContribution')
        .every((key) => contributionData[key] !== '')
    ) {
      console.error('missing fields');
      return;
    }

    const { filename, ...contributionDataWithoutFilename } = contributionData;
    await axiosPrivate.post('/contributions/new', contributionDataWithoutFilename);
    navigate('/contributions');
  };

  return (
    <>
      <MainWrapper>
        <Heading3>Informations</Heading3>
        <Label>
          {t('contribution.title')}:<span>{contributionData.title}</span>
        </Label>
        <Label>
          {t('contribution.date')}:<span>{contributionData.startDate}</span>
        </Label>
        <Label>
          {t('contribution.teamRole')}:
          <span>
            {contributionData.teamRole === 'leader'
              ? `${t('contribution.leader')}`
              : contributionData.teamRole === 'co-leader'
              ? `${t('contribution.coLeader')}`
              : `${t('contribution.guest')}`}
          </span>
        </Label>
        <Label>
          {t('contribution.related')}:<span>{contributionData.relatedContribution}</span>
        </Label>
        <Link onClick={() => goTo(0)}> {t('contribution.editForm')}</Link>
      </MainWrapper>
      <MainWrapper>
        <Heading3>{t('contribution.files')}</Heading3>
        <Label>
          Abstract:<span>{contributionData.filename}</span>
        </Label>
        <Link onClick={() => goTo(1)}>{t('contribution.editForm')}</Link>
      </MainWrapper>
      {errorMsg && <Chips type='negative'>{errorMsg}</Chips>}
      <LinearContainer>
        <Button style={{ width: '160px' }} type='neutral' onClick={() => previous()}>
          {t('global.previous')}
        </Button>
        <Button style={{ width: '160px' }} onClick={() => save()}>
          {t('global.save')}
        </Button>
      </LinearContainer>
    </>
  );
};

export default FormStep3;
