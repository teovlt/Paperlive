import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  user-select: none;

  width: 100%;
  aspect-ratio: 2/1;

  /* background: var(--black-quaternary); */
  border: 1px dashed var(--black-tertiary);
  border-radius: 0.8rem;

  position: relative;

  font-size: 1.6rem;
  line-height: 2.2rem;
  text-align: center;
  color: var(--black);
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.label`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;

  border: 2px solid var(--accent);
  color: var(--accent);
  font-weight: 500;
`;

export const InputCaption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  svg {
    color: var(--accent);
    font-size: 8.8rem;
  }
`;

export const CaptionHeading = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;
