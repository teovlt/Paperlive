import React from 'react';
import { LinearContainer } from './contributionsElements';
import FileInput from '../../components/FileInput';
import Chips from '../../components/Chips';
import { Button, Heading3, Label } from '../../theme/appElements';
import { useTranslation } from 'react-i18next';

const FormStep2 = ({
  contributionData,
  setContributionData,
  errorMsg,
  setErrorMsg,
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
        file={contributionData.filename}
        endpoint='/contributions/abstract'
        onChange={(file) => setContributionData((prev) => ({ ...prev, filename: file?.name }))}
      />
      {errorMsg && <Chips type='negative'>{errorMsg}</Chips>}
      <LinearContainer>
        <Button style={{ width: '160px' }} type='neutral' onClick={() => previous()}>
          {t('global.previous')}
        </Button>
        <Button
          style={{ width: '160px' }}
          onClick={() => {
            const missings = Object.keys(contributionData).filter(
              (key) => key === 'filename' && contributionData[key] === ''
            );
            if (missings.length <= 0) {
              next();
            } else {
              const errorMsg = `${t('contribution.errorMsgAbstract')}`;
              setErrorMsg(errorMsg);
            }
          }}>
          {t('global.next')}
        </Button>
      </LinearContainer>
    </>
  );
};

export default FormStep2;
