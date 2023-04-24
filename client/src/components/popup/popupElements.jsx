import styled from 'styled-components';

import { Container as cont } from '../../theme/appElements';

export const Flou = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(2px);
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const Container = styled(cont)`
  display: flex;
  flex-direction: column;
  width: 660px;
  height: 215px;
  position: absolute;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid grey;
`;

export const PopupText = styled.div`
  color: black;
  width: 584px;
  height: 142px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  text-align: left;

  h1 {
    text-align: center;
    font-weight: 700;
  }
`;

export const PopupBtn = styled.div`
  display: flex;
  column-gap: 32px;
  justify-content: center;
  width: 584px;
  height: 36px;
  margin-inline: auto;

  button {
    background-color: var(--accent);
    color: white;
    width: 100%;
    padding: 10px 16px 10px 16px;
    border-radius: 2px;
  }
`;
