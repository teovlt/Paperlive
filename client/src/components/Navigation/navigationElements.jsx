import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  grid-area: 1 / 2 / 2 / 3;

  display: flex;
  padding-inline: 32px;
  gap: 32px;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;

  position: relative;
`;

export const Link = styled(NavLink)`
  font-size: 1.5rem;
  color: var(--black);

  display: inline-flex;
  align-items: center;
  column-gap: 0.8rem;

  padding: 0.4rem 1.2rem;
  border-radius: 0.4rem;

  &:hover {
    cursor: pointer;
    background: var(--black-quaternary);
  }

  svg {
    font-size: 1.7rem;
  }

  transition: background 0.1s ease-in-out;

  &.active {
    background: var(--accent-vibrant);

    &::after {
      content: '';
      width: 100%;
      height: 4px;
      border-radius: 2px 2px 0 0;

      position: absolute;
      left: 0;
      bottom: 0;

      background: var(--accent);
    }
  }
`;
