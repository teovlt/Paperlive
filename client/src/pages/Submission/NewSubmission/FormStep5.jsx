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
    //enregistrer la soumission
    navigate('/contributions');
  };

  return (
    <>
      <MainWrapper>
        <Heading3>Informations</Heading3>
        <Label>
          {t('submission.title')}:<span>{submissionData.title}</span>
        </Label>
        <Label>
          Date:
          <span>
            {new Intl.DateTimeFormat(i18n.language, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(new Date(submissionData?.submissionDate))}
          </span>
        </Label>
        <Label>
          type:<span>{submissionData?.type}</span>
        </Label>
        <Label>
          state:<span>{submissionData?.state}</span>
        </Label>
        <Label>la contribution en lien</Label>
        <Link onClick={() => goTo(0)}> {t('contribution.editForm')}</Link>
      </MainWrapper>
      <MainWrapper>
        <Heading3>{t('contribution.files')}</Heading3>
        <Label>
          Abstract:<span>{submissionData?.abstract}</span>
        </Label>
        <Label>
          zipFolder:<span>{submissionData?.zipFolder}</span>
        </Label>
        <Label>
          compiledPDF:<span>{submissionData?.compiledPDF}</span>
        </Label>
        <Label>
          diffPDF:<span>{submissionData?.diffPDF}</span>
        </Label>
        <Link onClick={() => goTo(1)}>{t('contribution.editForm')}</Link>
      </MainWrapper>
      <MainWrapper>
        <Heading3>Authors</Heading3>
        <Label>
          Authors:<span>{submissionData?.authors}</span>
        </Label>
        <Link onClick={() => goTo(2)}>{t('contribution.editForm')}</Link>
      </MainWrapper>
      <MainWrapper>
        <Heading3>Venue</Heading3>
        <Label>
          Venue:<span>{submissionData?.venue}</span>
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
