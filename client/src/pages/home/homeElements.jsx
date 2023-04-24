import styled from 'styled-components';
import { Container as cont } from '../signIn/signInElements';

export const TableContribution = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const Container = styled(cont)``;
