import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '../submissionElements';
import { Button, Heading2, SectionContainer } from '../../../theme/appElements';
import FileInput from '../../../components/FileInput';
import { useTranslation } from 'react-i18next';

const Files = ({ data, setData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <SectionContainer>
      <Heading2>{t('submission.files')}</Heading2>
      <FileInput
        name='abstract'
        collection='submission'
        MIMEType='pdf'
        data={data}
        setData={(file) =>
          setData((prev) => ({ ...prev, abstract: { name: file.name, size: file.size } }))
        }
      />
      <FileInput
        name='zipFolder'
        collection='submission'
        MIMEType='zip'
        data={data}
        setData={(file) =>
          setData((prev) => ({ ...prev, zipFolder: { name: file.name, size: file.size } }))
        }
      />
      <FileInput
        name='compiledPDF'
        collection='submission'
        MIMEType='pdf'
        data={data}
        setData={(file) =>
          setData((prev) => ({ ...prev, compiledPDF: { name: file.name, size: file.size } }))
        }
      />
      <FileInput
        name='diffPDF'
        collection='submission'
        MIMEType='pdf'
        data={data}
        setData={(file) =>
          setData((prev) => ({ ...prev, diffPDF: { name: file.name, size: file.size } }))
        }
      />
      <FileInput
        name='commentPDF'
        collection='submission'
        MIMEType='pdf'
        data={data}
        setData={(file) =>
          setData((prev) => ({ ...prev, commentPDF: { name: file.name, size: file.size } }))
        }
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
