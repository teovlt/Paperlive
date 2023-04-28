import React from 'react';
import { FileInput, Picture, UploadAvatarLabel } from './avatarElements';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Avatar = () => {
  const { auth } = useAuth();
  const { t } = useTranslation();

  return (
    <UploadAvatarLabel label={t('avatar.hover')}>
      <Picture src={`uploads/pictures/${auth.picture}`} alt='avatar' />
      <FileInput type='file' accept='.jpg,.jpeg,.png,.gif' />
    </UploadAvatarLabel>
  );
};

export default Avatar;
