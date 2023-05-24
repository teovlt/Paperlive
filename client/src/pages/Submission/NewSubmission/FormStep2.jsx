import React from 'react';
import FileInput from '../../../components/FileInput';
import { Button, Heading3, Label } from '../../../theme/appElements';
import { useTranslation } from 'react-i18next';
import { LinearContainer } from '../../Contributions/contributionsElements';

const FormStep2 = ({
  submissionData,
  setSubmissionData,
  next,
  previous,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Heading3>Abstract</Heading3>
      <Label>
        {t('contribution.fileSupported')}: <span>pdf</span>
      </Label>
      <FileInput
        name='abstract'
        file={submissionData.abstract}
        endpoint='files/submission/abstract'
        onChange={(file) => setSubmissionData((prev) => ({ ...prev, abstract: file?.name }))}
      />
      <Heading3>zipFolder</Heading3>
      <Label>
        {t('contribution.fileSupported')}: <span>zip</span>
      </Label>
      <FileInput
        name='zipFolder'
        file={submissionData.zipFolder}
        endpoint='files/submission/zipfolder'
        onChange={(file) => setSubmissionData((prev) => ({ ...prev, zipFolder: file?.name }))}
      />
      <Heading3>compiledPDF</Heading3>
      <Label>
        {t('contribution.fileSupported')}: <span>pdf</span>
      </Label>
      <FileInput
        name='compiledPDD'
        file={submissionData.compiledPDF}
        endpoint='files/submission/compiledpdf'
        onChange={(file) => setSubmissionData((prev) => ({ ...prev, compiledPDF: file?.name }))}
      />
      <Heading3>diffPDF</Heading3>
      <Label>
        {t('contribution.fileSupported')}: <span>pdf</span>
      </Label>
      <FileInput
        name='diffPDF'
        file={submissionData.diffPDF}
        endpoint='files/submission/diffpdf'
        onChange={(file) => setSubmissionData((prev) => ({ ...prev, diffPDF: file?.name }))}
      />
      <LinearContainer>
        <Button style={{ width: '160px' }} type='neutral' onClick={previous}>
          {t('global.previous')}
        </Button>
        <Button style={{ width: '160px' }} onClick={next}>
          {t('global.next')}
        </Button>
      </LinearContainer>
    </>
  );
};

export default FormStep2;
