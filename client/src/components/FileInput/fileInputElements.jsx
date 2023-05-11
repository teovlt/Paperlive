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

  padding: 24px;
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

export const InputCaption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  svg {
    color: var(--accent);
    display: block;
    font-size: 6rem;
  }
`;

export const CaptionHeading = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Button = styled.label`
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 0.2rem;

  /* border: 2px solid var(--accent); */
  background: var(--accent);
  color: var(--white);
  font-weight: 400;
`;
