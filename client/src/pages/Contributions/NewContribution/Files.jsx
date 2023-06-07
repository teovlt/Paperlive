import React from 'react';
import { Button, SectionContainer } from '../../../theme/appElements';
import { LineWrapper } from '../contributionsElements';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileInput from '../../../components/FileInput';

const Files = ({ data, setData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <FileInput
        name='abstract'
        collection='contribution'
        MIMEType='pdf'
        data={data}
        callback={(file) =>
          setData((data) => ({ ...data, abstract: { name: file.name, size: file.size } }))
        }
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
