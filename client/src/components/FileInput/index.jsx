import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { Container, IconContainer, InfoContainer, Input, Label } from './fileInputElements';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

const FileInput = ({ name, collection, MIMEType, data, callback }) => {
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const [id, setId] = useState(null);
  const [file, setFile] = useState(data[name]);
  const [upload, setUpload] = useState({});

  useEffect(() => {
    setId(Math.random().toString(36).substr(2, 9)); // Generate a random id
  }, []);

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

  const formatSize = (size) => {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1024 * 1024) {
      const sizeKB = (size / 1024).toFixed(2);
      return sizeKB + ' KB';
    } else if (size < 1024 * 1024 * 1024) {
      const sizeMB = (size / (1024 * 1024)).toFixed(2);
      return sizeMB + ' MB';
    } else {
      const sizeGB = (size / (1024 * 1024 * 1024)).toFixed(2);
      return sizeGB + ' GB';
    }
  };

  useEffect(() => {
    async function uploadFile() {
      const formData = new FormData();
      formData.append('file', file);

      await axiosPrivate.post(`/files/${collection}/${name}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setUpload((prev) => ({
            ...prev,
            loaded: e.loaded,
            progress: Math.round((e.loaded / e.total) * 100),
          }));
        },
      });
      callback(file);
      notify();
    }

    file && data[name] !== file && uploadFile();
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
                ? `${formatSize(upload.loaded)} / ${formatSize(file.size)}`
                : formatSize(file.size)}
            </span>
          </>
        ) : (
          <>
            <p>{t(`${collection}.${name}`)}</p>
            <Label htmlFor={id}>{t('fileInput.browse')}</Label>
          </>
        )}
      </InfoContainer>
      {file && <Label htmlFor={id}>{t('fileInput.browse')}</Label>}
      <Input
        type='file'
        name={name}
        id={id}
        accept={`.${MIMEType}`}
        onChange={(e) => e.target.files[0] && setFile(e.target.files[0])}
      />
    </Container>
  );
};

export default FileInput;
