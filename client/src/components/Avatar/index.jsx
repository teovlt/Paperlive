import React from 'react';
import { FileInput, Picture, UploadAvatarLabel } from './avatarElements';
import useAuth from '../../hooks/useAuth';

const Avatar = () => {
  const { auth } = useAuth();

  return (
    <UploadAvatarLabel>
      <Picture src={`uploads/pictures/${auth.picture}`} alt='avatar' />
      <FileInput type='file' accept='.jpg,.jpeg,.png,.gif' />
    </UploadAvatarLabel>
  );
};

export default Avatar;
