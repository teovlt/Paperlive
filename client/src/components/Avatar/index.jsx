import React, { useEffect, useState } from 'react';
import { FileInput, Picture, UploadAvatarLabel, UploadForm } from './avatarElements';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';

const Avatar = () => {
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const [picture, setPicture] = useState({
    url: auth.picture && `${import.meta.env.VITE_API_URI ?? ''}/api/files/${auth.picture}`,
    _v: 0,
  });

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', e.dataTransfer?.files[0] || e.target?.files[0]);

    try {
      const res = await axiosPrivate.post('/files/team/picture', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAuth((prev) => ({
        ...prev,
        picture: res.data.filename,
      }));
      setPicture((prev) => ({
        url: `${import.meta.env.VITE_API_URI ?? ''}/api/files/${res.data.filename}`,
        _v: prev._v + 1,
      }));
      notify();
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (picture.url) {
          const res = await axiosPrivate.get(picture.url, { responseType: 'blob' });
          const url = URL.createObjectURL(res.data);
          setPicture((prev) => ({ ...prev, imgSrc: url }));
        } else setPicture((prev) => ({ ...prev, imgSrc: '/images/team-picture-default.png' }));
      } catch (error) {
        setPicture((prev) => ({
          ...prev,
          imgSrc: `images/team-picture-default.png`,
        }));
      }
    };

    fetchImage();
  }, [picture._v]);

  return (
    <>
      <UploadForm onChange={handleSubmit}>
        <UploadAvatarLabel label={t('avatar.hover')} onDrop={handleSubmit}>
          <Picture src={picture.imgSrc} alt='avatar' />
          <FileInput type='file' name='file' accept='.jpg,.jpeg,.png,.gif' />
        </UploadAvatarLabel>
      </UploadForm>
    </>
  );
};

export default Avatar;
