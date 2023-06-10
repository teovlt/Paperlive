import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 100%;
  padding: 5px 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--white);
  background-color: var(--black);
`;

export const Actions = styled.div`
  display: flex;
  column-gap: 48px;
  user-select: none;
`;

export const Logo = styled(NavLink)`
  cursor: pointer;
  user-select: none;

  color: var(--white);
  font-size: 2rem;
  font-weight: 500;
`;

export const Recherche = styled.div`
  border: 1px solid #cac1c1;
  border-radius: 5px;

  display: flex;
  align-items: center;

  svg {
    color: #cac1c1;
    width: 18px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Input = styled.input`
  color: #ffffff;
  padding: 5px;

  :focus {
    background-color: white;
    color: black;
  }
`;
