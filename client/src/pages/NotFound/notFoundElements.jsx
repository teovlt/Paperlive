import styled from 'styled-components';
import { Button } from '../../theme/appElements';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
`;

export const Title = styled.h1`
  font-size: 12rem;
`;

export const Img = styled.img`
  margin-inline-start: auto;
  width: 70%;
  height: 80vh;
`;

export const DivError = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 175px;
  align-items: center;
  position: absolute;
`;

export const ButtonBack = styled(Button)`
  margin-top: 50px;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 40%;
`;
