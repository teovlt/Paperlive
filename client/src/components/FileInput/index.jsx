import React, { useEffect, useState } from 'react';
import { Container, Input, InputLabel, ProgressBar } from './fileInputElements';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const FileInput = ({ id }) => {
  const axiosPrivate = useAxiosPrivate();

  const [filename, setFilename] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const data = new FormData();
    data.append('file', e.dataTransfer?.files[0] || e.target?.files[0]);
    setFilename(e.dataTransfer?.files[0]?.name || e.target?.files[0]?.name);

    try {
      await axiosPrivate.post(`/contributions/abstract/${id}`, data, {
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
  };

  return (
    <Container>
      <InputLabel onDrop={handleSubmit} onDragOver={handleDragOver}>
        <Input type='file' accept='.pdf' onChange={handleSubmit} />
        {isUploading ? (
          <>
            {progress}%<p>{filename}</p>
          </>
        ) : (
          <>
            Drop your file here
            <span>or</span>
            <p>Browse files</p>
          </>
        )}
      </InputLabel>
    </Container>
  );
};

export default FileInput;
