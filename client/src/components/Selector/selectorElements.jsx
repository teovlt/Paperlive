import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;

  display: flex;
  flex-flow: row wrap;
  align-items: center;

  border-radius: 0.2rem;
  padding: 0.8rem 1.6rem;
  gap: 0.8rem;

  outline: 1px solid var(--black-quaternary);
  outline-offset: -1px;

  &.focus {
    outline: 1px solid var(--accent);
  }

  &::after {
    content: '▶︎';
    font-size: 0.8rem;
    transform: rotate(90deg);
    color: var(--black);
  }

  &.focus::after {
    transform: rotate(-90deg);
  }
`;

export const Input = styled.input`
  flex: 1;
  flex-basis: 50%;
  padding: 1.25rem 1.6rem;
  margin: -0.8rem -1.6rem;
  border-radius: 0.2rem;

  font-size: ${(props) => (props.small ? '1.5rem' : '1.6rem')};
  line-height: ${(props) => (props.small ? '1.5rem' : '1.6rem')};

  &::placeholder {
    user-select: none;
  }

  &:focus ~ label {
    color: var(--accent);
  }

  &:not(:focus):not(:placeholder-shown) ~ label {
    color: var(--black-tertiary);
  }
`;

export const Label = styled.label`
  position: absolute;
  transform: translateY(-50%);

  top: 50%;
  left: 1.6rem;

  font-size: 1.5rem;
  line-height: 1.2rem;

  user-select: none;
  cursor: text;
  color: var(--black-tertiary);

  transition: all 0.15s;

  input:not(:placeholder-shown) + &,
  input:focus + & {
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;

    top: 0;
    left: 1.2rem;

    font-size: 1.2rem;
    line-height: 1.2rem;

    background: var(--white);
  }

  input:focus + & {
    color: var(--accent);
  }
`;
