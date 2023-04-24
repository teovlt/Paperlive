import styled from 'styled-components';
import { Container as cont } from '../signIn/signInElements';

export const TableContribution = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;

export const Container = styled(cont)`
  p {
    text-align: start;
  }
`;

export const MainText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
`;

export const MainTab = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
