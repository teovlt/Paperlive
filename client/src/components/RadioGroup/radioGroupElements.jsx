import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  position: relative;
`;

export const Label = styled.span`
  position: absolute;
  transform: translateY(-50%);

  top: 0;
  left: 1.2rem;

  font-size: 1.2rem;
  line-height: 1.2rem;
  padding: 0.2rem 0.4rem;

  color: var(--black-tertiary);
  background: var(--white);
  border-radius: 0.4rem;

  user-select: none;
`;

export const RadioButton = styled.label`
  user-select: none;
  cursor: pointer;
  color: var(--black);

  flex: 1;
  text-align: center;
  padding: 1.55rem;

  font-size: 1.5rem;
  line-height: 100%;

  border-block: 1px solid var(--black-quaternary);
  border-inline: 0.5px solid var(--black-quaternary);

  &:first-of-type {
    border-radius: 0.2rem 0 0 0.2rem;
    border-left: 1px solid var(--black-quaternary);
    border-right: 0.5px solid var(--black-quaternary);
  }

  &:last-of-type {
    border-radius: 0 0.2rem 0.2rem 0;
    border-right: 1px solid var(--black-quaternary);
    border-left: 0.5px solid var(--black-quaternary);
  }
`;

export const RadioInput = styled.input`
  display: none;

  &:checked + ${RadioButton} {
    background: rgba(55, 136, 161, 0.15);
    outline: 1px solid var(--accent);
    outline-offset: -1px;
  }
`;
