import React, { useState } from 'react';
import {
  CaptionHeading,
  Container,
  Input,
  InputCaption,
  InputContainer,
  Button,
} from './fileInputElements';
import CircularProgressBar from '../CircularProgressBar';
import { IoMdCloudUpload } from 'react-icons/io';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import Chips from '../Chips';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileInput = ({ name, file, endpoint, onChange }) => {
  const axiosPrivate = useAxiosPrivate();

  const [filename, setFilename] = useState(file);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { t } = useTranslation();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const notify = () => {
    toast.success('File uploaded sucessfuly ', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.dataTransfer?.files?.length > 0 || e.target?.files?.length > 0) {
      setIsUploading(true);
      onChange && onChange(e.dataTransfer?.files[0] || e.target?.files[0]);
      setFilename(e.dataTransfer?.files[0]?.name || e.target?.files[0]?.name);

      const data = new FormData();
      data.append('file', e.dataTransfer?.files[0] || e.target?.files[0]);

      axiosPrivate
        .post(endpoint, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            if (percentCompleted === 100) {
              setIsUploading(false);
              setProgress(0);
              notify();
            } else setProgress(percentCompleted);
          },
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <InputContainer onDrop={handleSubmit} onDragOver={handleDragOver}>
        <Input type='file' id={`${name}FileInput`} accept='.pdf' onChange={handleSubmit} />
        {isUploading ? (
          <InputCaption>
            <CircularProgressBar progress={progress} />
            Uploading...
          </InputCaption>
        ) : (
          <InputCaption>
            <IoMdCloudUpload />
            <CaptionHeading>{t('fileInput.drag')}</CaptionHeading>
            <span style={{ color: 'var(--black-secondary)' }}>{t('fileInput.or')}</span>
            <Button htmlFor={`${name}FileInput`}>{t('fileInput.browse')}</Button>
          </InputCaption>
        )}
      </InputContainer>
      {file && !isUploading && (
        <Chips type='positive'>
          {t('fileInput.success')}: {filename}
        </Chips>
      )}
      <ToastContainer toastStyle={{ backgroundColor: 'var(--positive)' }} />
    </Container>
  );
};

export default FileInput;
