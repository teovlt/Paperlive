import React, { useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Container, IconContainer, InfoContainer, Input, Label } from './fileInputElements';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';

const FileInput = ({ name, MIMEType, push }) => {
  const axiosPrivate = useAxiosPrivate();

  const [id, setId] = useState(null);
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState({});

  useEffect(() => {
    setId(Math.random().toString(36).substr(2, 9)); // Generate a random id
  }, []);

  useEffect(() => {
    async function uploadFile() {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axiosPrivate.post(`/files/submission/${name}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (e) => {
            setUpload((prev) => ({
              ...prev,
              loaded: e.loaded,
              progress: Math.round((e.loaded / e.total) * 100),
            }));
          },
        });
      } catch (error) {}
    }

    file && uploadFile();
  }, [file]);

  return (
    <Container progress={upload?.progress}>
      <IconContainer>
        <HiOutlineDocumentArrowUp />
        <span>{MIMEType}</span>
      </IconContainer>
      <InfoContainer>
        {file ? (
          <>
            <p>{file.name}</p>
            <span>
              {upload.progress < 100
                ? `${Math.round(upload?.loaded / 1000)} / ${Math.round(file.size / 1000)}`
                : Math.round(file.size / 1000)}
              kb
            </span>
          </>
        ) : (
          <>
            <p>{`${name.substr(0, 1).toUpperCase()}${name.substr(1, name.length - 1)}`}</p>
            <Label htmlFor={id}>Browse files</Label>
          </>
        )}
      </InfoContainer>
      {file && <Label htmlFor={id}>Browse files</Label>}
      <Input
        type='file'
        name={name}
        id={id}
        accept={MIMEType}
        onChange={(e) => e.target.files[0] && setFile(e.target.files[0])}
      />
    </Container>
  );
};

export default FileInput;
