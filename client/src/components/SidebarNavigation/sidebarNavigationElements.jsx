import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  padding-block: 32px;
  gap: 24px;

  user-select: none;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--black-quaternary);
  &:last-child {
    border: none;
  }
`;

export const Link = styled(NavLink)`
  font-size: 1.5rem;
  color: var(--black);

  display: flex;
  align-items: center;
  column-gap: 8px;

  padding: 4px 12px;
  border-radius: 4px;

  position: relative;

  &:hover {
    cursor: pointer;
    background: var(--black-quaternary);
  }

  svg {
    font-size: 1.7rem;
  }

  transition: margin 0.1s ease-in-out, background 0.1s ease-in-out;

  &.active {
    margin-left: 12px;
    background: var(--accent-vibrant);

    &::after {
      content: '';
      width: 4px;
      height: 100%;
      border-radius: 4px;

      position: absolute;
      left: -12px;

      background: var(--accent);
    }
  }
`;
