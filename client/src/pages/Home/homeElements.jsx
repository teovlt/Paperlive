import styled from 'styled-components';
import { Container as AppContainer, Button as btn } from '../../theme/appElements';

export const Container = styled(AppContainer)`
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 56px 1fr;
`;

export const CaptionWarning = styled.span`
  background-color: var(--destructive-vibrant);
  border-radius: 5px;
  padding: 0.5rem 1.6rem;
  border: 1px solid var(--destructive-vibrant);
  justify-content: center;
  width: 100%;
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
