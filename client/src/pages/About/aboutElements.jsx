import styled from 'styled-components';

export const Ul = styled.ul`
  li {
    display: flex;
    align-items: center;

    &::before {
      margin-inline: 1.2rem 0.8rem;
      display: block;
      content: '';
      width: 0.5rem;
      aspect-ratio: 1/1;
      border-radius: 0.25rem;
      background: var(--accent);
    }
  }
`;
