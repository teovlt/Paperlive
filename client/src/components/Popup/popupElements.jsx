import styled from 'styled-components';

import { Container as cont } from '../../theme/appElements';

export const Flou = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: var(--black-secondary);
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
export const Container = styled(cont)`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 215px;
  position: absolute;
  padding: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  row-gap: 24px;
`;

export const PopupText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  text-align: left;
`;

export const PopupBtn = styled.div`
  display: flex;
  column-gap: 24px;
  justify-content: center;
`;
