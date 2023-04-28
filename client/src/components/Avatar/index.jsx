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
    url: `http://localhost:3000/api/upload/profile/default.gif`,
    _v: 0,
  });

  useEffect(() => {
    setPicture((prev) => ({
      url: `http://localhost:3000/api/upload/profile/${auth.picture}`,
      _v: prev._v + 1,
    }));
  }, [auth]);

  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.target.files[0];

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await axiosPrivate.post('/upload/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPicture((prev) => ({
        url: `http://localhost:3000/api/upload/profile/${res.data.filename}`,
        _v: prev._v + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  if (!auth.picture) return null;

  return (
    <UploadForm onChange={handleSubmit}>
      <UploadAvatarLabel label={t('avatar.hover')}>
        <Picture src={`${picture.url}?${picture._v}`} alt='avatar' />
        <FileInput type='file' name='file' id='file' accept='.jpg,.jpeg,.png,.gif' />
      </UploadAvatarLabel>
    </UploadForm>
  );
};

export default Avatar;
