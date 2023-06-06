import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  padding: 1.6rem 2.4rem;

  border-radius: 0.4rem;
  border: 1px solid var(--black-quaternary);

  position: relative;
  overflow: hidden;

  &::after {
    content: '';

    width: ${({ progress }) => progress + '%'};
    height: 0.5rem;

    display: block;
    position: absolute;
    bottom: 0;
    left: 0;

    background-color: var(--accent);

    transition: width 1s;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    font-size: 5rem;
    stroke-width: 0.1rem;
    margin-bottom: -0.4rem;
  }

  span {
    user-select: none;
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: uppercase;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  padding: 0 2.4rem;
  flex: 1;

  p {
    font-size: 1.5rem;
  }

  span {
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: uppercase;
    user-select: none;
  }
`;

export const Label = styled.label`
  color: var(--accent);
  text-decoration: underline;

  font-size: 1.4rem;

  cursor: pointer;
  user-select: none;
`;

export const Input = styled.input`
  display: none;
`;
