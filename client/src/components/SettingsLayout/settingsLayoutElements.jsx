import styled from 'styled-components';
import { Container as AppContainer } from '../../theme/appElements';
import { NavLink } from 'react-router-dom';

export const Container = styled(AppContainer)`
  display: grid;
  grid-template-columns: 296px 1fr;
  grid-template-rows: 56px 1fr;

  height: calc(100vh - 40px);
  overflow-y: hidden;
`;

export const SideBar = styled.div`
  grid-area: 1 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  padding-block: 32px;
  gap: 24px;
`;

export const MainSection = styled.div`
  margin-left: 72px;
  grid-area: 1 / 2 / 3 / 3;

  max-width: calc(100% - 72px);

  display: flex;
  flex-direction: column;
  padding-block: 32px;
  row-gap: 24px;

  overflow-x: hidden;
  overflow-y: auto;

  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, IE and Edge */
  }
`;

export const SectionParams = styled.div`
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
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4px;
  padding: 4px;
  border-radius: 4px;
  color: var(--black);
  column-gap: 8px;

  &:hover {
    cursor: pointer;
    background: var(--black-quaternary);
  }
  &.active {
    border-left: 4px solid var(--accent);
    background: var(--black-quaternary);
    margin-left: 0px;
  }
`;

