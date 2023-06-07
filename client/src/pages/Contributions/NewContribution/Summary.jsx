import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Button, Heading2, SectionContainer } from '../../../theme/appElements';
import { Group, InfoContainer, Label, LineWrapper, Value } from '../contributionsElements';
import { Link } from '../contributionsElements';
import Chips from '../../../components/Chips';
import useAuth from '../../../hooks/useAuth';

const Summary = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    setErrMsg(null);
  }, [i18n.language]);

  const handleSave = async () => {
    const undefinedKeys = Object.keys(data).filter(
      (key) => !data[key] && key !== 'relatedContributions'
    );

    if (undefinedKeys.length > 0) {
      setErrMsg(
        `${t('contribution.errorMsg')} ${undefinedKeys
          .map((key) => t(`contribution.${key}`))
          .join(', ')}`
      );
    } else {
      const updatedContributionData = { ...data };
      data.link && (data.link = updatedContributionData.link.replace(/^https?:\/\//i, ''));

      await axiosPrivate.post('/contributions/new', data);
      const contributions = await axiosPrivate.get('/contributions');
      setAuth((prev) => ({ ...prev, contributions: contributions.data }));
      navigate('/contributions');
      notify();
    }
  };

  return (
    <SectionContainer>
      <Heading2>{t('contribution.recap')}</Heading2>
      <InfoContainer>
        <Label>{t('contribution.title')}</Label>
        <Value>{data.title || '-'}</Value>
      </InfoContainer>

      <InfoContainer>
        <Label>{t('contribution.scientificField')}</Label>
        <Value>{data.scientificField.label || '-'}</Value>
      </InfoContainer>

      <InfoContainer>
        <Label>{t('contribution.related')}</Label>
        {data.relatedContributions.length > 0
          ? data.relatedContributions.map((contribution) => <Link>{contribution.title}</Link>)
          : '-'}
      </InfoContainer>

      <LineWrapper>
        <InfoContainer>
          <Label>{t('contribution.startDate')}</Label>
          <Value>{data.startDate || '-'}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('contribution.teamRole')}</Label>
          <Value>{data.teamRole ? t(`contribution.${data.teamRole}`) : '-'}</Value>
        </InfoContainer>
      </LineWrapper>

      <LineWrapper>
        <InfoContainer>
          <Label>{t('contribution.link')}</Label>
          {data.link ? (
            <Link to={`https://${data.link}`} target='_blank'>
              {data.link}
            </Link>
          ) : (
            <Value>-</Value>
          )}
        </InfoContainer>
      </LineWrapper>

      <LineWrapper>
        <InfoContainer>
          <Label>{t('contribution.abstract')}</Label>
          <Value>{data.abstract?.name || '-'}</Value>
        </InfoContainer>
      </LineWrapper>

      {errMsg && <Chips type='negative'>{errMsg}</Chips>}

      <Group inline>
        <Button type='neutral' onClick={() => navigate('../files')}>
          {t('global.previous')}
        </Button>
        <Button onClick={handleSave}>{t('global.save')}</Button>
      </Group>
    </SectionContainer>
  );
};

export default Summary;
