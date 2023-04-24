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
  justify-content: left;

  border: 1px solid grey;
  padding-inline: 12px;
  padding-block: 4px;
  border-radius: 4px;

  input {
    color: var(--white);

    &::placeholder {
      opacity: 1;
      color: var(--white);
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  column-gap: 32px;
`;
