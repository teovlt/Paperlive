import React, { useEffect, useState } from 'react';
import { FileInput, Picture, UploadAvatarLabel, UploadForm } from './avatarElements';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Avatar = () => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const [file, setFile] = useState(null);
  const [picture, setPicture] = useState({
    url: auth.picture || `http://localhost:3000/api/teams/picture/team-picture-default.png`,
    _v: 0,
  });

  useEffect(() => {
    setPicture((prev) => ({
      url: `http://localhost:3000/api/teams/picture/${auth.picture}`,
      _v: prev._v + 1,
    }));
  }, [auth]);

  useEffect(() => {
    handleSubmit();
  }, [file]);

  async function handleSubmit(e) {
    e?.preventDefault();

    const data = new FormData();
    data.append('file', file || e?.target.files[0]);

    try {
      const res = await axiosPrivate.post('/teams/picture', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPicture((prev) => ({
        url: `http://localhost:3000/api/teams/picture/${res.data.filename}`,
        _v: prev._v + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const handleImgError = () => {
    setPicture((prev) => ({
      url: 'http://localhost:3000/api/teams/picture/team-picture-default.png',
      _v: prev._v + 1,
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (!auth.picture) return null;

  return (
    <UploadForm onChange={handleSubmit}>
      <UploadAvatarLabel label={t('avatar.hover')} onDrop={handleDrop} onDragOver={handleDragOver}>
        <Picture src={`${picture.url}?${picture._v}`} alt='avatar' onError={handleImgError} />
        <FileInput type='file' name='file' accept='.jpg,.jpeg,.png,.gif' />
      </UploadAvatarLabel>
    </UploadForm>
  );
};

export default Avatar;
