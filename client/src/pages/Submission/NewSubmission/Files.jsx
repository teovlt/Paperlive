import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, SectionContainer } from '../submissionElements';
import { Button, Heading2 } from '../../../theme/appElements';
import FileInput from '../../../components/NewFileInput';

const Files = ({ data, setData }) => {
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <Heading2>Files</Heading2>
      <FileInput
        name='abstract'
        MIMEType='pdf'
        setData={(file) => setData((prev) => ({ ...prev, abstract: file }))}
      />
      <FileInput
        name='zipfolder'
        MIMEType='zip'
        setData={(file) => setData((prev) => ({ ...prev, zipFolder: file }))}
      />
      <FileInput
        name='compiledpdf'
        MIMEType='pdf'
        setData={(file) => setData((prev) => ({ ...prev, compiledPdf: file }))}
      />
      <FileInput
        name='diffpdf'
        MIMEType='pdf'
        setData={(file) => setData((prev) => ({ ...prev, diffPdf: file }))}
      />
      <FileInput
        name='commentpdf'
        MIMEType='pdf'
        setData={(file) => setData((prev) => ({ ...prev, commentsPdf: file }))}
      />
      <Group inline>
        <Button type='neutral' onClick={() => navigate('../venue')}>
          Previous
        </Button>
        <Button onClick={() => navigate('../summary')}>Next</Button>
      </Group>
    </SectionContainer>
  );
};

export default Files;
