import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid var(--black-quaternary);
  border-radius: 0.2rem;

  position: relative;

  &::before {
    display: block;
    content: ${(props) => `"${props.label}"`};

    position: absolute;
    left: 0.8rem;
    transform: translateY(-50%);

    font-size: 1.2rem;
    color: var(--black-tertiary);

    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
    background: var(--white);
  }
`;

export const SelectInput = styled.select`
  min-width: 120px;
  padding: 0.8rem 1.2rem;
  font-size: 1.5rem;
  color: var(--black);
`;
