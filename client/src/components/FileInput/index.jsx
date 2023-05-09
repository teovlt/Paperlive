import React, { useEffect, useState } from 'react';
import { Container, Input, InputLabel, LoadingBar } from './fileInputElements';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const FileInput = () => {
  const axiosPrivate = useAxiosPrivate();

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(20);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await axiosPrivate.post('/upload/contribution/:');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <InputLabel
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}>
        <Input type='file' accept='' onChange={(e) => setFile(e.target.files[0])} />
      </InputLabel>
      <LoadingBar progress={progress} />
    </Container>
  );
};

export default FileInput;
