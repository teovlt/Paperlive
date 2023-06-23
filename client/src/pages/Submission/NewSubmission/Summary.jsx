import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Button, Heading2, SectionContainer, Link } from '../../../theme/appElements';
import { toast } from 'react-toastify';
import Chips from '../../../components/Chips';
import { Group, InfoContainer, Label, LineWrapper, Value } from '../submissionElements';
import useAuth from '../../../hooks/useAuth';

const Summary = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [errMsg, setErrMsg] = useState(null);

  const notify = () => {
    toast.success(t('toast.submissionCreatedSucess'), {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleSave = async () => {
    if (data.title) {
      try {
        await axiosPrivate.post('/submissions/new', data);
        const contributions = await axiosPrivate.get('/contributions');
        setAuth((prev) => ({ ...prev, contributions: contributions.data }));
        notify();
        navigate(`/contributions/${data.contributionId}`);
      } catch (error) {}
    } else
      setErrMsg(
        `${t('submission.errorMsg')} ${Object.keys(data)
          .filter(
            (key) => (key === 'contribution' && !data[key]) || (key === 'title' && !data[key])
          )
          .map((key) => t(`submission.${key}`))
          .join(', ')}`
      );
  };

  useEffect(() => {
    setErrMsg('');
  }, [i18n.language]);

  return (
    <>
      <SectionContainer>
        <Heading2>{t('submission.recap')}</Heading2>
        <InfoContainer>
          <Label>{t('submission.title')}</Label>
          <Value>{data.title || '-'}</Value>
        </InfoContainer>
        <LineWrapper>
          <InfoContainer>
            <Label>{t('submission.date')}</Label>
            <Value>
              {data.submissionDate
                ? new Intl.DateTimeFormat(i18n.language, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(data.submissionDate))
                : '-'}
            </Value>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('submission.venue')}</Label>
            <Value>{data.venue?.name || '-'}</Value>
          </InfoContainer>
        </LineWrapper>
        <LineWrapper>
          <InfoContainer>
            <Label>{t('submission.type')}</Label>
            <Value>{data.type || '-'}</Value>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('submission.state')}</Label>
            <Value>{data.state || '-'}</Value>
          </InfoContainer>
        </LineWrapper>
        <LineWrapper>
          <InfoContainer>
            <Label>{t('contribution.link')}</Label>
            {data.link ? (
              <Link targer='_blank' to={`//${data.link.split('//').pop()}`} target='_blank'>
                {data.link}
              </Link>
            ) : (
              <Value>-</Value>
            )}
          </InfoContainer>
          <InfoContainer>
            <Label>{t('submission.materialCost')}</Label>
            <Value>{data.materialCost ? data.materialCost + ' €' : '-'}</Value>
          </InfoContainer>
        </LineWrapper>
        <InfoContainer>
          <Label>{t('submission.authors')}</Label>
          <Value>{data.authors?.map((author) => author.name).join(', ') || '-'}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('submission.zipFolder')}</Label>
          <Value>{data.zipFolder?.name || '-'}</Value>
        </InfoContainer>

        <InfoContainer>
          <Label>{t('submission.compiledPDF')}</Label>
          <Value>{data.compiledPDF?.name || '-'}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('submission.diffPDF')}</Label>
          <Value>{data.diffPDF?.name || '-'}</Value>
        </InfoContainer>
        <InfoContainer>
          <Label>{t('submission.commentPDF')}</Label>
          <Value>{data.commentPDF?.name || '-'}</Value>
        </InfoContainer>
      </SectionContainer>
      {data.abstract && (
        <SectionContainer>
          <Heading2>{t('submission.abstract')}</Heading2>
          <Value style={{ textAlign: 'justify ', whiteSpace: 'pre-wrap' }}>{data.abstract}</Value>
        </SectionContainer>
      )}
      {errMsg && <Chips type='negative'>{errMsg}</Chips>}
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../files')}>
          {t('global.previous')}
        </Button>
        <Button onClick={handleSave}> {t('global.save')}</Button>
      </Group>
    </>
  );
};

export default Summary;
