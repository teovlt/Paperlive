import styled from 'styled-components';
import { Container as AppContainer, Caption, Button as AppButton } from '../../theme/appElements';

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

  font-size: 1.5rem;
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
  font-size: 1.5rem;
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

  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background: var(--accent);
    color: var(--white);
  }
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;

  border-collapse: collapse;

  font-size: 1.5rem;
  user-select: none;
  color: var(--black);
`;

export const TableCell = styled.td`
  flex: 1;

  padding: 0.8rem;

  border-inline: 0.5px solid var(--black-quaternary);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-of-type {
    flex: 2;
    border-radius: 0.2rem 0 0 0.2rem;
    border-left: none;
    border-right: 0.5px solid var(--black-quaternary);
  }

  &:last-of-type {
    border-radius: 0 0.2rem 0.2rem 0;
    border-right: none;
    border-left: 0.5px solid var(--black-quaternary);
  }

  svg {
    font-size: 1.5rem;
    margin-right: 8px;
    vertical-align: middle;
  }
`;

export const TableRow = styled.tr`
  display: flex;
  cursor: pointer;

  border-block: 0.5px solid var(--black-quaternary);

  &:first-of-type {
    border-top: 1px solid var(--black-quaternary);
  }

  &:last-of-type {
    border-bottom: 1px solid var(--black-quaternary);
  }

  &:hover {
    background: rgba(34, 34, 34, 0.08);
  }
`;

export const TableHead = styled.tr`
  display: flex;

  ${TableCell} {
    color: var(--black-tertiary);
    border: none;

    position: relative;

    &:hover {
      cursor: pointer;
      background: rgba(34, 34, 34, 0.08);
    }

    &::after {
      content: '▶︎';
      font-size: 0.6rem;

      position: absolute;
      top: 50%;
      margin-left: 4px;
      transform: translateY(-50%) rotate(90deg);
    }

    &.sortDesc::after {
      transform: translateY(-50%) rotate(-90deg);
    }
  }
`;

export const TableFoot = styled.tr`
  display: flex;
  justify-content: flex-end;

  ${TableCell} {
    color: var(--black-tertiary);
    text-align: right;
    border: none;

    span {
      color: var(--black);
    }
  }
`;

export const SectionContribution = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 32px;
  row-gap: 48px;
  margin-left: 72px;
  grid-area: 2 / 2 / 3 / 3;
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
  padding: 8px;
  column-gap: 24px;
`;

export const Span = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid var(--black-quaternary);
`;

export const Button = styled(AppButton)`
  display: flex;
  align-items: center;
  gap: 12px;

  font-size: 1.5rem;
  padding: 16px;

  white-space: nowrap;
`;
