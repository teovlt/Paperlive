import React from 'react';
import { SectionContainer } from '../submissionElements';
import FileInput from '../../../components/NewFileInput';

const Files = ({ data, setData }) => {
  return (
    <SectionContainer>
      <FileInput
        name='abstract'
        MIMEType='pdf'
        push={(file) => {
          console.log('hello');
          setData((prev) => ({ ...prev, abstract: file.filename }));
        }}
      />
      {data.abstract}
    </SectionContainer>
  );
};

export default Files;
