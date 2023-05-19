import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 5px;
`;

export const TextAreaContainer = styled.div`
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  row-gap: 3px;

  svg {
    fill: var(--text-base-secondary);
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    padding: 5px;
    transition: all 0.2s;
    border-radius: 50px;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.15);
    }

    &:active,
    &:focus {
      background: rgba(0, 0, 0, 0.25);
    }
  }
`;

export const TextAreaField = styled.textarea`
  width: 100%;
  padding: 1.6rem;
  resize: none;

  border-radius: 0.2rem;

  outline: 1px solid var(--black-quaternary);
  outline-offset: -1px;

  font-size: ${(props) => (props.small ? '1.5rem' : '1.6rem')};
  line-height: 2rem;

  &::placeholder {
    user-select: none;
  }

  &:focus {
    outline: 1px solid var(--accent);
  }

  &:focus ~ label {
    color: var(--accent);
  }

  &:not(:focus):not(:placeholder-shown) ~ label {
    color: var(--black-tertiary);
  }
`;

export const TextAreaLabel = styled.label`
  position: absolute;
  transform: translateY(-50%);

  top: 2.4rem;
  left: 1.6rem;

  font-size: ${(props) => (props.small ? '1.5rem' : '1.6rem')};
  line-height: 1.6rem;

  user-select: none;
  cursor: text;
  color: var(--black-tertiary);

  transition: all 0.15s;

  textarea:not(:placeholder-shown) + &,
  textarea:focus + & {
    padding-inline: 0.4rem;

    top: 0;
    left: 1.2rem;

    font-size: 1.2rem;
    line-height: 1.2rem;

    background: var(--white);
  }
`;

export const CharacterCounter = styled.span`
  font-size: 10px;
  color: var(--black-tertiary);

  position: absolute;
  bottom: 2px;
  right: 4px;
`;
