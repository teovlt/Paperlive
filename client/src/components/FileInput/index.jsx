import React, { useState } from 'react';
import { Container, Input, InputLabel, ProgressBar } from './fileInputElements';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const FileInput = ({ endpoint, file, onChange }) => {
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
      <InputLabel onDrop={handleSubmit} onDragOver={handleDragOver}>
        <Input type='file' accept='.pdf' onChange={handleSubmit} />
        {isUploading || file ? (
          <>
            {file ? 100 : progress}%<p>{filename}</p>
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
