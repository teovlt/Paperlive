import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, SectionContainer } from '../submissionElements';
import { Button, Heading2 } from '../../../theme/appElements';
import FileInput from '../../../components/NewFileInput';
import { useTranslation } from 'react-i18next';

const Files = ({ data, setData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Heading2>{t('submission.files')}</Heading2>
      <FileInput
        name={t('submission.abstract')}
        MIMEType='pdf'
        setData={(file) => setData((prev) => ({ ...prev, abstract: file }))}
      />
      <FileInput
        name={t('submission.zipFolder')}
        MIMEType='zip'
        setData={(file) => setData((prev) => ({ ...prev, zipFolder: file }))}
      />
      <FileInput
        name={t('submission.compiledPDF')}
        MIMEType='pdf'
        setData={(file) => setData((prev) => ({ ...prev, compiledPdf: file }))}
      />
      <FileInput
        name={t('submission.diffPDF')}
        MIMEType='pdf'
        setData={(file) => setData((prev) => ({ ...prev, diffPdf: file }))}
      />
      <FileInput
        name={t('submission.commentsPDF')}
        MIMEType='pdf'
        setData={(file) => setData((prev) => ({ ...prev, commentsPdf: file }))}
      />
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../venue')}>
          {t('global.previous')}
        </Button>
        <Button onClick={() => navigate('../summary')}> {t('global.next')}</Button>
      </Group>
    </SectionContainer>
  );
};

export default Files;
