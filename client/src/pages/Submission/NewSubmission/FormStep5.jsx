import React from 'react';

import { Button, Heading3, Label } from '../../../theme/appElements';
import { LinearContainer, Link, MainWrapper } from '../../Contributions/contributionsElements';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';

const FormStep5 = ({ submissionData, previous, goTo }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const save = async () => {
    // if (
    //   !Object.keys(submissionData)
    //     .filter((key) => key === 'title')
    //     .every((key) => submissionData[key] !== '')
    // ) {
    //   console.error('missing fields');
    //   return;
    // }
    // const { abstract, zipFolder, compiledPDF, diffPDF, ...submissionDataWithoutFiles } =
    //   submissionData;
    // await axiosPrivate.post('/submission/new', submissionDataWithoutFiles);
    // const contributions = await axiosPrivate.get('/contributions');
    // setAuth((prev) => ({ ...prev, contributions: contributions.data }));
    navigate('/contributions/');
  };

  return (
    <>
      <MainWrapper>
        <Heading3>{t('contribution.informatons')}</Heading3>
        <Label>
          {t('submission.title')}:<span>{submissionData.title}</span>
        </Label>
        {/* <Label>
          Date:
          <span>
            {new Intl.DateTimeFormat(i18n.language, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(new Date(submissionData?.submissionDate))}
          </span>
        </Label> */}
        <Label>
          {t('submission.type')}:<span>{submissionData?.type}</span>
        </Label>
        <Label>
          {t('submission.state')}:<span>{submissionData?.state}</span>
        </Label>
        <Label>la contribution en lien</Label>
        <Link onClick={() => goTo(0)}> {t('contribution.editForm')}</Link>
      </MainWrapper>
      <MainWrapper>
        <Heading3>{t('contribution.files')}</Heading3>
        <Label>
          {t('submission.abstract')}:<span>{submissionData?.abstract}</span>
        </Label>
        <Label>
          {t('submission.zipFolder')}:<span>{submissionData?.zipFolder}</span>
        </Label>
        <Label>
          {t('submission.compiledPDF')}:<span>{submissionData?.compiledPDF}</span>
        </Label>
        <Label>
          {t('submission.diffPDF')}:<span>{submissionData?.diffPDF}</span>
        </Label>
        <Link onClick={() => goTo(1)}>{t('contribution.editForm')}</Link>
      </MainWrapper>
      <MainWrapper>
        <Heading3> {t('submission.authors')}</Heading3>
        <Label>
          {t('submission.authors')}:<span>{submissionData?.authors}</span>
        </Label>
        <Link onClick={() => goTo(2)}>{t('contribution.editForm')}</Link>
      </MainWrapper>
      <MainWrapper>
        <Heading3>{t('submission.venue')}</Heading3>
        <Label>
          {t('submission.venue')}:<span>{submissionData?.venue}</span>
        </Label>
        <Link onClick={() => goTo(3)}>{t('contribution.editForm')}</Link>
      </MainWrapper>

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

export default FormStep5;
