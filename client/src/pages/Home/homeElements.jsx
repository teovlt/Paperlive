import styled from 'styled-components';
import { Container as cont, Button as btn } from '../../theme/appElements';

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

export const DivInfos = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  input {
    width: 100%;
  }
`;
export const DivCheck = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 12px;
`;

export const DivBtnsEdit = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  width: 100%;

  button {
    width: 100%;
  }
`;

export const BtnCancel = styled(btn)`
  background-color: var(--destructive);
`;

export const BtnSave = styled(btn)`
  background-color: var(--positive);
`;
