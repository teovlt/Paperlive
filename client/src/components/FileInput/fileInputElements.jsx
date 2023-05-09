import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.label`
  display: block;

  width: 100%;
  aspect-ratio: 2/1;

  background: var(--black-quaternary);
  border-radius: 0.8rem;
`;

export const Input = styled.input`
  display: none;
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 8px;

  background: var(--black-quaternary);
  border-radius: 4px;

  position: relative;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: ${(props) => `${props.progress}%`};
    border-radius: 4px;

    background: var(--accent);
  }

  &::after {
    content: ${(props) => `${props.progress}`};

    position: absolute;
    top: 0;
    right: 0;
  }
`;
