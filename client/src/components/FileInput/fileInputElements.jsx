import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  user-select: none;

  width: 100%;
  aspect-ratio: 2/1;

  background: var(--black-quaternary);
  border-radius: 0.8rem;

  position: relative;

  line-height: 2.4rem;
  text-align: center;
  color: var(--black);

  span {
    color: var(--black-tertiary);
  }

  p {
    color: var(--accent);
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  display: none;
`;

export const ProgressBar = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: #007bff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  &::before {
    content: ${(props) => `"${props.progress || 0}%"`};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
