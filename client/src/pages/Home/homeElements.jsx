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

export const CaptionWarning = styled.span`
  background-color: var(--destructive-vibrant);
  border-radius: 5px;
  padding: 0.5rem 1.6rem;
  border: 1px solid var(--destructive-vibrant);
  justify-content: center;
`;

export const ButtonEdit = styled(btn)`
  background-color: var(--black-quaternary);
  border-radius: 5px;
  padding: 0.5rem 1.6rem;
  color: black;
  border: 1px solid var(--black-quaternary);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DivEditProfil = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;
`;

export const Img = styled.img`
  border-radius: 80%;
  border: 2px solid var(--black-quaternary);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  width: 100%;
`;
