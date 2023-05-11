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

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
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

export const Link = styled.p`
  font-size: 1.4rem;
  color: var(--accent);
  text-decoration: underline;
  cursor: pointer;
`;

export const ErrorLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  padding: 0.8rem 1.2rem;
  border-radius: 0.4rem;

  color: var(--black);
  font-size: 1.4rem;

  svg {
    color: var(--negative);
  }

  outline-offset: -2px;
  outline: 2px solid var(--negative-vibrant);
  background: var(--negative-vibrant);
`;

export const SectionMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const DivRecherche = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
`;

export const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  width: auto;
  height: min-content;
`;

export const Table = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  thead {
    background-color: var(--black-quaternary);
    border-top: 0.1rem solid var(--black-quaternary);
    border-left: 0.1rem solid var(--black-quaternary);
    border-right: 0.1rem solid var(--black-quaternary);
  }
  tr {
    display: grid;
    grid-template-columns: 5fr repeat(3, 2fr);
    border-bottom: 0.1rem solid var(--black-quaternary);
    padding: 12px;
  }
  th {
    display: flex;
    column-gap: 10px;
    align-items: center;
    font-weight: 400;
    cursor: pointer;
  }

  .trBody {
    &:hover {
      background-color: var(--black-quaternary);
      cursor: pointer;
    }
  }

  .etat {
    display: flex;
    align-items: center;
  }

  .trNoContri {
    display: flex;
    border: none;
    padding: 0;
  }
`;

export const DivRelated = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ResultsContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--black-secondary);
  border-top: none;
`;

export const Result = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--black-quaternary);
  }
`;
