import styled from 'styled-components';
import { Container as cont } from '../../theme/appElements';

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
  flex-direction: row;
  border: 1px solid var(--white-50);
  padding-inline: 12px;
  padding-block: 4px;
  border-radius: 4px;

  input {
    color: var(--white);
    border-right: 1px solid grey;

    &::placeholder {
      opacity: 1;
      color: var(--white);
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 32px;
`;
