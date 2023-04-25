import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 5px;
`;

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 1.6rem;
  /* TODO: padding-right: 48px if password */
  border-radius: 0.4rem;

  outline: 1px solid ${({ error }) => (error ? 'var(--destructive)' : 'var(--black-quaternary)')};
  outline-offset: -1px;

  font-size: 1.6rem;
  line-height: 1.6rem;

  &::placeholder {
    user-select: none;
  }

  &:focus {
    outline: 1px solid ${({ error }) => (error ? 'var(--destructive)' : 'var(--accent)')};
  }

  &:focus ~ label {
    color: ${({ error }) => (error ? 'var(--destructive)' : 'var(--accent)')};
  }

  &:not(:focus):not(:placeholder-shown) ~ label {
    color: ${({ error }) => (error ? 'var(--destructive)' : 'var(--black-tertiary)')};
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  transform: translateY(-50%);

  top: 50%;
  left: 1.6rem;

  font-size: 1.6rem;
  line-height: 1.6rem;

  user-select: none;
  cursor: text;
  color: ${({ error }) => (error ? 'var(--destructive)' : 'var(--black-tertiary)')};

  transition: all 0.15s;

  input:not(:placeholder-shown) + &,
  input:focus + & {
    padding-inline: 0.4rem;

    top: 0;
    left: 1.2rem;

    font-size: 1.2rem;
    line-height: 1.2rem;

    background: var(--white);
  }
`;

export const ErrorContainer = styled.div``;

export const ErrorLabel = styled.span``;
