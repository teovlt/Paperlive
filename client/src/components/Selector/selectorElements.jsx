import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Toggler = styled.div`
  border: 1px solid var(--black-quaternary);
  padding: 0.95rem 3.6rem 0.95rem 1.6rem;
  border-radius: 0.2rem;

  user-select: none;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: '▶︎';
    font-size: 1rem;
    color: var(--black);

    position: absolute;
    top: 50%;
    right: 1.6rem;
    transform: translateY(-50%) rotate(90deg);
  }

  &.open {
    border-bottom-width: 0.05rem;

    &::after {
      color: var(--accent);
      transform: translateY(-50%) rotate(-90deg);
    }
  }
`;

export const Counter = styled.span`
  font-size: 1.5rem;
  color: var(--white);
  background: var(--black);

  border-radius: 0.4rem;
  padding: 0.2rem 0.8rem;
`;

export const Search = styled.input`
  color: var(--black);
  padding: 1.25rem 1.6rem;
  font-size: 1.5rem;

  border: 1px solid var(--black-quaternary);
  border-block-width: 0.05rem;

  &::placeholder {
    user-select: none;
    color: var(--black-tertiary);
  }
`;

export const ResultContainer = styled.div`
  border: 1px solid var(--black-quaternary);
  border-top-width: 0.05rem;
`;

export const ResultCheckbox = styled.div``;
