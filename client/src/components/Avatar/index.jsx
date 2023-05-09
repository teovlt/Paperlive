import React, { useEffect, useState } from 'react';
import { FileInput, Picture, UploadAvatarLabel, UploadForm } from './avatarElements';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Avatar = () => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const [picture, setPicture] = useState({
    url: auth.picture,
    _v: 0,
  });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setPicture((prev) => ({
      url: `http://localhost:3000/api/teams/picture/${auth.picture}`,
      _v: prev._v + 1,
    }));
  }, [auth]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', e.dataTransfer?.files[0] || e.target?.files[0]);

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

  return (
    <UploadForm onChange={handleSubmit}>
      <UploadAvatarLabel
        label={t('avatar.hover')}
        onDrop={handleSubmit}
        onDragOver={handleDragOver}>
        <Picture src={`${picture.url}?${picture._v}`} alt='avatar' onError={handleImgError} />
        <FileInput type='file' name='file' accept='.jpg,.jpeg,.png,.gif' />
      </UploadAvatarLabel>
    </UploadForm>
  );
};

export default Avatar;
