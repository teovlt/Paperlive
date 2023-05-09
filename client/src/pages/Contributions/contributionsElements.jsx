import styled from 'styled-components';
import { Container as AppContainer, Caption, Button } from '../../theme/appElements';

export const Container = styled(AppContainer)`
  display: grid;
  grid-template-columns: 296px 1fr;
  grid-template-rows: 56px 1fr;

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

export const SideHeader = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  height: 100%;

  display: flex;
  align-items: center;
`;

export const MainHeader = styled.div`
  grid-area: 1 / 2 / 2 / 2;
  height: 100%;

  margin-left: 32px;

  display: flex;
  align-items: center;
`;

export const Sidebar = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  padding-block: 32px;
  gap: 24px;
`;

export const Main = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  padding-block: 32px;
  gap: 24px;

  margin-left: 32px;
`;

export const FormNavigation = styled.nav`
  position: relative;

  display: flex;
  flex-direction: column;
  padding-block: 32px;
  row-gap: 32px;

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 1px;
    height: 100%;

    background: var(--black-quaternary);
  }
`;

export const StepCaption = styled(Caption)`
  color: var(--black-secondary);
  align-self: flex-end;
`;

export const LinearContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NavLink = styled.a`
  cursor: pointer;
  position: relative;

  font-size: 1.4rem;
  line-height: 2.2rem;

  padding-left: 16px;
  padding-block: 5px;
  color: var(--black-tertiary);

  &.active {
    color: var(--accent);
  }

  &.active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 3px;
    height: 100%;

    background: var(--accent);
  }
`;

export const IconLabel = styled.span`
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--black-tertiary);

  span {
    color: var(--black);
  }
`;

export const SectionMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  input {
    //barre de recherche à faire
    
  }
`;

export const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  width: auto;
`;