import React, { useState } from 'react';
import {
  CaptionHeading,
  Container,
  Input,
  InputCaption,
  InputContainer,
  Label,
} from './fileInputElements';
import CircularProgressBar from '../CircularProgressBar';
import { IoMdCloudUpload } from 'react-icons/io';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const FileInput = ({ name, file, endpoint, onChange }) => {
  const axiosPrivate = useAxiosPrivate();

  const [filename, setFilename] = useState(file);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.dataTransfer?.files?.length > 0 || e.target?.files?.length > 0) {
      setIsUploading(true);
      onChange && onChange(e.dataTransfer?.files[0] || e.target?.files[0]);
      setFilename(e.dataTransfer?.files[0]?.name || e.target?.files[0]?.name);

      const data = new FormData();
      data.append('file', e.dataTransfer?.files[0] || e.target?.files[0]);

      try {
        await axiosPrivate.post(endpoint, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <InputContainer onDrop={handleSubmit} onDragOver={handleDragOver}>
        <Input type='file' id={`${name}FileInput`} accept='.pdf' onChange={handleSubmit} />
        {isUploading ? (
          <CircularProgressBar progress={progress} />
        ) : (
          <InputCaption>
            <IoMdCloudUpload />
            <CaptionHeading>Drag and drop your files here</CaptionHeading>
            <span style={{ color: 'var(--black-secondary)' }}>or</span>
            <Label htmlFor={`${name}FileInput`}>Browse files</Label>
          </InputCaption>
        )}
      </InputContainer>
    </Container>
  );
};

export default FileInput;
