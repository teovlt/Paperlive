import React from 'react';
import { SectionContainer } from '../submissionElements';
import FileInput from '../../../components/NewFileInput';
import { Heading2 } from '../../../theme/appElements';

const Files = ({ data, setData }) => {
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
    </SectionContainer>
  );
};

export default Files;
