import styled from 'styled-components';
import { Container as AppContainer } from '../../theme/appElements';
import { NavLink as RRNavLink } from 'react-router-dom';

export const Container = styled(AppContainer)`
  display: grid;
  grid-template-columns: 296px 1fr;
  grid-template-rows: 56px 1fr;

  max-height: calc(100vh - 40px);
  overflow-y: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 96px;
    left: 0;

    width: 100vw;
    height: 1px;
    border-radius: 2px 2px 0 0;

    background: var(--black-quaternary);
  }
`;

export const MainSection = styled.div`
  margin-left: 72px;
  grid-area: 2 / 2 / 3 / 3;

  display: flex;
  flex-direction: column;
  padding-block: 32px;
  row-gap: 24px;

  overflow-y: auto;
`;

export const Navigation = styled.nav`
  grid-area: 1 / 2 / 2 / 3;

  display: flex;
  align-items: end;
  padding-inline: 32px;
  gap: 32px;
`;

export const NavLink = styled(RRNavLink)`
  height: 100%;
  position: relative;

  display: flex;
  align-items: center;
  padding-inline: 8px;
  gap: 8px;

  font-size: 1.4rem;
  color: var(--black-secondary);

  &.active {
    color: var(--black);
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 3px;

    background: var(--accent);
  }
`;
