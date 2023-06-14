import React from 'react';
import { Button, SectionContainer } from '../../../theme/appElements';
import { LineWrapper } from '../contributionsElements';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextArea from '../../../components/TextArea';

const Files = ({ data, setData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <TextArea
        id='abstract'
        label={t('contribution.abstract')}
        autoComplete='off'
        small
        value={data.abstract}
        onChange={(e) => {
          const newProfilData = { ...data, abstract: e.target.value };
          setData(newProfilData);
        }}
      />
      <LineWrapper>
        <Button type='neutral' onClick={() => navigate('../informations')}>
          {t('global.previous')}
        </Button>
        <Button onClick={() => navigate('../summary')}>{t('global.next')}</Button>
      </LineWrapper>
    </SectionContainer>
  );
};

export default Files;
