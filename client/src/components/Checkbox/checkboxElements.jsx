import styled from 'styled-components';

export const Label = styled.label`
  user-select: none;

  font-size: 1.5rem;
  color: var(--black);
  padding: 0.625rem 1.6rem;

  display: flex;
  align-items: center;
  column-gap: 1.2rem;

  position: relative;

  &:hover {
    cursor: pointer;
    background: var(--black-quaternary);
  }

  &::before {
    display: block;
    content: '';

    width: 1.5rem;
    aspect-ratio: 1 / 1;

    border: 0.1rem solid var(--black-tertiary);
    border-radius: 0.2rem;
    background: transparent;
  }

  &.checked::before {
    border: none;
    background: var(--accent);
  }

  &.checked::after {
    content: '';
    display: block;

    width: 1rem;
    aspect-ratio: 2/1;

    border-left: 0.2rem solid var(--white);
    border-bottom: 0.2rem solid var(--white);

    position: absolute;
    top: 40.5%;
    left: 1.8295rem;
    transform: rotate(-45deg);
  }
`;

export const Input = styled.input`
  display: none;
`;
