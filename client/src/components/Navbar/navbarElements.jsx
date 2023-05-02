import styled from 'styled-components';
import { Container as cont, Heading1 as titre } from '../../theme/appElements';

export const NavContainer = styled(cont)`
  background-color: var(--black);
  width: 100%;
  color: var(--white);
  display: flex;
  justify-content: space-between;
  padding-block: 5px;
  padding-inline: 32px;
  align-items: center;
`;

export const ShearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
  padding-inline: 12px;
  padding-block: 4px;
  border-radius: 4px;
  user-select: none;

  input {
    color: var(--white);

    &::placeholder {
      opacity: 1;
      color: var(--white);
    }
  }
`;

export const Actions = styled.div`
  user-select: none;
  display: flex;
  column-gap: 32px;
`;

export const H1 = styled(titre)`
  color: var(--white);
  user-select: none;
`;