import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: min(1120px, 80%);
  margin-inline: auto;
`;

export const GridWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 56px repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const Button = styled.button`
  user-select: none;
  cursor: pointer;

  display: inline-block;
  padding: 1.2rem 1.6rem;
  text-align: center;
  border-radius: 2px;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.6rem;
  text-decoration: none;

  color: var(--white);
  background-color: var(--accent);
  /* TODO: Secondary, Positive, Notice, Destructive */
  /* background-color: ${(props) => props.secondary && '...'} */
`;

export const SideBar = styled.div`
  grid-area: 1 / 1 / 4 / 2;
  display: flex;
  flex-direction: column;
  padding-block: 32px;
  row-gap: 16px;
`;

export const NavPage = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  justify-content: left;
  column-gap: 32px;
  padding-inline: 32px;
  align-items: center;
`;

export const Main = styled.div`
  grid-area: 2 / 2 / 4 / 3;
  margin-left: 72px;
  padding-block: 32px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const WrapperCo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  align-items: center;
  text-align: center;
  width: 330px;

  button {
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 100%;
  }
`;

export const Link = styled(NavLink)`
  color: var(--accent);

  &:hover {
    text-decoration: underline;
  }
`;
