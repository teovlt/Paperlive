import styled from 'styled-components';
import { Container as cont } from '../../theme/appElements';

export const Container = styled(cont)`
  width: 372px;
  height: 220px;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    background-color: red;
    display: flex;
    column-gap: 12px;
    padding-left: 12px;
    padding-right: 16px;
    padding-block: 5px;
    border-radius: 8px;
  }

`;
