import styled from 'styled-components';

export const UploadForm = styled.form`
  display: flex;
`;

export const UploadAvatarLabel = styled.label`
  position: relative;
  user-select: none;
  border-radius: 100%;

  &:hover::before {
    content: 'Change your avatar';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 100%;
    background: var(--black-secondary);

    font-size: 1.4rem;
    color: var(--white);

    display: grid;
    place-items: center;
    text-align: center;
  }
`;

export const Picture = styled.img`
  width: 100%;
  border-radius: 100%;

  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;

  border: 1px solid var(--black-quaternary);
`;

export const FileInput = styled.input`
  display: none;
`;
