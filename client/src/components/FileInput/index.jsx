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
import { HiOutlineFolder } from 'react-icons/hi2';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import Chips from '../Chips';
import { toast } from 'react-toastify';

const FileInput = ({ name, file, endpoint, onChange, type, link }) => {
  const axiosPrivate = useAxiosPrivate();

  const [filename, setFilename] = useState(file);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { t } = useTranslation();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const notify = () => {
    toast.success(t('toast.fileUploadSucess'), {
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
    <>
      {!link ? (
        <Container htmlFor={`${name}FileInput`} style={{ cursor: 'pointer' }}>
          <InputContainer onDrop={handleSubmit} onDragOver={handleDragOver}>
            <Input
              type='file'
              id={`${name}FileInput`}
              accept={'.' + type}
              onChange={handleSubmit}
            />
            {isUploading ? (
              <InputCaption>
                <CircularProgressBar progress={progress} />
                Uploading...
              </InputCaption>
            ) : file && !isUploading ? (
              <InputCaption>
                {name}
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: '180px',
                    overflow: 'hidden',
                  }}>
                  {filename}
                </span>
                <Button htmlFor={`${name}FileInput`}> {t('fileInput.changeFiles')}</Button>
              </InputCaption>
            ) : (
              <InputCaption>
                {name}
                <HiOutlineFolder />
                <strong>{type.toUpperCase()}</strong>
              </InputCaption>
            )}
          </InputContainer>
        </Container>
      ) : (
        <label htmlFor={`${name}FileInput`} style={{ cursor: 'pointer' }}>
          {t('fileInput.changeFiles')}
          <Input type='file' id={`${name}FileInput`} accept={'.' + type} onChange={handleSubmit} />
        </label>
      )}
    </>
  );
};

export default FileInput;
