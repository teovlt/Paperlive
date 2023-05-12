import styled from 'styled-components';
import { Container as AppContainer, Caption } from '../../theme/appElements';

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

export const RelatedContributionSearchContainer = styled.div`
  position: relative;
`;

export const RelatedContributionSearchResultContainer = styled.div`
  position: absolute;
  width: 100%;
  padding-block: 4px;
  top: 50%;

  display: flex;
  flex-direction: column;

  background: var(--white);
  border: 1px solid var(--black-quaternary);
  border-radius: 0.2rem;
  box-shadow: 0 0 10px var(--black-quaternary);

  transition: all 0.2s ease-in-out;

  &.open {
    top: calc(100% + 8px);
  }
`;

export const RelatedContributionSearchResult = styled.div`
  width: 100%;
  padding: 4px 12px;

  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background: var(--accent);
    color: var(--white);
  }
`;

export const DivTable = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const DivInfos = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
<<<<<<< HEAD
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
`;

export const TableHeader = styled.thead`
  font-weight: 400;
  background: red;
`;

export const TitleCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
=======
  padding: 8px;
  column-gap: 24px;
`;

export const SectionContribution = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 32px;
  row-gap: 48px;
  margin-left: 72px;
  grid-area: 2 / 2 / 3 / 3;
`;


export const Span = styled.span`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
border-bottom: 1px solid var(--black-quaternary);

`
>>>>>>> 54496697066b5ab4eea8621cdd2d7532ee9a1a1a
