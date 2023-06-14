import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '../submissionElements';
import { Button, Heading2, SectionContainer } from '../../../theme/appElements';
import FileInput from '../../../components/FileInput';
import TextArea from '../../../components/TextArea';
import { useTranslation } from 'react-i18next';

const Files = ({ data, setData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <SectionContainer>
        <Heading2>{t('submission.files')}</Heading2>
        <FileInput
          name='zipFolder'
          collection='submission'
          MIMEType='zip'
          data={data}
          callback={(file) =>
            setData((prev) => ({ ...prev, zipFolder: { name: file.name, size: file.size } }))
          }
        />
        <FileInput
          name='compiledPDF'
          collection='submission'
          MIMEType='pdf'
          data={data}
          callback={(file) =>
            setData((prev) => ({ ...prev, compiledPDF: { name: file.name, size: file.size } }))
          }
        />
        <FileInput
          name='diffPDF'
          collection='submission'
          MIMEType='pdf'
          data={data}
          callback={(file) =>
            setData((prev) => ({ ...prev, diffPDF: { name: file.name, size: file.size } }))
          }
        />
        <FileInput
          name='commentPDF'
          collection='submission'
          MIMEType='pdf'
          data={data}
          callback={(file) =>
            setData((prev) => ({ ...prev, commentPDF: { name: file.name, size: file.size } }))
          }
        />
      </SectionContainer>
      <SectionContainer>
        <Heading2>{t('submission.abstract')}</Heading2>
        <TextArea
          id='abstract'
          label={t('submission.abstract')}
          autoComplete='off'
          small
          value={data.abstract}
          onChange={(e) => {
            const newProfilData = { ...data, abstract: e.target.value };
            setData(newProfilData);
          }}
        />
      </SectionContainer>

      <Group inline>
        <Button type='neutral' onClick={() => navigate('../venue')}>
          {t('global.previous')}
        </Button>
        <Button onClick={() => navigate('../summary')}> {t('global.next')}</Button>
      </Group>
    </>
  );
};

export default Files;
